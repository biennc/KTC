import { fetchTasks } from "@/app/lib/api"
import { Navigation } from "@/app/components/navigation"
import { TaskCard } from "@/app/components/task-card"

// Static Site Generation - data fetched at build time
export default async function TaskSSGPage() {
  const tasks = await fetchTasks()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tasks (Static Site Generation)</h1>
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-800 font-medium">Static Site Generation (SSG)</p>
            <p className="text-green-700 text-sm mt-1">
              This page is pre-rendered at build time. Data is static until next build.
            </p>
            <p className="text-green-600 text-xs mt-2">Generated at build time</p>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No tasks found.</div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  )
}

// This tells Next.js to pre-render this page at build time
export const dynamic = "force-static"
