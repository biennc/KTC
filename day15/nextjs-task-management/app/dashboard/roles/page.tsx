"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { Role } from "@/lib/types"
import api from "@/lib/axios"
import AuthGuard from "@/components/auth-guard"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"

// Mock data for development
const mockRoles: Role[] = [
  { id: 1, code: "Administrators", name: "Administrators", description: "Full system access" },
  { id: 2, code: "Managers", name: "Managers", description: "Task management access" },
  { id: 3, code: "Users", name: "Users", description: "Regular user access" },
]

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  })

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      // Try to fetch from API first
      const response = await api.get("/roles")
      setRoles(response.data)
    } catch (error) {
      console.warn("API endpoint not available, using mock data:", error)
      // Use mock data if API is not available
      setRoles(mockRoles)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingRole) {
        // Try to update via API first
        const response = await api.patch(`/roles/${editingRole.id}`, formData)
        setRoles(roles.map((role) => (role.id === editingRole.id ? response.data : role)))
      } else {
        // Try to create via API first
        const response = await api.post("/roles", formData)
        setRoles([...roles, response.data])
      }
    } catch (error) {
      console.warn("API endpoint not available, updating mock data:", error)

      // Update mock data locally
      if (editingRole) {
        const updatedRole = { ...editingRole, ...formData }
        setRoles(roles.map((role) => (role.id === editingRole.id ? updatedRole : role)))
      } else {
        const newRole = {
          id: Math.max(...roles.map((r) => r.id)) + 1,
          ...formData,
        }
        setRoles([...roles, newRole])
      }
    }

    resetForm()
  }

  const handleEdit = (role: Role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      code: role.code,
      description: role.description || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (roleId: number) => {
    if (!confirm("Are you sure you want to delete this role?")) return

    try {
      // Try to delete via API first
      await api.delete(`/roles/${roleId}`)
      setRoles(roles.filter((role) => role.id !== roleId))
    } catch (error) {
      console.warn("API endpoint not available, updating mock data:", error)
      // Update mock data locally
      setRoles(roles.filter((role) => role.id !== roleId))
    }
  }

  const resetForm = () => {
    setFormData({ name: "", code: "", description: "" })
    setEditingRole(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-pink-500 mx-auto mb-3"></div>
          <div className="space-y-1">
            <h3 className="text-md font-medium text-gray-700">Loading Roles...</h3>
            <p className="text-xs text-gray-500">Fetching role management data</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AuthGuard requiredRoles={["Administrators"]}>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Roles</h1>
            <p className="text-gray-600">Manage system roles and permissions</p>
            <p className="text-sm text-yellow-600 mt-1">⚠️ Using mock data - API endpoints not yet available</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <FaPlus />
            <span>New Role</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{role.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{role.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{role.description || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(role)} className="text-blue-600 hover:text-blue-900">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(role.id)} className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Role Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">{editingRole ? "Edit Role" : "Create New Role"}</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    {editingRole ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}
