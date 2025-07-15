export const apiBaseUrl = "https://server.aptech.io"
export const apiTimeout = 5000 // 5 seconds

export const getDefaultHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNjMxNDE1LCJleHAiOjE3ODQxODkwMTV9.VqdTjHNF47fkEIVOH5ACih-BEk6a3dV9L8eX1cu4E3c`,
})

export interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate?: string
  createdAt: string
  updatedAt: string
  assigneeId?: number | string
}

export interface User {
  id: number
  username: string
  email: string
}