export const apiBaseUrl = "https://server.aptech.io"
export const apiTimeout = 5000 // 5 seconds

export const getDefaultHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer `,
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