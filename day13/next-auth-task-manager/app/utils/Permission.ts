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

// only role administrators can modify and delete task
export const hasPermissions = (userRoles: UserRole[], permissions: string[]): boolean => {
  if (!userRoles || !Array.isArray(userRoles)) {
    return false;
  }
  return userRoles.some((role: UserRole) => {
    const roleName = typeof role === 'string' ? role : role?.name;
    return permissions.includes(roleName);
  });
};

// Check if user has administrator role
export const isAdministrator = (userRoles: UserRole[]): boolean => {
  return hasPermissions(userRoles, ['Administrators']);
};

// Get user roles from session
export const getUserRoles = (session: unknown): UserRole[] => {
  const sessionObj = session as UserSession;
  return sessionObj?.user?.roles || [];
};