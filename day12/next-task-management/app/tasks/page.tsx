"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/lib/auth-context"
import { useRouter } from "next/navigation"
import { fetchTasks, createTask, updateTask, deleteTask } from "@/app/lib/api"
import type { Task } from "@/app/lib/constants"
import { Navigation } from "@/app/components/navigation"
import { TaskCard } from "@/app/components/task-card"
import { TaskForm } from "@/app/components/task-form"
import { Plus, CheckSquare } from "lucide-react"

export default function TasksPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    loadTasks()
  }, [user, router])

  const loadTasks = async () => {
    try {
      const tasksData = await fetchTasks()
      setTasks(tasksData)
    } catch (error) {
      console.error("Failed to load tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "completed">) => {
    try {
      const newTask = await createTask({
        ...taskData,
        completed: false
      })
      setTasks((prev) => [newTask, ...prev])
      setShowForm(false)
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  const handleToggleTask = async (id: number, completed: boolean) => {
    try {
      // const updatedTask = await updateTask(id, { completed })
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed } : task)))
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <TaskForm onSubmit={handleCreateTask} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <CheckSquare className="h-16 w-16 mx-auto" />
                </div>
                <p className="text-gray-500 text-lg">No tasks found</p>
                <p className="text-gray-400">Create your first task to get started!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
