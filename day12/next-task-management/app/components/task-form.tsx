"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import type { Task } from "@/app/lib/constants"

interface TaskFormData {
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  dueDate?: string
}

const validationSchema: yup.ObjectSchema<TaskFormData> = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: yup.string().max(500, "Description must be less than 500 characters"),
  priority: yup.string().oneOf(["low", "medium", "high"]).required("Priority is required"),
  dueDate: yup.string(),
})

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "updatedAt" | "completed">) => void
  onCancel?: () => void
}

export function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      priority: "medium",
    },
  })

  const handleFormSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit({
        ...data,
      })
      reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Task</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task description (optional)"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority *
          </label>
          <select
            id="priority"
            {...register("priority")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            {...register("dueDate")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
