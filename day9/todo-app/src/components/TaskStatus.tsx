import React from 'react';
import { MdAssignment, MdPlayArrow, MdCheckCircle } from 'react-icons/md';

import type { Task } from '../types';

export default function TaskStatus({ task }: { task: Task }) {
  const getStatusBadge = (status: Task['status']) => {
    const statusConfig = {
      to_do: {
        style: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300 shadow-sm',
        icon: MdAssignment,
        label: 'To Do'
      },
      in_progress: {
        style: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300 shadow-sm',
        icon: MdPlayArrow,
        label: 'In Progress'
      },
      done: {
        style: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 shadow-sm',
        icon: MdCheckCircle,
        label: 'Done'
      },
    };

    const config = statusConfig[status];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 whitespace-nowrap ${config.style}`}
      >
        <IconComponent className="mr-1.5 flex-shrink-0" />
        {config.label}
      </span>
    );
  };
  return <React.Fragment>{getStatusBadge(task.status)}</React.Fragment>;
}
