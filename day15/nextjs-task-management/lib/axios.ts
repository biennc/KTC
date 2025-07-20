import axios from "axios"

const api = axios.create({
  baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  timeout: 10000,
})

// Global variable to store current token
let currentToken: string | null = null;

// Function to set token (called from auth store)
export const setAxiosToken = (token: string | null) => {
  currentToken = token;
};

// Function to get current token
const getAuthToken = () => {
  return currentToken;
};

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // For now, just redirect to login on 401
        // Token refresh will be handled by the auth store
        console.log('401 error - redirecting to login');
        window.location.href = "/login";
      } catch (refreshError) {
        // Refresh failed, redirect to login
        console.error('Token refresh failed:', refreshError);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error)
  },
)

export default api