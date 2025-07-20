"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/hooks/useAuthStore"
import type { Task } from "@/lib/types"
import api from "@/lib/axios"
import { FaFlag, FaClock, FaPlay, FaCheck } from "react-icons/fa"

export default function MyTasksPage() {
  const { user } = useAuthStore()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyTasks()
  }, [user])

  const fetchMyTasks = async () => {
    if (!user) return

    try {
      const response = await api.get(`/api/tasks/assignee/${user.id}`)
      setTasks(response.data)
    } catch (error) {
      console.error("Error fetching my tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateTaskStatus = async (taskId: number, status: "to_do" | "in_progress" | "completed") => {
    try {
      const response = await api.patch(`/api/tasks/${taskId}`, { status })
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status } : task)))
    } catch (error) {
      console.error("Error updating task status:", error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "to_do":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== "completed"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600">Tasks assigned to you</p>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className={`hover:bg-gray-50 ${isOverdue(task.due_date, task.status) ? "bg-red-50" : ""}`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                      {task.start_date && (
                        <div className="text-xs text-gray-400 mt-1">
                          Started: {new Date(task.start_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaFlag className={`mr-2 ${getPriorityColor(task.priority)}`} />
                      <span className="text-sm text-gray-900 capitalize">{task.priority}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
                      {task.status.replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm">
                      <FaClock
                        className={`mr-2 ${isOverdue(task.due_date, task.status) ? "text-red-500" : "text-gray-400"}`}
                      />
                      <span
                        className={isOverdue(task.due_date, task.status) ? "text-red-600 font-medium" : "text-gray-900"}
                      >
                        {new Date(task.due_date).toLocaleDateString()}
                      </span>
                      {isOverdue(task.due_date, task.status) && (
                        <span className="ml-2 text-xs text-red-500 font-medium">OVERDUE</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {task.status === "to_do" && (
                        <button
                          onClick={() => handleUpdateTaskStatus(task.id, "in_progress")}
                          className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                          title="Start Task"
                        >
                          <FaPlay className="mr-1" />
                          Start
                        </button>
                      )}
                      {task.status === "in_progress" && (
                        <button
                          onClick={() => handleUpdateTaskStatus(task.id, "completed")}
                          className="inline-flex items-center px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                          title="Complete Task"
                        >
                          <FaCheck className="mr-1" />
                          Complete
                        </button>
                      )}
                      {task.status === "completed" && (
                        <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                          <FaCheck className="mr-1" />
                          Completed
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tasks assigned to you yet</p>
            <p className="text-gray-400 text-sm mt-2">Check back later or contact your manager for task assignments</p>
          </div>
        )}
      </div>

      {/* Task Summary */}
      {tasks.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter((task) => task.status === "in_progress").length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter((task) => task.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-600">
              {tasks.filter((task) => isOverdue(task.due_date, task.status)).length}
            </div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
        </div>
      )}
    </div>
  )
}
