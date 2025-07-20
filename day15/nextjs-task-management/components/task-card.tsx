"use client"

import type { Task } from "@/lib/types"
import { FaClock, FaUser, FaFlag } from "react-icons/fa"

interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
  onDelete?: (taskId: number) => void
  showActions?: boolean
}

export default function TaskCard({ task, onEdit, onDelete, showActions = true }: TaskCardProps) {
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

  const getStatusColor = (status: string) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status.replace("_", " ").toUpperCase()}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <FaFlag className={getPriorityColor(task.priority)} />
            <span className="capitalize">{task.priority}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaUser />
            <span>ID: {task.assignee_id}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <FaClock />
          <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
        </div>

        {showActions && (
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(task)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(task.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
