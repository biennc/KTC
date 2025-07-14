import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">
            User Management
          </div>
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/users"
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('/users') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
              }`}
            >
              Users
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
