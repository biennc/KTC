import React from 'react';
import { FaExclamationCircle, FaExclamationTriangle, FaExclamation } from 'react-icons/fa';

import type { Task } from '../types';

type Props = {
  priority: 'low' | 'medium' | 'high';
};

export default function TaskPriority({ priority }: Props) {
  const getPriorityBadge = (priority: Task['priority']) => {
    const priorityConfig = {
      low: {
        style: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-300 shadow-sm',
        icon: FaExclamationCircle,
        label: 'Low'
      },
      medium: {
        style: 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-300 shadow-sm',
        icon: FaExclamationTriangle,
        label: 'Medium'
      },
      high: {
        style: 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-300 shadow-sm',
        icon: FaExclamation,
        label: 'High'
      },
    };

    const config = priorityConfig[priority];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 ${config.style}`}
      >
        <IconComponent className="mr-1.5" />
        {config.label}
      </span>
    );
  };

  return <React.Fragment>{getPriorityBadge(priority)}</React.Fragment>;
}
