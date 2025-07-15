"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/lib/auth-context"
import { useRouter } from "next/navigation"
import { fetchTasks, createTask, updateTask, deleteTask, isAuthenticated } from "@/app/lib/api"
import type { Task } from "@/app/lib/constants"
import { Navigation } from "@/app/components/navigation"
import { TaskCard } from "@/app/components/task-card"
import { TaskForm } from "@/app/components/task-form"
import { Plus, CheckSquare, AlertCircle } from "lucide-react"

export default function TasksPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    // Only check authentication and redirect on the client-side
    if (typeof window !== "undefined" && !isAuthenticated()) {
      console.log("User not authenticated, redirecting to login")
      router.push("/login")
      return
    }

    loadTasks()
  }, [router, user]) // Added user to dependency array for re-evaluation on login/logout

  const loadTasks = async () => {
    try {
      setError("")
      setLoading(true)
      const tasksData = await fetchTasks()
      setTasks(tasksData)
    } catch (error) {
      console.error("Failed to load tasks:", error)
      if (error instanceof Error) {
        // If it's an authentication error, the fetchWithTimeout should have already redirected
        // This catch block is for other types of errors (network, server 500, etc.)
        setError(error.message)
      } else {
        setError("Failed to load tasks. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "completed">) => {
    try {
      setError("")
      const newTask = await createTask(taskData)
      setTasks((prev) => [newTask, ...prev])
      setShowForm(false)
    } catch (error) {
      console.error("Failed to create task:", error)
      setError("Failed to create task. Please try again.")
    }
  }

  const handleToggleTask = async (id: number, completed: boolean) => {
    try {
      setError("")
      const updatedTask = await updateTask(id, { completed })
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed } : task)))
    } catch (error) {
      console.error("Failed to update task:", error)
      setError("Failed to update task. Please try again.")
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      setError("")
      await deleteTask(id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (error) {
      console.error("Failed to delete task:", error)
      setError("Failed to delete task. Please try again.")
    }
  }

  // Show loading while checking authentication on client-side
  // This ensures the page doesn't flash if user is not logged in
  if (typeof window !== "undefined" && !user && !isAuthenticated() && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If user is null and we are on the server, or if isAuthenticated() is false on client
  // and we are not loading, it means we should redirect.
  // The useEffect handles the client-side redirect.
  // For server-side, if user is null, it means it's not authenticated.
  if (!user && typeof window === "undefined") {
    // This case should ideally be handled by Next.js middleware or a server-side redirect
    // but for simplicity, we'll just return null here as the client-side useEffect will take over.
    return null
  }

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

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
            <button onClick={loadTasks} className="mt-2 text-sm text-red-600 hover:text-red-800 underline">
              Try again
            </button>
          </div>
        )}

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
