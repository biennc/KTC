'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavigationItems, RouteConfig } from '../../routes/index';
import { extractRoleNames } from '../../app/utils/Permission';
import { 
  FiHome, 
  FiCheckSquare, 
  FiUser, 
  FiSettings, 
  FiUsers,
  FiPlus,
  FiEdit,
  FiTrash2
} from 'react-icons/fi';

// Icon mapping
const iconMap: Record<string, React.ComponentType> = {
  dashboard: FiHome,
  tasks: FiCheckSquare,
  profile: FiUser,
  settings: FiSettings,
  users: FiUsers,
  add: FiPlus,
  edit: FiEdit,
  delete: FiTrash2,
};

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session?.user?.roles) {
    return null;
  }

  const userRoles = extractRoleNames(session.user.roles);
  const navigationItems = getNavigationItems(userRoles);

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <nav className={`bg-white shadow-lg ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item: RouteConfig) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <span className="mr-2">
                      {renderIcon(item.icon)}
                    </span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-sm text-gray-500">
                Welcome, {session.user.name || session.user.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigationItems.map((item: RouteConfig) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">
                    {renderIcon(item.icon)}
                  </span>
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
