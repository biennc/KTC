import { fetchTasks } from "@/app/lib/api"
import { Navigation } from "@/app/components/navigation"
import { TaskCard } from "@/app/components/task-card"

// Server Side Rendering - data fetched on each request
export default async function TaskSSRPage() {
  const tasks = await fetchTasks()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tasks (Server Side Rendering)</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-blue-800 font-medium">Server Side Rendering (SSR)</p>
            <p className="text-blue-700 text-sm mt-1">
              This page is rendered on the server for each request. Data is always fresh.
            </p>
            <p className="text-blue-600 text-xs mt-2">Generated at: {new Date().toLocaleString()}</p>
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
