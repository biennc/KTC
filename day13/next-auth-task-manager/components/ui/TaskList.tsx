'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { getUserTaskPermissions, extractRoleNames } from '../../app/utils/Permission';
import { FiEdit, FiTrash2, FiPlus, FiEye } from 'react-icons/fi';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskListProps {
  className?: string;
}

const TaskList: React.FC<TaskListProps> = ({ className = '' }) => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user permissions
  const userRoles = session?.user?.roles ? extractRoleNames(session.user.roles) : [];
  const permissions = getUserTaskPermissions(session?.user?.roles || []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/tasks`, {
        headers: {
          'Authorization': `Bearer ${session?.user?.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!permissions.canDelete) {
      alert('You do not have permission to delete tasks');
      return;
    }

    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.user?.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Refresh tasks list
      fetchTasks();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  const filterTasks = (tasks: Task[]): Task[] => {
    if (permissions.canViewAll) {
      // Admins and managers can see all tasks
      return tasks;
    } else {
      // Regular users can only see their own tasks
      return tasks.filter(task => 
        task.assignedTo === session?.user?.email || 
        task.createdBy === session?.user?.email
      );
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center p-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  const filteredTasks = filterTasks(tasks);

  return (
    <div className={`p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Tasks {permissions.canViewAll ? '(All Tasks)' : '(My Tasks)'}
        </h2>
        {permissions.canCreate && (
          <button
            onClick={() => window.location.href = '/tasks/create'}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="mr-2" />
            Create Task
          </button>
        )}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {task.title}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  task.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : task.status === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {task.description}
              </p>
              
              <div className="text-xs text-gray-500 mb-4">
                <p>Created by: {task.createdBy}</p>
                {task.assignedTo && <p>Assigned to: {task.assignedTo}</p>}
                <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => window.location.href = `/tasks/${task.id}`}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiEye className="mr-1" />
                  View
                </button>
                
                {permissions.canEdit && (
                  <button
                    onClick={() => window.location.href = `/tasks/edit/${task.id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiEdit className="mr-1" />
                    Edit
                  </button>
                )}
                
                {permissions.canDelete && (
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FiTrash2 className="mr-1" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
