'use client';

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import axiosClient from '@/lib/axios';
import ButtonWithPermissions from './ButtonWithPermission';
import { isAdministrator, getUserRoles } from "@/app/utils/Permission";

interface TaskData {
    id: number;
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

const TaskManagement = () => {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('view');

    const userRoles = getUserRoles(session);
    const hasAdminRole = isAdministrator(userRoles);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/workspaces/tasks');
            setTasks(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = () => {
        setSelectedTask(null);
        setModalType('add');
        setShowModal(true);
    };

    const handleEditTask = (task: TaskData) => {
        setSelectedTask(task);
        setModalType('edit');
        setShowModal(true);
    };

    const handleViewTask = (task: TaskData) => {
        setSelectedTask(task);
        setModalType('view');
        setShowModal(true);
    };

    const handleDeleteTask = async (taskId: number) => {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await axiosClient.delete(`/workspaces/tasks/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
            alert('Task deleted successfully!');
        } catch (err) {
            console.error('Error deleting task:', err);
            alert('Failed to delete task');
        }
    };

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
                <span className="ml-2 text-gray-600">Loading tasks...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="p-6">
            <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium">Error loading tasks</h3>
                <p className="text-sm mt-1">{error}</p>
                <button 
                    onClick={fetchTasks}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
                        <p className="text-sm text-gray-600 mt-1">Manage and organize your tasks</p>
                    </div>

                    {/* Add Task Button - Only visible to Administrators */}
                    <ButtonWithPermissions
                        onClick={handleAddTask}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <FaPlus className="w-4 h-4" />
                        Add Task
                    </ButtonWithPermissions>
                </div>

                {/* User Role Info */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">
                                <strong>User:</strong> {session?.user?.email || 'Unknown'}
                            </span>
                            <span className="text-gray-700">
                                <strong>Roles:</strong> {userRoles.map(role => role.name).join(', ') || 'No roles'}
                            </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            hasAdminRole
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                            {hasAdminRole ? 'Admin Access' : 'User Access'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                                    No tasks found
                                </td>
                            </tr>
                        ) : (
                            tasks.map((task: TaskData) => (
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            {/* View Button - Always visible */}
                                            <button
                                                onClick={() => handleViewTask(task)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                title="View Task"
                                            >
                                                <FaEye className="w-4 h-4" />
                                            </button>

                                            {/* Edit Button - Only for Administrators */}
                                            <ButtonWithPermissions
                                                onClick={() => handleEditTask(task)}
                                                className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                                            >
                                                <FaEdit className="w-4 h-4" />
                                            </ButtonWithPermissions>

                                            {/* Delete Button - Only for Administrators */}
                                            <ButtonWithPermissions
                                                onClick={() => handleDeleteTask(task.id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                            >
                                                <FaTrash className="w-4 h-4" />
                                            </ButtonWithPermissions>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    </table>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            Total tasks: {tasks.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;