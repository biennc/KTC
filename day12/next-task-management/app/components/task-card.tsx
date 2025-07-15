"use client"

import type { Task } from "@/app/lib/constants"
import { Calendar, Clock, Trash2 } from "lucide-react"

interface TaskCardProps {
  task: Task
  onToggle?: (id: number, completed: boolean) => void
  onDelete?: (id: number) => void
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  }

  return (
    <div className={`bg-white rounded-lg border shadow-sm p-6 transition-all ${task.completed ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggle?.(task.id, e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
            {task.title}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {task.description && (
        <div>
          <p className={`text-gray-600 mb-3 ${task.completed ? "line-through" : ""}`}>{task.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            {task.dueDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
