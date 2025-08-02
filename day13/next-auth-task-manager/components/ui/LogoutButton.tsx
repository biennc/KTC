'use client'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({
        callbackUrl: `/login`,
        redirect: true

      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full text-left disabled:opacity-50"
      data-logout-btn
    >
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </button>
  )
}

export default LogoutButton