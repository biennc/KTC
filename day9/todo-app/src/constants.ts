export const apiBaseUrl = 'https://server.aptech.io';
export const apiTimeout = 5000; // 5 seconds
export const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${
    localStorage.getItem('token')}`,
};