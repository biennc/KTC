"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/hooks/useAuthStore"
import { FaTasks, FaUsers, FaUserShield, FaSignOutAlt, FaHome, FaUser } from "react-icons/fa"

export default function Sidebar() {
  const pathname = usePathname()
  const { loggedInUser, logOut } = useAuthStore()

  const userRoles = loggedInUser?.roles.map((role) => role.name) || []
  const isAdmin = userRoles.includes("Administrators")
  const isManager = userRoles.includes("Managers")
  const canManageTasks = isAdmin || isManager

  const menuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: FaHome,
      show: true,
    },
    {
      href: "/dashboard/tasks",
      label: "All Tasks",
      icon: FaTasks,
      show: canManageTasks,
    },
    {
      href: "/dashboard/my-tasks",
      label: "My Tasks",
      icon: FaUser,
      show: true,
    },
    {
      href: "/dashboard/users",
      label: "Users",
      icon: FaUsers,
      show: isAdmin,
    },
    {
      href: "/dashboard/roles",
      label: "Roles",
      icon: FaUserShield,
      show: isAdmin,
    },
  ]

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <p className="text-sm text-gray-300">Welcome, {loggedInUser?.email}</p>
      </div>

      <nav className="space-y-2">
        {menuItems
          .filter((item) => item.show)
          .map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logOut}
          className="flex items-center space-x-3 p-3 w-full text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
