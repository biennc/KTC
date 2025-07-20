"use client"

import { useEffect, useState } from "react"
import type { User, Role } from "@/lib/types"
import api from "@/lib/axios"
import AuthGuard from "@/components/auth-guard"
import { FaEdit } from "react-icons/fa"

// Mock data for development
const mockUsers: User[] = [
  {
    id: 1,
    fullName: "tung12345",
    username: "tungnt@softech.vn",
    status: "active",
    roles: [
      { id: 1, code: "Administrators", name: "Administrators", description: "" },
      { id: 2, code: "Managers", name: "Managers", description: null },
    ],
  },
  {
    id: 2,
    fullName: "John Doe",
    username: "john.doe@example.com",
    status: "active",
    roles: [{ id: 3, code: "Users", name: "Users", description: "Regular users" }],
  },
  {
    id: 3,
    fullName: "Jane Smith",
    username: "jane.smith@example.com",
    status: "active",
    roles: [{ id: 2, code: "Managers", name: "Managers", description: null }],
  },
]

const mockRoles: Role[] = [
  { id: 1, code: "Administrators", name: "Administrators", description: "Full system access" },
  { id: 2, code: "Managers", name: "Managers", description: "Task management access" },
  { id: 3, code: "Users", name: "Users", description: "Regular user access" },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [selectedRoles, setSelectedRoles] = useState<number[]>([])

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const fetchUsers = async () => {
    try {
      // Try to fetch from API first
      const response = await api.get("/api/users")
      setUsers(response.data)
    } catch (error) {
      console.warn("API endpoint not available, using mock data:", error)
      // Use mock data if API is not available
      setUsers(mockUsers)
    }
  }

  const fetchRoles = async () => {
    try {
      // Try to fetch from API first
      const response = await api.get("/api/roles")
      setRoles(response.data)
    } catch (error) {
      console.warn("API endpoint not available, using mock data:", error)
      // Use mock data if API is not available
      setRoles(mockRoles)
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setSelectedRoles(user.roles.map((role) => role.id))
  }

  const handleUpdateUserRoles = async () => {
    if (!editingUser) return

    try {
      // Try to update via API first
      const response = await api.patch(`/api/users/${editingUser.id}/roles`, {
        roleIds: selectedRoles,
      })

      setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, roles: response.data.roles } : user)))
    } catch (error) {
      console.warn("API endpoint not available, updating mock data:", error)

      // Update mock data locally
      const updatedRoles = roles.filter((role) => selectedRoles.includes(role.id))
      const updatedUser = { ...editingUser, roles: updatedRoles }

      setUsers(users.map((user) => (user.id === editingUser.id ? updatedUser : user)))
    }

    setEditingUser(null)
    setSelectedRoles([])
  }

  const handleRoleToggle = (roleId: number) => {
    setSelectedRoles((prev) => (prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <AuthGuard requiredRoles={["Administrators"]}>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600">Manage users and their roles</p>
            <p className="text-sm text-yellow-600 mt-1">⚠️ Using mock data - API endpoints not yet available</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <span key={role.id} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {role.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                    >
                      <FaEdit />
                      <span>Edit Roles</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit User Roles Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Roles for {editingUser.fullName}</h2>

              <div className="space-y-3 mb-6">
                {roles.map((role) => (
                  <label key={role.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role.id)}
                      onChange={() => handleRoleToggle(role.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{role.name}</div>
                      {role.description && <div className="text-xs text-gray-500">{role.description}</div>}
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleUpdateUserRoles}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Update Roles
                </button>
                <button
                  onClick={() => {
                    setEditingUser(null)
                    setSelectedRoles([])
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}
