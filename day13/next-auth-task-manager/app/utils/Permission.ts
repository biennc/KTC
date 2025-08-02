// Import route-based permissions
import {
  getTaskPermissions,
  hasRouteAccess,
  isAdmin,
  hasElevatedPrivileges,
  UserRoles
} from '../../routes/index';

// Types for user roles
export interface UserRole {
  id: string | number;
  name: string;
}

export interface UserSession {
  user?: {
    roles?: UserRole[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// Convert UserRole objects to string array
export const extractRoleNames = (userRoles: UserRole[]): string[] => {
  if (!userRoles || !Array.isArray(userRoles)) {
    return [];
  }
  return userRoles.map((role: UserRole) => {
    return typeof role === 'string' ? role : role?.name;
  }).filter(Boolean);
};

// Check if user has specific permissions
export const hasPermissions = (userRoles: UserRole[], permissions: string[]): boolean => {
  const roleNames = extractRoleNames(userRoles);
  return roleNames.some(roleName => permissions.includes(roleName));
};

// Check if user has administrator role
export const isAdministrator = (userRoles: UserRole[]): boolean => {
  const roleNames = extractRoleNames(userRoles);
  return isAdmin(roleNames);
};

// Check if user can access a specific route
export const canAccessRoute = (userRoles: UserRole[], routePath: string): boolean => {
  const roleNames = extractRoleNames(userRoles);
  return hasRouteAccess(roleNames, routePath);
};

// Get task permissions for user
export const getUserTaskPermissions = (userRoles: UserRole[]) => {
  const roleNames = extractRoleNames(userRoles);
  return getTaskPermissions(roleNames);
};

// Check if user has elevated privileges (admin or manager)
export const hasManagerOrAdminRole = (userRoles: UserRole[]): boolean => {
  const roleNames = extractRoleNames(userRoles);
  return hasElevatedPrivileges(roleNames);
};

// Get user roles from session
export const getUserRoles = (session: unknown): UserRole[] => {
  const sessionObj = session as UserSession;
  return sessionObj?.user?.roles || [];
};