'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaCog, FaUser, FaShieldAlt, FaBell, FaPalette } from "react-icons/fa";
import { getUserRoles, isAdministrator } from "@/app/utils/Permission";

const SettingsPage = () => {
  const { data: session } = useSession();
  const userRoles = getUserRoles(session || {});
  const hasAdminRole = isAdministrator(userRoles);
  
  const [activeTab, setActiveTab] = useState('profile');

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

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FaUser },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'notifications', name: 'Notifications', icon: FaBell },
    { id: 'appearance', name: 'Appearance', icon: FaPalette },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
          Admin Only
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={session?.user?.email || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={session?.user?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Session Management</h3>
                    <p className="text-sm text-gray-600">Manage your active sessions</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                    View Sessions
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Task Updates</h3>
                    <p className="text-sm text-gray-600">Get notified when tasks are updated</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">System Alerts</h3>
                    <p className="text-sm text-gray-600">Important system notifications</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Appearance Settings</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Theme</h3>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Light</button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md">Dark</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Auto</button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Language</h3>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>English</option>
                    <option>Vietnamese</option>
                    <option>Japanese</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
