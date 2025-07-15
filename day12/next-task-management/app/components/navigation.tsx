"use client"

import Link from "next/link"
import { useAuth } from "@/app/lib/auth-context"
import { LogOut, CheckSquare } from "lucide-react"

export function Navigation() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/tasks" className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
              <CheckSquare className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">Task Manager</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <Link href="/task-ssr" className="text-gray-600 hover:text-gray-900 transition-colors">
                SSR Tasks
              </Link>
              <Link href="/task-ssg" className="text-gray-600 hover:text-gray-900 transition-colors">
                SSG Tasks
              </Link>
              <Link href="/task-csr" className="text-gray-600 hover:text-gray-900 transition-colors">
                CSR Tasks
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
