import type { Task } from '@/types'

const STORAGE_KEY = 'vue-todo-tasks'

// Sprawdza czy localStorage jest dostępny
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

// Waliduje czy dane z localStorage mają poprawną strukturę
function validateTaskData(data: any): data is Task[] {
  if (!Array.isArray(data)) return false
  
  return data.every(item => 
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.text === 'string' &&
    typeof item.completed === 'boolean' &&
    (item.createdAt instanceof Date || typeof item.createdAt === 'string') &&
    (item.completedAt === null || item.completedAt instanceof Date || typeof item.completedAt === 'string')
  )
}

// Konwertuje stringi dat z localStorage na obiekty Date
function parseDates(tasks: any[]): Task[] {
  return tasks.map(task => ({
    ...task,
    createdAt: new Date(task.createdAt),
    completedAt: task.completedAt ? new Date(task.completedAt) : null
  }))
}

// Zapisuje zadania do localStorage
export function saveTasksToStorage(tasks: Task[]): void {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available')
    return
  }

  try {
    const serializedTasks = JSON.stringify(tasks)
    localStorage.setItem(STORAGE_KEY, serializedTasks)
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error)
  }
}

// Ładuje zadania z localStorage
export function loadTasksFromStorage(): Task[] {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available')
    return []
  }

  try {
    const serializedTasks = localStorage.getItem(STORAGE_KEY)
    if (!serializedTasks) return []

    const parsedTasks = JSON.parse(serializedTasks)
    
    if (!validateTaskData(parsedTasks)) {
      console.warn('Invalid task data in localStorage, returning empty array')
      return []
    }

    return parseDates(parsedTasks)
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error)
    return []
  }
}

// Czyści dane z localStorage
export function clearStorage(): void {
  if (!isLocalStorageAvailable()) return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear localStorage:', error)
  }
}