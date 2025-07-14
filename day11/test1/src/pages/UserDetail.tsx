import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUsers } from '../UserProvider';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const { getUserById } = useUsers();

  const user = id ? getUserById(parseInt(id)) : null;

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">User Not Found</h2>
          <p className="text-red-600 mb-6">
            The user with ID <span className="font-semibold">{id}</span> could not be found.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/users"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Back to Users
            </Link>
            <Link
              to="/"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 text-white p-6">
          <h1 className="text-3xl font-bold">User Details</h1>
          <p className="text-blue-100 mt-2">Complete information for user #{user.id}</p>
        </div>
        
        {/* User Information */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {user.id}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {user.name}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Email Address
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  <a 
                    href={`mailto:${user.email}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {user.email}
                  </a>
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {user.age ? `${user.age} years old` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <Link
                to="/users"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Back to Users
              </Link>
              <Link
                to="/"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Go to Home
              </Link>
            </div>
            <div className="text-sm text-gray-500">
              User created with ID: {user.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
