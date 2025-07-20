export interface User {
  id: number
  fullName: string
  username: string
  status: string
  roles: Role[]
}

export interface Role {
  id: number
  code: string
  name: string
  description: string | null
}

export interface Task {
  id: number
  created_time: string
  updated_time: string
  deleted_time: string | null
  created_by: number
  updated_by: number
  deleted_by: number | null
  title: string
  description: string
  start_date: string
  due_date: string
  completed_date: string | null
  priority: "low" | "medium" | "high"
  status: "to_do" | "in_progress" | "completed"
  assignee_id: number
  parent_id: number | null
  project_id: number | null
}

export interface LoginResponse {
  loggedInUser: User
  access_token: string
  refresh_token: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
}