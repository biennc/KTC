'use client';

import { useSession } from "next-auth/react";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";
import { getUserRoles, isAdministrator } from "@/app/utils/Permission";

const AnalyticsPage = () => {
  const { data: session } = useSession();
  const userRoles = getUserRoles(session || {});
  const hasAdminRole = isAdministrator(userRoles);

  if (!hasAdminRole) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h1>
          <p className="text-red-600">You need Administrator privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
          Admin Only
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Task Completion Rate</h2>
            <FaChartPie className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
          <p className="text-sm text-gray-600">+5% from last month</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Active Users</h2>
            <FaChartBar className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">142</div>
          <p className="text-sm text-gray-600">+12 new this week</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Performance</h2>
            <FaChartLine className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">98.5%</div>
          <p className="text-sm text-gray-600">System uptime</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Analytics Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Task Analytics</h3>
            <p className="text-sm text-gray-600">Detailed insights into task completion, user productivity, and project progress.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">User Behavior</h3>
            <p className="text-sm text-gray-600">Track user engagement, login patterns, and feature usage statistics.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Performance Metrics</h3>
            <p className="text-sm text-gray-600">Monitor system performance, response times, and resource utilization.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Custom Reports</h3>
            <p className="text-sm text-gray-600">Generate custom reports and export data for further analysis.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
