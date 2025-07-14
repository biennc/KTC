import React, { useState } from 'react';
import { useUsers } from '../UserProvider';
import { Signup } from '../Signup';

export default function Home() {
  const { users, displayUser } = useUsers();
  const [showForm, setShowForm] = useState(false);

  const handleViewDetails = (userId: number) => {
    displayUser(userId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        User Management System
      </h1>
      
      {/* User Form Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Add New User</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {showForm ? 'Hide Form' : 'Show Form'}
          </button>
        </div>
        
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Signup initialEmail="" />
          </div>
        )}
      </div>

      {/* User List Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">User List</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">No users found.</p>
              <p className="text-sm mt-2">Add your first user using the form above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.age || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(user.id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
