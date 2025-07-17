'use client';

import { useSession } from 'next-auth/react';
import { FaPlus, FaEdit, FaTrash, FaUser, FaShieldAlt } from 'react-icons/fa';
import ButtonWithPermissions from '@/components/ui/ButtonWithPermission';
import { isAdministrator, getUserRoles } from "@/app/utils/Permission";

const RoleDemoPage = () => {
    const { data: session, status } = useSession();
    
    if (status === 'loading') {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading session...</span>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="p-6">
                <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-medium">Not Authenticated</h3>
                    <p className="text-sm mt-1">Please log in to view this page.</p>
                </div>
            </div>
        );
    }

    const userRoles = getUserRoles(session);
    const hasAdminRole = isAdministrator(userRoles);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Role-Based Authorization Demo</h1>
            
            {/* User Information */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FaUser className="text-blue-600" />
                    Current User Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <p className="text-gray-900">{session.user?.email || 'N/A'}</p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <p className="text-gray-900">{session.user?.name || 'N/A'}</p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">User ID:</label>
                        <p className="text-gray-900">{session.user?.id || 'N/A'}</p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Access Token:</label>
                        <p className="text-gray-900 truncate">{session.user?.accessToken ? '***' + session.user.accessToken.slice(-10) : 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Role Information */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FaShieldAlt className="text-green-600" />
                    Role & Permissions
                </h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">User Roles:</label>
                        {userRoles.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {userRoles.map((role, index) => (
                                    <span 
                                        key={index}
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            role.name === 'Administrators' 
                                                ? 'bg-red-100 text-red-800 border border-red-200'
                                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                                        }`}
                                    >
                                        {role.name}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No roles assigned</p>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Administrator Access:</label>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            hasAdminRole 
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                            {hasAdminRole ? 'Yes - Full Access' : 'No - Limited Access'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons Demo */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Role-Protected Action Buttons</h2>
                <p className="text-gray-600 mb-4">
                    The buttons below are only visible to users with Administrator role. 
                    If you don&apos;t have admin access, you won&apos;t see the Add, Edit, and Delete buttons.
                </p>
                
                <div className="flex flex-wrap gap-3">
                    {/* Always visible button */}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                        <FaUser className="w-4 h-4" />
                        View (Always Visible)
                    </button>
                    
                    {/* Admin-only buttons */}
                    <ButtonWithPermissions
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FaPlus className="w-4 h-4" />
                        Add (Admin Only)
                    </ButtonWithPermissions>
                    
                    <ButtonWithPermissions
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FaEdit className="w-4 h-4" />
                        Edit (Admin Only)
                    </ButtonWithPermissions>
                    
                    <ButtonWithPermissions
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FaTrash className="w-4 h-4" />
                        Delete (Admin Only)
                    </ButtonWithPermissions>
                </div>
            </div>

            {/* Implementation Guide */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Implementation Guide</h2>
                
                <div className="space-y-4 text-sm">
                    <div>
                        <h3 className="font-medium text-gray-800 mb-2">1. Using ButtonWithPermissions Component:</h3>
                        <pre className="bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`<ButtonWithPermissions
    className="bg-blue-600 text-white px-4 py-2 rounded"
    onClick={handleAction}
>
    Admin Only Button
</ButtonWithPermissions>`}
                        </pre>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-gray-800 mb-2">2. Manual Role Checking:</h3>
                        <pre className="bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`const { data: session } = useSession();
const userRoles = getUserRoles(session);
const hasAdminRole = isAdministrator(userRoles);

{hasAdminRole && (
    <button>Admin Only Content</button>
)}`}
                        </pre>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-gray-800 mb-2">3. Using Axios Client with Auto-Auth:</h3>
                        <pre className="bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`import axiosClient from '@/lib/axios';

// Automatically includes auth token from session
const response = await axiosClient.get('/workspaces/tasks');`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleDemoPage;
