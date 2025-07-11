// Create LoginContext to manage login state
import { useContext, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router';
import { FaTasks, FaPlus, FaUser, FaSignOutAlt, FaBars, FaTimes, FaClipboardList } from 'react-icons/fa';

import { LoginContext } from './context';
import AssigneeMe from '../pages/AssigneeMe';
import CreateTask from '../pages/CreateTask';
import Login from '../pages/Login';
import Tasks from '../pages/Tasks';
import UpdateTask from '../pages/UpdateTask';
import AccessDenied from '../pages/AccessDenied';

// Navigation Component
const Navigation = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, setUser } = useContext(LoginContext);
  // console.log('Navigation user:', user);

  if (!user) {
    return null; // Hide navigation if user is not logged in
  }

  const navItems = [
    { path: '/tasks', label: 'Tasks', exact: true, icon: FaTasks },
    { path: '/create', label: 'Create Task', exact: false, icon: FaPlus },
    { path: '/assignee-me', label: 'Assigned to Me', exact: false, icon: FaUser },
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg border-b border-blue-700 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <FaClipboardList className="text-blue-600 text-lg" />
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">Tasks Management</h1>
            <h1 className="text-lg font-bold text-white sm:hidden">Tasks</h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                    isActive(item.path, item.exact)
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-blue-100 hover:text-white hover:bg-blue-500/30'
                  }`}
                >
                  <IconComponent />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={() => {
                if (!confirm('Are you sure you want to logout?')) return;
                setUser(null); // Clear user context on logout
                navigate('/login'); // Redirect to login page on logout
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm bg-red-500 font-medium transition-all duration-200 text-white hover:bg-red-600 transform hover:scale-105 shadow-md"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-200 focus:outline-none focus:text-blue-200 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path, item.exact)
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-blue-100 hover:text-white hover:bg-blue-500/30'
                    }`}
                  >
                    <IconComponent className="text-lg" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setUser(null);
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm bg-red-500 font-medium transition-all duration-200 text-white hover:bg-red-600 shadow-md"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default function TasksManagement() {
  const [user, setUser] = useState(null);
  return (
    <LoginContext.Provider value={{ user: user, setUser: setUser }}>
      <div className="bg-gray-50">
        <BrowserRouter>
          <Navigation />
          <div className="container-fluid mx-auto px-8 py-4">
            <Routes>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />

              {user && <Route path="/tasks" element={<Tasks />} />}
              {user && <Route path="/create" element={<CreateTask />} />}
              {user && <Route path="/update/:id" element={<UpdateTask />} />}
              {user && <Route path="/assignee-me" element={<AssigneeMe />} />}
              <Route path="*" element={<AccessDenied />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </LoginContext.Provider>
  );
}