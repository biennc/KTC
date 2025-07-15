"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/lib/auth-context"
import { useRouter } from "next/navigation"
import { fetchTasks } from "@/app/lib/api"
import type { Task } from "@/app/lib/constants"
import { Navigation } from "@/app/components/navigation"
import { TaskCard } from "@/app/components/task-card"

// Client Side Rendering - data fetched in browser
export default function TaskCSRPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

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

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tasks (Client Side Rendering)</h1>
          <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
            <p className="text-orange-800 font-medium">Client Side Rendering (CSR)</p>
            <p className="text-orange-700 text-sm mt-1">
              This page is rendered entirely in the browser. Data is fetched after page load.
            </p>
            <p className="text-orange-600 text-xs mt-2">Loaded at: {new Date().toLocaleString()}</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No tasks found.</div>
            ) : (
              tasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </div>
        )}
      </div>
    </div>
  )
}
