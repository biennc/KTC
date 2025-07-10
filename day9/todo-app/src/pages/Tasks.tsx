import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaTasks, FaPlus, FaClipboardList } from 'react-icons/fa';

import TaskFilterForm from '../components/TaskFilterForm';
import TaskList from '../components/TaskList';
import { searchTasks } from '../utils';

import type { Filter, Task } from '../types';
import { getTasks } from '../services';

export default function Tasks() {
  const navigate = useNavigate();
  // Mock data for demonstration
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filters, setFilters] = React.useState<Filter>({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleSearch = (newFilters: Filter) => {
    setFilters(newFilters);
  };

  const handleEdit = (taskId: string | number | undefined) => {
    navigate(`/update/${taskId}`);
  };

  const filteredTasks = searchTasks(tasks, filters);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <FaClipboardList className="mr-3" />
                Task Dashboard
              </h1>
              <p className="text-gray-600">Manage and track all your tasks efficiently</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
                <span className="text-sm font-medium text-gray-600">Total Tasks: </span>
                <span className="text-lg font-bold text-blue-600">{tasks.length}</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
                <span className="text-sm font-medium text-gray-600">Filtered: </span>
                <span className="text-lg font-bold text-green-600">{filteredTasks.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <section className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-200">
          <TaskFilterForm onSearch={handleSearch} />
        </section>

        {/* Task List Section */}
        <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaTasks className="mr-3" />
                  Our Tasks
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredTasks.length === 0
                    ? "No tasks match your current filters"
                    : `Showing ${filteredTasks.length} of ${tasks.length} tasks`
                  }
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => navigate('/create')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <FaPlus className="mr-2" />
                  Create New Task
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <TaskList tasks={filteredTasks} onEdit={handleEdit} />
          </div>
        </section>
      </div>
    </div>
  );
}