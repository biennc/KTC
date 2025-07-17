'use client';

import { useSession } from 'next-auth/react';
import { isAdministrator, getUserRoles } from "@/app/utils/Permission";

/**
 * Protect Action Button with children Components
 * @param param0
 * @returns
 */
const ButtonWithPermissions: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }> = ({ children, onClick, className = '', disabled = false, type = 'button', ...props }) => {

    const { data: session } = useSession();
    const userRoles = getUserRoles(session || {});

    // Only show button if user has administrator role
    if (!isAdministrator(userRoles)) {
      return null;
    }

    return (
      <button
        type={type}
        onClick={onClick}
        className={className}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };

export default ButtonWithPermissions;