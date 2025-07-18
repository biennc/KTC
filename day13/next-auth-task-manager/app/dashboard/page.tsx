'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaTasks,
  FaUsers,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlus,
  FaArrowRight
} from "react-icons/fa";
import Link from "next/link";
import { getUserRoles, isAdministrator } from "@/app/utils/Permission";

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0
  });

  const userRoles = getUserRoles(session || {});
  const hasAdminRole = isAdministrator(userRoles);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    // Simulate loading stats
    const loadStats = () => {
      setStats({
        totalTasks: 24,
        completedTasks: 18,
        pendingTasks: 4,
        overdueTasks: 2
      });
    };

    if (session) {
      loadStats();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: FaTasks,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: FaCheckCircle,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: FaClock,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700"
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      icon: FaExclamationTriangle,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700"
    }
  ];

  const quickActions = [
    {
      title: "Task Management",
      description: "Manage all your tasks in one place",
      href: "/dashboard/tasks-management",
      icon: FaTasks,
      color: "bg-blue-500"
    },
    {
      title: "Server Tasks",
      description: "View server-side rendered tasks",
      href: "/dashboard/tasks-server",
      icon: FaUsers,
      color: "bg-green-500"
    },
    {
      title: "Client Tasks",
      description: "Interactive client-side task management",
      href: "/dashboard/tasks-client",
      icon: FaChartLine,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {session.user?.email?.split('@')[0] || 'User'}!
        </h1>
        <p className="text-blue-100 mb-4">
          Here&apos;s what&apos;s happening with your tasks today.
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Online
          </span>
          <span>Role: {hasAdminRole ? 'Administrator' : 'User'}</span>
          <span>Last login: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${action.color} p-2 rounded-lg`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                  </div>
                  <FaArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Task &quot;Complete project documentation&quot; was completed</span>
                <span className="text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">New task &quot;Review code changes&quot; was created</span>
                <span className="text-gray-400">4 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">Task &quot;Update dependencies&quot; is due tomorrow</span>
                <span className="text-gray-400">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Section */}
      {hasAdminRole && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-red-800 mb-2">Administrator Panel</h2>
              <p className="text-red-600">You have administrator privileges. Access advanced features and settings.</p>
            </div>
            <Link
              href="/dashboard/role-demo"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              Admin Features
            </Link>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DashboardPage;