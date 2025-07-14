import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useUsers } from '../UserProvider';

export default function DisplayUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserById } = useUsers();

  const user = id ? getUserById(parseInt(id)) : null;

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-800 mb-2">User Not Found</h2>
          <p className="text-red-600 mb-4">
            The user with ID {id} could not be found.
          </p>
          <button
            onClick={() => navigate('/users')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Back to User List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">User Details</h1>
            <button
              onClick={() => navigate('/users')}
              className="bg-white bg-opacity-20 text-white px-3 py-1 rounded hover:bg-opacity-30 transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* User Information */}
        <div className="p-6">
          <div className="grid gap-6">
            {/* ID */}
            <div className="flex items-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-blue-600">#{user.id}</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">User ID: {user.id}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Address
                </label>
                <p className="text-lg text-gray-800">{user.email}</p>
              </div>

              {/* Age */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Age
                </label>
                <p className="text-lg text-gray-800">
                  {user.age !== undefined ? (
                    <span className="font-semibold">{user.age} years old</span>
                  ) : (
                    <span className="text-gray-500 italic">N/A</span>
                  )}
                </p>
              </div>

              {/* Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Status
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active User
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => navigate('/users')}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Back to User List
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
