'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { 
  extractRoleNames, 
  getUserTaskPermissions, 
  canAccessRoute,
  isAdministrator,
  hasManagerOrAdminRole
} from '../app/utils/Permission';
import { 
  getNavigationItems, 
  getApiPermissions,
  TaskPermissions,
  ApiPermissions 
} from '../routes/index';

export interface UsePermissionsReturn {
  // User info
  userRoles: string[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  isManagerOrAdmin: boolean;
  
  // Permissions
  taskPermissions: TaskPermissions;
  apiPermissions: ApiPermissions;
  
  // Route access
  canAccessRoute: (path: string) => boolean;
  navigationItems: any[];
  
  // Loading state
  loading: boolean;
}

export const usePermissions = (): UsePermissionsReturn => {
  const { data: session, status } = useSession();

  const result = useMemo(() => {
    const loading = status === 'loading';
    const isAuthenticated = !!session?.user;
    
    if (!isAuthenticated || !session?.user?.roles) {
      return {
        userRoles: [],
        isAuthenticated: false,
        isAdmin: false,
        isManagerOrAdmin: false,
        taskPermissions: {
          canView: false,
          canCreate: false,
          canEdit: false,
          canDelete: false,
          canViewAll: false,
        },
        apiPermissions: {
          tasks: {
            get: false,
            post: false,
            put: false,
            delete: false,
            getAll: false,
          },
          users: {
            get: false,
            post: false,
            put: false,
            delete: false,
          },
        },
        canAccessRoute: () => false,
        navigationItems: [],
        loading,
      };
    }

    const userRoles = extractRoleNames(session.user.roles);
    const isAdmin = isAdministrator(session.user.roles);
    const isManagerOrAdmin = hasManagerOrAdminRole(session.user.roles);
    const taskPermissions = getUserTaskPermissions(session.user.roles);
    const apiPermissions = getApiPermissions(userRoles);
    const navigationItems = getNavigationItems(userRoles);

    return {
      userRoles,
      isAuthenticated,
      isAdmin,
      isManagerOrAdmin,
      taskPermissions,
      apiPermissions,
      canAccessRoute: (path: string) => canAccessRoute(session.user.roles, path),
      navigationItems,
      loading,
    };
  }, [session, status]);

  return result;
};

// Convenience hooks for specific checks
export const useIsAdmin = (): boolean => {
  const { isAdmin } = usePermissions();
  return isAdmin;
};

export const useIsManagerOrAdmin = (): boolean => {
  const { isManagerOrAdmin } = usePermissions();
  return isManagerOrAdmin;
};

export const useTaskPermissions = (): TaskPermissions => {
  const { taskPermissions } = usePermissions();
  return taskPermissions;
};

export const useCanAccessRoute = (path: string): boolean => {
  const { canAccessRoute } = usePermissions();
  return canAccessRoute(path);
};

export default usePermissions;
