'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axiosClient from '@/lib/axios';
import { isAdministrator, getUserRoles } from "@/app/utils/Permission";

interface TaskFormData {
    id: number | string;
    title: string;
    description: string;
    status: string;
    priority: string;
    start_date: string;
    due_date: string;
    assignee_id: string;
}

interface TaskFormProps {
    task?: TaskFormData;
    onSubmit?: (data: TaskFormData) => void;
    onCancel?: () => void;
    mode: 'add' | 'edit' | 'view';
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, mode }) => {
    const { data: session } = useSession();
    const userRoles = getUserRoles(session || {});
    const hasAdminRole = isAdministrator(userRoles);

    const [formData, setFormData] = useState<TaskFormData>({
        id: task?.id || '',
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'to_do',
        priority: task?.priority || 'medium',
        start_date: task?.start_date ? new Date(task.start_date).toISOString().split('T')[0] : '',
        due_date: task?.due_date ? new Date(task.due_date).toISOString().split('T')[0] : '',
        assignee_id: task?.assignee_id?.toString() || '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!hasAdminRole && mode !== 'view') {
            setError('You do not have permission to perform this action');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (mode === 'add') {
                await axiosClient.post(`${process.env.NEXTAUTH_URL}/workspaces/tasks`, formData);
                alert('Task created successfully!');
            } else if (mode === 'edit') {
                await axiosClient.put(`${process.env.NEXTAUTH_URL}/workspaces/tasks/${formData.id}`, formData);
                alert('Task updated successfully!');
            }
            
            if (onSubmit) {
                onSubmit(formData);
            }
        } catch (err) {
            console.error('Error saving task:', err);
            setError('Failed to save task');
        } finally {
            setLoading(false);
        }
    };

    const isReadOnly = mode === 'view' || !hasAdminRole;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {mode === 'add' ? 'Add Task' : mode === 'edit' ? 'Edit Task' : 'View Task'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
                        {error}
                    </div>
                )}

                {!hasAdminRole && mode !== 'view' && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-700">
                        You need Administrator role to {mode} tasks.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            readOnly={isReadOnly}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                isReadOnly ? 'bg-gray-50' : ''
                            }`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            readOnly={isReadOnly}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                isReadOnly ? 'bg-gray-50' : ''
                            }`}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    isReadOnly ? 'bg-gray-50' : ''
                                }`}
                            >
                                <option value="to_do">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Priority
                            </label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                disabled={isReadOnly}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    isReadOnly ? 'bg-gray-50' : ''
                                }`}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    isReadOnly ? 'bg-gray-50' : ''
                                }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Due Date
                            </label>
                            <input
                                type="date"
                                name="due_date"
                                value={formData.due_date}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    isReadOnly ? 'bg-gray-50' : ''
                                }`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Assignee ID
                        </label>
                        <input
                            type="number"
                            name="assignee_id"
                            value={formData.assignee_id}
                            onChange={handleChange}
                            readOnly={isReadOnly}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                isReadOnly ? 'bg-gray-50' : ''
                            }`}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            {mode === 'view' ? 'Close' : 'Cancel'}
                        </button>
                        
                        {mode !== 'view' && hasAdminRole && (
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : mode === 'add' ? 'Create Task' : 'Update Task'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
