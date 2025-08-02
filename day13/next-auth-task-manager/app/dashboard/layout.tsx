'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import {
  FaTasks,
  FaServer,
  FaDesktop,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaChartBar,
  FaHome,
  FaAngleLeft
} from "react-icons/fa";
import LogoutButton from "@/components/ui/LogoutButton";
import { getUserRoles, isAdministrator } from "@/app/utils/Permission";

const DashboardLayout = ({children}:{children: React.ReactNode}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Auto-collapse on mobile
  const handleNavClick = () => {
    setSidebarOpen(false);
  };
  const { data: session } = useSession();
  const pathname = usePathname();

  const userRoles = getUserRoles(session || {});
  const hasAdminRole = isAdministrator(userRoles);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: FaHome,
      adminOnly: false
    },
    {
      name: 'Tasks (Server)',
      href: '/dashboard/tasks-server',
      icon: FaServer,
      adminOnly: false
    },
    {
      name: 'Tasks (Client)',
      href: '/dashboard/tasks-client',
      icon: FaDesktop,
      adminOnly: false
    },
    {
      name: 'Role Demo',
      href: '/dashboard/role-demo',
      icon: FaShieldAlt,
      adminOnly: false
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: FaChartBar,
      adminOnly: true
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: FaCog,
      adminOnly: true
    }
  ];

  const filteredNavItems = navigationItems.filter(item =>
    !item.adminOnly || hasAdminRole
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-blue-800 shadow-lg transform transition-all duration-300${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-56'} w-56`}>
        <div className="flex items-center justify-between h-14 px-4 bg-blue-900 border-b border-blue-700">
          {!sidebarCollapsed && (
            <h1 className="text-lg font-bold text-white">
              Task Manager
            </h1>
          )}

          {sidebarCollapsed && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FaTasks className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {/* Desktop collapse toggle */}
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block text-white hover:text-blue-200 transition-colors p-1 rounded"
            >
              <FaAngleLeft className="w-4 h-4" />
            </button>
          )}

          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-red-500 hover:text-blue-200"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className={`border-b border-blue-700 transition-all duration-300 ${
          sidebarCollapsed ? 'p-2' : 'p-4'
        }`}>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FaUser className="w-4 h-4 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {session?.user?.email?.split('@')[0] || 'Guest'}
                </p>
                <p className="text-xs text-blue-200">
                  {hasAdminRole ? 'Administrator' : 'User'}
                </p>
              </div>
            )}
          </div>

          {/* Role badges - only show when not collapsed */}
          {!sidebarCollapsed && userRoles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {userRoles.map((role, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs rounded-full ${
                    role.name === 'Administrators'
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-600 text-blue-100'
                  }`}
                >
                  {role.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 py-4 space-y-1 transition-all duration-300 ${
          sidebarCollapsed ? 'px-2' : 'px-3'
        }`}>
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg transition-colors duration-200 ${
                    sidebarCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2'
                  } ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                  onClick={handleNavClick}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className={`w-4 h-4 ${
                    sidebarCollapsed ? '' : 'mr-3'
                  } ${isActive ? 'text-white' : 'text-blue-200'}`} />

                  {!sidebarCollapsed && (
                    <>
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.adminOnly && (
                        <FaShieldAlt className="w-3 h-3 ml-auto text-yellow-400" />
                      )}
                    </>
                  )}
                </Link>

                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                    {item.adminOnly && (
                      <span className="ml-1 text-yellow-300">👑</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className={`border-t border-blue-700 transition-all duration-300 ${
          sidebarCollapsed ? 'p-2' : 'p-3'
        }`}>
          {sidebarCollapsed ? (
            <button
              onClick={() => {
                // Trigger logout when collapsed
                const logoutBtn = document.querySelector('[data-logout-btn]') as HTMLButtonElement;
                if (logoutBtn) logoutBtn.click();
              }}
              className="flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-red-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200 group relative"
            >
              <FaSignOutAlt className="w-4 h-4" />

              {/* Tooltip for collapsed state */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Sign Out
              </div>
            </button>
          ) : (
            <div className="flex items-center px-3 py-2 text-sm font-medium text-red-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200 cursor-pointer">
              <FaSignOutAlt className="w-4 h-4 mr-3" />
              <LogoutButton />
            </div>
          )}

          {/* Hidden logout button for collapsed state trigger */}
          <div className="hidden">
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-56'
      }`}>
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
              >
                <FaBars className="w-6 h-6" />
              </button>

              {/* Desktop sidebar toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 mr-4 rounded-md hover:bg-gray-100 transition-colors"
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {sidebarCollapsed ? (
                  <FaBars className="w-4 h-4" />
                ) : (
                  <FaAngleLeft className="w-4 h-4" />
                )}
              </button>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {navigationItems.find(item => item.href === pathname)?.name || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-500">
                  Welcome back, {session?.user?.email?.split('@')[0] || 'User'}
                </p>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <span>Status:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Online
                </span>
              </div>

              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaUser className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;