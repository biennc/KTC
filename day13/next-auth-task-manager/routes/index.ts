// Route definitions and role-based access control
export interface RouteConfig {
  path: string;
  name: string;
  roles: string[];
  description: string;
  icon?: string;
}

// Define user roles
export enum UserRoles {
  ADMIN = 'Administrators',
  USER = 'Users',
  MANAGER = 'Managers'
}

// Route configurations with role-based access
export const routes: RouteConfig[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    roles: [UserRoles.ADMIN, UserRoles.USER, UserRoles.MANAGER],
    description: 'Main dashboard - accessible to all authenticated users',
    icon: 'dashboard'
  },
  {
    path: '/tasks',
    name: 'Tasks',
    roles: [UserRoles.ADMIN, UserRoles.USER, UserRoles.MANAGER],
    description: 'View tasks - users can only see their own tasks, admins see all',
    icon: 'tasks'
  },
  {
    path: '/tasks/create',
    name: 'Create Task',
    roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    description: 'Create new tasks - only admins and managers',
    icon: 'add'
  },
  {
    path: '/tasks/edit',
    name: 'Edit Task',
    roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    description: 'Edit tasks - only admins and managers',
    icon: 'edit'
  },
  {
    path: '/tasks/delete',
    name: 'Delete Task',
    roles: [UserRoles.ADMIN],
    description: 'Delete tasks - only admins',
    icon: 'delete'
  },
  {
    path: '/users',
    name: 'User Management',
    roles: [UserRoles.ADMIN],
    description: 'Manage users - only admins',
    icon: 'users'
  },
  {
    path: '/profile',
    name: 'Profile',
    roles: [UserRoles.ADMIN, UserRoles.USER, UserRoles.MANAGER],
    description: 'User profile - accessible to all authenticated users',
    icon: 'profile'
  },
  {
    path: '/settings',
    name: 'Settings',
    roles: [UserRoles.ADMIN],
    description: 'System settings - only admins',
    icon: 'settings'
  }
];

// Helper function to check if user has access to a route
export const hasRouteAccess = (userRoles: string[], routePath: string): boolean => {
  const route = routes.find(r => r.path === routePath);
  if (!route) return false;
  
  return userRoles.some(userRole => route.roles.includes(userRole));
};

// Get accessible routes for a user based on their roles
export const getAccessibleRoutes = (userRoles: string[]): RouteConfig[] => {
  return routes.filter(route => 
    userRoles.some(userRole => route.roles.includes(userRole))
  );
};

// Check if user is admin
export const isAdmin = (userRoles: string[]): boolean => {
  return userRoles.includes(UserRoles.ADMIN);
};

// Check if user is manager
export const isManager = (userRoles: string[]): boolean => {
  return userRoles.includes(UserRoles.MANAGER);
};

// Check if user has any elevated privileges (admin or manager)
export const hasElevatedPrivileges = (userRoles: string[]): boolean => {
  return isAdmin(userRoles) || isManager(userRoles);
};

// Task-specific permissions
export interface TaskPermissions {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canViewAll: boolean; // Can view all tasks, not just own tasks
}

// Get task permissions for a user
export const getTaskPermissions = (userRoles: string[]): TaskPermissions => {
  const admin = isAdmin(userRoles);
  const manager = isManager(userRoles);
  
  return {
    canView: true, // All authenticated users can view tasks
    canCreate: admin || manager,
    canEdit: admin || manager,
    canDelete: admin,
    canViewAll: admin || manager // Admins and managers can see all tasks
  };
};

// Navigation menu items based on user roles
export const getNavigationItems = (userRoles: string[]): RouteConfig[] => {
  const accessibleRoutes = getAccessibleRoutes(userRoles);
  
  // Filter out routes that shouldn't appear in navigation
  const navigationRoutes = accessibleRoutes.filter(route => 
    !route.path.includes('/edit') && 
    !route.path.includes('/delete') && 
    !route.path.includes('/create')
  );
  
  return navigationRoutes;
};

// API endpoint permissions
export interface ApiPermissions {
  tasks: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
    getAll: boolean;
  };
  users: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
}

// Get API permissions for a user
export const getApiPermissions = (userRoles: string[]): ApiPermissions => {
  const admin = isAdmin(userRoles);
  const manager = isManager(userRoles);
  
  return {
    tasks: {
      get: true, // All users can get their own tasks
      post: admin || manager,
      put: admin || manager,
      delete: admin,
      getAll: admin || manager // Can get all tasks, not just own
    },
    users: {
      get: admin, // Only admins can manage users
      post: admin,
      put: admin,
      delete: admin
    }
  };
};

// Route middleware helper
export const createRouteGuard = (requiredRoles: string[]) => {
  return (userRoles: string[]): boolean => {
    return userRoles.some(role => requiredRoles.includes(role));
  };
};

// Common route guards
export const routeGuards = {
  adminOnly: createRouteGuard([UserRoles.ADMIN]),
  managerOrAdmin: createRouteGuard([UserRoles.ADMIN, UserRoles.MANAGER]),
  authenticated: createRouteGuard([UserRoles.ADMIN, UserRoles.USER, UserRoles.MANAGER])
};
