import { useForm } from 'react-hook-form';
import { FaSearch, FaChartBar, FaBullseye, FaSpinner, FaChevronDown } from 'react-icons/fa';
import type { Filter } from '../types';

// Filter form data interface
interface FormData {
  status: string;
  priority: string;
}

// Filter criteria interface for parent component
type Props = {
  onSearch: (filters: Filter) => void;
};

export default function TaskFilterForm({ onSearch }: Props) {
  const {
    register,
    formState: { errors, isSubmitting },

    handleSubmit,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      status: '',
      priority: '',
    },
  });

  // Handle form submission to apply filters
  const onSubmit = async (data: FormData) => {
    // Convert form data to filter criteria
    const filters: Filter = {};

    if (data.status && data.status !== '') {
      filters.status = data.status;
    }

    if (data.priority && data.priority !== '') {
      filters.priority = data.priority;
    }

    onSearch(filters);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
            <FaSearch className="mr-3" />
            Filter Tasks
          </h2>
          <p className="text-gray-600">Find exactly what you're looking for</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Status Filter */}
            <div className="space-y-2">
              <label htmlFor="status" className="flex items-center text-sm font-semibold text-gray-700">
                <FaChartBar className="mr-2" />
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  {...register('status')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  <option value="to_do">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FaChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.status && <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.status.message}
              </p>}
            </div>

            {/* Priority Filter */}
            <div className="space-y-2">
              <label htmlFor="priority" className="flex items-center text-sm font-semibold text-gray-700">
                <FaBullseye className="mr-2" />
                Priority
              </label>
              <div className="relative">
                <select
                  id="priority"
                  {...register('priority')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer"
                >
                  <option value="">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FaChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.priority && <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.priority.message}
              </p>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-end space-y-3 md:col-span-2 xl:col-span-1">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 border border-transparent rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch className="mr-2" />
                    Search Tasks
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}