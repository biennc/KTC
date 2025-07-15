"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "./constants"

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    try {
      const savedUser = localStorage.getItem("user")
      const savedToken = localStorage.getItem("token")

      console.log("Checking localStorage:", { savedUser, savedToken }) // Debug log

      if (savedUser && savedUser !== "undefined" && savedToken && savedToken !== "undefined") {
        const parsedUser = JSON.parse(savedUser)
        console.log("Restored user from localStorage:", parsedUser) // Debug log
        setUser(parsedUser)
      } else {
        console.log("No valid user data in localStorage") // Debug log
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      // Clear invalid data
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = () => {
    console.log("Logging out user") // Debug log
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  const updateUser = (newUser: User | null) => {
    console.log("Updating user:", newUser) // Debug log
    setUser(newUser)
    if (newUser && typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(newUser))
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <AuthContext.Provider value={{ user, setUser: updateUser, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
