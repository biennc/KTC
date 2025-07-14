import { useNavigate } from 'react-router';
import { useUsers } from '../UserProvider';

export default function HomePage() {
    const navigate = useNavigate();
    const { users, totalUsers } = useUsers();

    const handleNavigateUserList = () => {
        navigate('/users');
    };

    const handleNavigateUserDetail = () => {
        // Navigate to first user if exists, otherwise show message
        if (users.length > 0) {
            navigate(`/users/${users[0].id}`);
        } else {
            alert('No users available. Please add some users first.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Welcome to User Management System
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Manage your users efficiently with our comprehensive system
                    </p>
                    <div className="bg-white rounded-lg shadow-md p-4 inline-block">
                        <span className="text-2xl font-bold text-blue-600">{totalUsers}</span>
                        <span className="text-gray-600 ml-2">Total Users</span>
                    </div>
                </div>

                {/* Navigation Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* User List Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">User List</h2>
                            <p className="text-gray-600 mb-6">
                                View and manage all users in the system. Add, edit, or delete user records.
                            </p>
                            <button
                                onClick={handleNavigateUserList}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                            >
                                View All Users
                            </button>
                        </div>
                    </div>

                    {/* User Detail Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">User Details</h2>
                            <p className="text-gray-600 mb-6">
                                View detailed information about individual users including their profile data.
                            </p>
                            <button
                                onClick={handleNavigateUserDetail}
                                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
                            >
                                View User Detail
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-12 text-center">
                    <div className="bg-white rounded-lg shadow-md p-6 inline-block">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Quick Navigation</h3>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/users')}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Users
                            </button>
                            <span className="text-gray-400">|</span>
                            <button
                                onClick={handleNavigateUserDetail}
                                className="text-green-600 hover:text-green-800 font-medium"
                            >
                                User Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}