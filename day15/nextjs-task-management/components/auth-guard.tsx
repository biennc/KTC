"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/hooks/useAuthStore"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRoles?: string[]
}

export default function AuthGuard({ children, requiredRoles = [] }: AuthGuardProps) {
  const { access_token, loggedInUser } = useAuthStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!access_token && !!loggedInUser

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated) {
        // No refresh token logic - just redirect to login
        router.push("/login")
        return
      }

      // Check role permissions
      if (requiredRoles.length > 0 && loggedInUser) {
        const userRoles = loggedInUser.roles.map((role) => role.name)
        const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role))

        if (!hasRequiredRole) {
          router.push("/dashboard")
          return
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [isAuthenticated, loggedInUser, requiredRoles, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-700">Authenticating...</h2>
            <p className="text-sm text-gray-500">Verifying your credentials</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-red-700">Redirecting...</h2>
            <p className="text-sm text-gray-500">Taking you to login page</p>
          </div>
        </div>
      </div>
    )
  }

  if (requiredRoles.length > 0 && loggedInUser) {
    const userRoles = loggedInUser.roles.map((role) => role.name)
    const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role))

    if (!hasRequiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}