// Task model interface
export interface Task {
  id: string;           // UUID zadania
  text: string;         // Treść zadania
  completed: boolean;   // Status wykonania
  createdAt: Date;      // Data utworzenia
  completedAt: Date | null; // Data wykonania (null jeśli niewykonane)
}

// Store state interface
export interface TodoState {
  tasks: Task[];        // Wszystkie zadania
  filter: 'active' | 'completed'; // Aktualny filtr widoku
}

// Store getters interface
export interface TodoGetters {
  activeTasks: Task[];     // Zadania niewykonane
  completedTasks: Task[];  // Wszystkie wykonane zadania
  visibleActiveTasks: Task[]; // Aktywne + wykonane < 1h
  recentlyCompleted: Task[]; // Wykonane < 1h
}

// Store actions interface
export interface TodoActions {
  addTask(text: string): void;
  toggleTask(id: string): void;
  loadFromStorage(): void;
  saveToStorage(): void;
  cleanupOldTasks(): void;
}

// Utility type for creating new tasks
export interface CreateTaskData {
  text: string;
}