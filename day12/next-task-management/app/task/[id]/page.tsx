import { fetchTaskById, fetchTasks } from "@/app/lib/api"
import { Navigation } from "@/app/components/navigation"
import { TaskCard } from "@/app/components/task-card"
import { notFound } from "next/navigation"

// Incremental Static Regeneration - static with revalidation
export default async function TaskISRPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const taskId = Number.parseInt(id)
  const task = await fetchTaskById(taskId)

  if (!task) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Details (ISR)</h1>
          <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
            <p className="text-purple-800 font-medium">Incremental Static Regeneration (ISR)</p>
            <p className="text-purple-700 text-sm mt-1">
              This page uses Incremental Static Regeneration. Static with periodic updates.
            </p>
            <p className="text-purple-600 text-xs mt-2">Revalidated every 60 seconds</p>
          </div>
        </div>

        <TaskCard task={task} />
      </div>
    </div>
  )
}

// Generate static params for existing tasks
export async function generateStaticParams() {
  try {
    const tasks = await fetchTasks();
    return tasks.map((task) => ({
      id: task.id.toString(),
    }));
  } catch (error) {
    console.log(error);
    
    return [];
  }
}

// Revalidate every 60 seconds
export const revalidate = 60