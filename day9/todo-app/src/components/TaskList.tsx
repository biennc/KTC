import type { Task } from '../types';
import TaskDate from './TaskDate';
import TaskPriority from './TaskPriority';
import TaskStatus from './TaskStatus';
import TaskTitle from './TaskTitle';

type Props = {
  tasks: Task[];
  onEdit?: (taskId: string | number | undefined) => void;
};

export default function TaskList({ tasks, onEdit }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500">Get started by creating your first task!</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Task</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Completed Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task: Task, index) => (
              <tr
                key={task.id}
                className={`hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.01] ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="px-6 py-4">
                  <TaskTitle task={{ title: task.title, description: task.description }} />
                </td>
                <td className="px-6 py-4 text-center">
                  <TaskStatus task={task} />
                </td>
                <td className="px-6 py-4 text-center">
                  <TaskPriority priority={task.priority} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <TaskDate date={task.start_date} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <TaskDate date={task.due_date} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <TaskDate date={task.completed_date} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{task.assignee_id || 'Unassigned'}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit?.(task.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {tasks.map((task: Task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden transform hover:scale-[1.02]"
          >
            <div className="p-6">
              {/* Task Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <TaskTitle task={{ title: task.title, description: task.description }} />
                </div>
                <button
                  onClick={() => onEdit?.(task.id)}
                  className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-sm"
                >
                  ✏️
                </button>
              </div>

              {/* Task Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Status:</span>
                  <div className="mt-1">
                    <TaskStatus task={task} />
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Priority:</span>
                  <div className="mt-1">
                    <TaskPriority priority={task.priority} />
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Start Date:</span>
                  <div className="mt-1 text-gray-900">
                    <TaskDate date={task.start_date} />
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Due Date:</span>
                  <div className="mt-1 text-gray-900">
                    <TaskDate date={task.due_date} />
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Completed:</span>
                  <div className="mt-1 text-gray-900">
                    <TaskDate date={task.completed_date} />
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Assignee:</span>
                  <div className="mt-1 text-gray-900">{task.assignee_id || 'Unassigned'}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
