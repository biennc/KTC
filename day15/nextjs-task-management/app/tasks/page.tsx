"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TasksRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard tasks page
    router.replace("/dashboard/tasks")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}
