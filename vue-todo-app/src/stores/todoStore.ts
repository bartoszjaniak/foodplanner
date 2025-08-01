import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task } from '@/types'
import { loadTasksFromStorage, saveTasksToStorage } from '@/utils/localStorage'
import {
  isTaskOlderThanHour,
  isTaskRecentlyCompleted,
  sortTasksForDisplay,
  sortTasksByCompletedDate,
  generateTaskId,
} from '@/utils/dateUtils'

export const useTodoStore = defineStore('todo', () => {
  // State
  const tasks = ref<Task[]>([])
  const filter = ref<'active' | 'completed'>('active')

  // Getters
  const activeTasks = computed(() => tasks.value.filter((task) => !task.completed))

  const completedTasks = computed(() => tasks.value.filter((task) => task.completed))

  const visibleActiveTasks = computed(() => {
    const active = activeTasks.value
    const recentlyCompleted = tasks.value.filter(
      (task) => task.completed && isTaskRecentlyCompleted(task),
    )
    return sortTasksForDisplay([...active, ...recentlyCompleted])
  })

  const recentlyCompleted = computed(() =>
    tasks.value.filter((task) => task.completed && isTaskRecentlyCompleted(task)),
  )

  // Actions
  function addTask(text: string) {
    if (!text.trim()) return

    const newTask: Task = {
      id: generateTaskId(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      completedAt: null,
    }

    tasks.value.unshift(newTask) // Dodaj na początek listy
    saveToStorage()
  }

  function toggleTask(id: string) {
    const task = tasks.value.find((t) => t.id === id)
    if (!task) return

    task.completed = !task.completed
    task.completedAt = task.completed ? new Date() : null

    saveToStorage()
  }

  function loadFromStorage() {
    const loadedTasks = loadTasksFromStorage()
    tasks.value = loadedTasks
    cleanupOldTasks()
  }

  function saveToStorage() {
    saveTasksToStorage(tasks.value)
  }

  function cleanupOldTasks() {
    // Usuń zadania wykonane starsze niż 7 dni (opcjonalne - dla oszczędności miejsca)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    tasks.value = tasks.value.filter((task) => {
      if (!task.completed || !task.completedAt) return true
      return new Date(task.completedAt) > sevenDaysAgo
    })

    saveToStorage()
  }

  // Inicjalizacja - ładowanie danych przy tworzeniu store
  loadFromStorage()

  return {
    // State
    tasks,
    filter,
    // Getters
    activeTasks,
    completedTasks,
    visibleActiveTasks,
    recentlyCompleted,
    // Actions
    addTask,
    toggleTask,
    loadFromStorage,
    saveToStorage,
    cleanupOldTasks,
  }
})
