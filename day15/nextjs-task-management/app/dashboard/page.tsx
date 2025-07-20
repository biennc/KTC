"use client"

import { useAuthStore } from "@/hooks/useAuthStore"
import { useTasksCache } from "@/hooks/useTasksCache"
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle, FaSyncAlt } from "react-icons/fa"

export default function DashboardPage() {
  const { user } = useAuthStore()
  const {
    tasks,
    loading,
    error,
    refreshTasks
  } = useTasksCache(
    user ? `/api/tasks/assignee/${user.id}` : '',
    typeof user?.id === 'number' ? user.id : undefined
  )

  const getTaskStats = () => {
    // Ensure tasks is an array before using filter
    if (!Array.isArray(tasks)) {
      return { total: 0, completed: 0, inProgress: 0, overdue: 0 }
    }

    const total = tasks.length
    const completed = tasks.filter((task) => task.status === "completed").length
    const inProgress = tasks.filter((task) => task.status === "in_progress").length
    const overdue = tasks.filter((task) => new Date(task.due_date) < new Date() && task.status !== "completed").length

    return { total, completed, inProgress, overdue }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-purple-500 mx-auto mb-3"></div>
          <div className="space-y-1">
            <h3 className="text-md font-medium text-gray-700">Loading Dashboard...</h3>
            <p className="text-xs text-gray-500">Preparing your overview</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = getTaskStats()

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.email}</p>
        </div>
        <button
          onClick={() => refreshTasks()}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
          title="Refresh Dashboard"
        >
          <FaSyncAlt className="mr-2" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            <strong>Error loading dashboard:</strong> {error}
          </p>
          <button
            onClick={() => refreshTasks()}
            className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FaTasks className="text-blue-500 text-2xl mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 text-2xl mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FaClock className="text-yellow-500 text-2xl mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 text-2xl mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
        </div>
        <div className="p-6">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tasks assigned to you yet.</p>
          ) : (
            <div className="space-y-4">
              {tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
