'use client'

import { useEffect, useState } from "react"

interface TasksData {
    id: string | number;
    title: string;
    description?: string;
    status: string;
    priority: string;
    start_date?: string;
    due_date?: string;
    assignee?: {
        id: number;
        username?: string;
        email?: string;
    };
    assignee_id?: number;
    created_at?: string;
    updated_at?: string;
}

const TasksClient = () => {
   const [data, setData] = useState<TasksData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await fetch('/api/tasks', {
        headers: {
        'Authorization': `Bearer xxxxx`,
        },
    })
                if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu task')
                const task = await res.json()
                setData(task.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Lỗi không xác định')
                console.log(err || 'Lỗi không xác định')
            } finally {
                setLoading(false)
            }
        }
        fetchTask()
    }, [])

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'N/A';
        }
    };

    const getPriorityBadge = (priority: string) => {
        const priorityClasses = {
            high: 'bg-red-100 text-red-800 border-red-200',
            medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            low: 'bg-green-100 text-green-800 border-green-200'
        };
        const className = priorityClasses[priority.toLowerCase() as keyof typeof priorityClasses] || 'bg-gray-100 text-gray-800 border-gray-200';
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${className}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
        );
    };

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            'to_do': 'bg-blue-100 text-blue-800 border-blue-200',
            'in_progress': 'bg-orange-100 text-orange-800 border-orange-200',
            'done': 'bg-green-100 text-green-800 border-green-200',
            'completed': 'bg-green-100 text-green-800 border-green-200',
            'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
        const className = statusClasses[status.toLowerCase() as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800 border-gray-200';
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${className}`}>
                {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
        );
    };

    if (loading) return (
        <div className="p-6">
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Đang tải...</span>
            </div>
        </div>
    )

    if (error) return (
        <div className="p-6">
            <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium">Lỗi khi tải dữ liệu</h3>
                <p className="text-sm mt-1">{error}</p>
            </div>
        </div>
    )

    if (!data || data.length === 0) return (
        <div className="p-6">
            <div className="text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                Không có dữ liệu task
            </div>
        </div>
    )

  return (
    <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Management (Client)</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee ID</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((task: TasksData) => (
                        <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                #{task.id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <div className="max-w-xs">
                                    <div className="font-medium">{task.title}</div>
                                    {task.description && (
                                        <div className="text-gray-500 text-xs mt-1 truncate">
                                            {task.description}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(task.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {getPriorityBadge(task.priority)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(task.start_date || task.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(task.due_date || task.updated_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {task.assignee?.id || task.assignee_id || 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="mt-4 text-sm text-gray-600">
            Total tasks: {data.length}
        </div>
    </div>
  )
}

export default TasksClient


