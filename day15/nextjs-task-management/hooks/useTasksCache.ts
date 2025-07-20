import { useState, useEffect, useCallback } from 'react'
import type { Task } from '@/lib/types'
import api from '@/lib/axios'

interface TasksCache {
  data: Task[]
  lastFetch: number
  loading: boolean
}

const CACHE_DURATION = 30000 // 30 seconds cache
const tasksCache: { [key: string]: TasksCache } = {}

export const useTasksCache = (endpoint: string, userId?: number) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cacheKey = `${endpoint}-${userId || 'all'}`

  const fetchTasks = useCallback(async (forceRefresh = false) => {
    // Don't fetch if endpoint is empty
    if (!endpoint) {
      setLoading(false)
      return
    }

    const now = Date.now()
    const cached = tasksCache[cacheKey]

    // Use cache if available and not expired
    if (!forceRefresh && cached && (now - cached.lastFetch) < CACHE_DURATION) {
      console.log('Using cached tasks for:', cacheKey)
      const cachedData = Array.isArray(cached.data) ? cached.data : []
      setTasks(cachedData)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      console.log('Fetching fresh tasks for:', cacheKey)
      
      const response = await api.get(endpoint)
      const data = response.data

      // Ensure data is an array
      const tasksArray = Array.isArray(data) ? data : []

      // Update cache
      tasksCache[cacheKey] = {
        data: tasksArray,
        lastFetch: now,
        loading: false
      }

      setTasks(tasksArray)
    } catch (err) {
      console.error('Error fetching tasks:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
      
      // Use stale cache if available
      if (cached) {
        console.log('Using stale cache due to error')
        const staleData = Array.isArray(cached.data) ? cached.data : []
        setTasks(staleData)
      }
    } finally {
      setLoading(false)
    }
  }, [endpoint, cacheKey])

  const refreshTasks = useCallback(() => {
    return fetchTasks(true)
  }, [fetchTasks])

  const updateTaskInCache = useCallback((taskId: number, updates: Partial<Task>) => {
    const cached = tasksCache[cacheKey]
    if (cached) {
      const updatedData = cached.data.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
      
      tasksCache[cacheKey] = {
        ...cached,
        data: updatedData
      }
      
      setTasks(updatedData)
    }
  }, [cacheKey])

  const addTaskToCache = useCallback((newTask: Task) => {
    const cached = tasksCache[cacheKey]
    if (cached) {
      const updatedData = [newTask, ...cached.data]
      
      tasksCache[cacheKey] = {
        ...cached,
        data: updatedData
      }
      
      setTasks(updatedData)
    }
  }, [cacheKey])

  const removeTaskFromCache = useCallback((taskId: number) => {
    const cached = tasksCache[cacheKey]
    if (cached) {
      const updatedData = cached.data.filter(task => task.id !== taskId)
      
      tasksCache[cacheKey] = {
        ...cached,
        data: updatedData
      }
      
      setTasks(updatedData)
    }
  }, [cacheKey])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return {
    tasks,
    loading,
    error,
    refreshTasks,
    updateTaskInCache,
    addTaskToCache,
    removeTaskFromCache
  }
}

// Clear all cache (useful for logout)
export const clearTasksCache = () => {
  Object.keys(tasksCache).forEach(key => {
    delete tasksCache[key]
  })
}
