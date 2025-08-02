'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { extractRoleNames } from '../../app/utils/Permission';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
  requireAll?: boolean; // If true, user must have ALL roles, if false, user needs ANY role
}

const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  fallback = null,
  requireAll = false 
}) => {
  const { data: session, status } = useSession();

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, show fallback
  if (!session?.user?.roles) {
    return <>{fallback}</>;
  }

  const userRoles = extractRoleNames(session.user.roles);

  // Check if user has required roles
  const hasAccess = requireAll
    ? allowedRoles.every(role => userRoles.includes(role))
    : allowedRoles.some(role => userRoles.includes(role));

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Convenience components for common role checks
export const AdminOnly: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback 
}) => (
  <RoleGuard allowedRoles={['Administrators']} fallback={fallback}>
    {children}
  </RoleGuard>
);

export const ManagerOrAdmin: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback 
}) => (
  <RoleGuard allowedRoles={['Administrators', 'Managers']} fallback={fallback}>
    {children}
  </RoleGuard>
);

export const AuthenticatedOnly: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback 
}) => (
  <RoleGuard allowedRoles={['Administrators', 'Managers', 'Users']} fallback={fallback}>
    {children}
  </RoleGuard>
);

export default RoleGuard;
