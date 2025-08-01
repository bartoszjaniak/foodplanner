<template>
  <div class="todo-list-container">
    <q-list class="todo-list" separator>
      <div v-if="visibleTasks.length === 0" class="empty-state">
        <q-icon name="task_alt" size="48px" color="stone" />
        <p class="empty-message">Brak zadań do wyświetlenia</p>
        <p class="empty-hint">Dodaj nowe zadanie używając pola powyżej</p>
      </div>

      <TodoItem
        v-for="task in visibleTasks"
        :key="task.id"
        :task="task"
        class="todo-list-item"
      />
    </q-list>

    <div v-if="hasRecentlyCompleted" class="recently-completed-info">
      <q-separator class="separator" />
      <p class="info-text">
        <q-icon name="info" size="16px" />
        Wykonane zadania znikną z tej listy po godzinie
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import TodoItem from './TodoItem.vue'

// Store
const todoStore = useTodoStore()

// Computed
const visibleTasks = computed(() => todoStore.visibleActiveTasks)

const hasRecentlyCompleted = computed(() => 
  todoStore.recentlyCompleted.length > 0
)
</script>

<style scoped>
.todo-list-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.todo-list {
  background-color: transparent;
}

.todo-list-item {
  margin-bottom: 8px;
}

.empty-state {
  text-align: center;
  padding: 48px 16px;
  color: var(--color-stone);
}

.empty-message {
  font-size: 18px;
  font-weight: 500;
  margin: 16px 0 8px 0;
  color: var(--color-slate);
}

.empty-hint {
  font-size: 14px;
  margin: 0;
  color: var(--color-stone);
}

.recently-completed-info {
  margin-top: 24px;
  padding-top: 16px;
}

.separator {
  background-color: var(--color-stone);
  opacity: 0.3;
}

.info-text {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-stone);
  margin: 8px 0 0 0;
  text-align: center;
  justify-content: center;
}

/* Responsive */
@media (max-width: 600px) {
  .todo-list-container {
    padding: 8px;
  }
  
  .empty-state {
    padding: 32px 16px;
  }
  
  .empty-message {
    font-size: 16px;
  }
  
  .empty-hint {
    font-size: 13px;
  }
}

@media (min-width: 1024px) {
  .todo-list-container {
    padding: 24px;
  }
}

/* Animation for list items */
.todo-list-item {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>