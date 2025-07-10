export const apiBaseUrl = 'https://server.aptech.io';
export const apiTimeout = 5000; // 5 seconds
export const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${
    localStorage.getItem('token') ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyMTYxNDMzLCJleHAiOjE3ODM3MTkwMzN9.01KYfiITqJQc8Da9i8dCgeSCuUSGTrlMr_NnVe5-HFY'
  }`,
};