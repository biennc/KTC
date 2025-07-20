/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NavigateFunction } from 'react-router';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { setAxiosToken } from '@/lib/axios';

export interface LoggedInUser {
  id: string | number;
  email: string;
  isActive: boolean;
  roles: {
    id: number;
    name: string;
  }[];
}

export interface AuthState {
  access_token?: string;
  loggedInUser?: LoggedInUser;
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
  user?: LoggedInUser;
  login: ({ username, password, navigate }: { username: string; password: string; navigate: NavigateFunction }) => Promise<void>;
  logOut: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools((set, get) => ({
    access_token: undefined,
    loggedInUser: undefined,
    loading: false,
    error: null,
    get isAuthenticated() {
      return !!(get().access_token && get().loggedInUser);
    },
    get user() {
      return get().loggedInUser;
    },

    login: async ({ username, password, navigate }) => {
      try {
        set({
          access_token: undefined,
          loggedInUser: undefined,
          error: null,
          loading: true,
        });

        console.log('Auth: Attempting login for user:', username);
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        console.log('Auth: Login response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Auth: Login failed with status:', response.status, errorData);
          throw new Error(`Login failed: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Auth: Login successful, received data keys:', Object.keys(data));

        // Update axios token
        setAxiosToken(data.access_token);

        set({
          access_token: data.access_token,
          loggedInUser: data.loggedInUser,
          loading: false,
          error: null,
        });

        console.log('Auth: Navigating to /dashboard');
        navigate('/dashboard');
      } catch (error) {
        set({
          access_token: undefined,
          loggedInUser: undefined,
          error,
          loading: false,
        });
      }
    },

    refreshAccessToken: async () => {
      // Since we're not storing refresh tokens, we can't refresh
      // Just clear the auth state and redirect to login
      console.log('Auth: Refresh not supported - tokens stored only in memory');
      setAxiosToken(null);
      set({ access_token: undefined, loggedInUser: undefined });
    },

    logOut: async () => {
      try {
        console.log('Auth: Attempting logout');

        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Auth: Logout successful');
      } catch (e) {
        console.warn('Auth: Failed to notify server on logout:', e);
      }

      // Clear axios token
      setAxiosToken(null);

      set({ access_token: undefined, loggedInUser: undefined });
    },
  }))
);