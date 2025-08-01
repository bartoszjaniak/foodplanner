import type { Task } from '@/types'

// Sprawdza czy zadanie jest starsze niż godzina od momentu wykonania
export function isTaskOlderThanHour(task: Task): boolean {
  if (!task.completed || !task.completedAt) return false
  
  const now = new Date()
  const completedTime = new Date(task.completedAt)
  const hourInMs = 60 * 60 * 1000 // 1 godzina w milisekundach
  
  return (now.getTime() - completedTime.getTime()) > hourInMs
}

// Sprawdza czy zadanie zostało wykonane w ciągu ostatniej godziny
export function isTaskRecentlyCompleted(task: Task): boolean {
  if (!task.completed || !task.completedAt) return false
  
  return !isTaskOlderThanHour(task)
}

// Formatuje datę do czytelnego formatu (np. "2 godziny temu")
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) {
    return 'przed chwilą'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minuta' : diffInMinutes < 5 ? 'minuty' : 'minut'} temu`
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'godzina' : diffInHours < 5 ? 'godziny' : 'godzin'} temu`
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'dzień' : 'dni'} temu`
  } else {
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

// Formatuje datę do pełnego formatu
export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Sortuje zadania po dacie wykonania (najnowsze pierwsze)
export function sortTasksByCompletedDate(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (!a.completedAt || !b.completedAt) return 0
    return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  })
}

// Sortuje zadania - aktywne na górze, potem wykonane po dacie wykonania
export function sortTasksForDisplay(tasks: Task[]): Task[] {
  const activeTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)
  
  // Sortuj aktywne po dacie utworzenia (najnowsze pierwsze)
  const sortedActive = activeTasks.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  
  // Sortuj wykonane po dacie wykonania (najnowsze pierwsze)
  const sortedCompleted = sortTasksByCompletedDate(completedTasks)
  
  return [...sortedActive, ...sortedCompleted]
}

// Generuje UUID dla nowych zadań
export function generateTaskId(): string {
  return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}