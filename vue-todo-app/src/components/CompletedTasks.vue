<template>
  <div class="completed-tasks-container">
    <div class="completed-header">
      <h3 class="completed-title">
        <q-icon name="task_alt" size="24px" />
        Wykonane zadania
      </h3>
      <q-chip
        v-if="completedTasks.length > 0"
        :label="completedTasks.length"
        color="primary"
        text-color="white"
        size="sm"
      />
    </div>

    <q-list class="completed-list" separator>
      <div v-if="completedTasks.length === 0" class="empty-state">
        <q-icon name="check_circle_outline" size="48px" color="stone" />
        <p class="empty-message">Brak wykonanych zadań</p>
        <p class="empty-hint">Wykonane zadania będą tutaj wyświetlane</p>
      </div>

      <q-item
        v-for="task in sortedCompletedTasks"
        :key="task.id"
        class="completed-item"
      >
        <q-item-section side>
          <q-icon name="check_circle" color="primary" size="20px" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="completed-text">
            {{ task.text }}
          </q-item-label>
          
          <q-item-label caption class="completed-time">
            <q-icon name="schedule" size="14px" />
            Wykonano: {{ formatFullDate(task.completedAt!) }}
          </q-item-label>
          
          <q-item-label caption class="completed-relative-time">
            {{ formatRelativeTime(task.completedAt!) }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            icon="undo"
            flat
            round
            dense
            size="sm"
            color="clay"
            @click="handleUndoTask(task.id)"
            class="undo-btn"
          >
            <q-tooltip>Przywróć zadanie</q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="completedTasks.length > 0" class="completed-stats">
      <q-separator class="separator" />
      <div class="stats-content">
        <p class="stats-text">
          <q-icon name="analytics" size="16px" />
          Łącznie wykonano {{ completedTasks.length }} 
          {{ completedTasks.length === 1 ? 'zadanie' : completedTasks.length < 5 ? 'zadania' : 'zadań' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { formatRelativeTime, formatFullDate, sortTasksByCompletedDate } from '@/utils/dateUtils'

// Store
const todoStore = useTodoStore()

// Computed
const completedTasks = computed(() => todoStore.completedTasks)

const sortedCompletedTasks = computed(() => 
  sortTasksByCompletedDate(completedTasks.value)
)

// Methods
function handleUndoTask(taskId: string) {
  todoStore.toggleTask(taskId)
}
</script>

<style scoped>
.completed-tasks-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.completed-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 0 8px;
}

.completed-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-slate);
}

.completed-list {
  background-color: transparent;
}

.completed-item {
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: rgba(199, 194, 188, 0.05);
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.completed-item:hover {
  border-color: var(--color-stone);
  background-color: rgba(199, 194, 188, 0.1);
}

.completed-text {
  color: var(--color-stone);
  text-decoration: line-through;
  font-size: 16px;
  line-height: 1.4;
  word-break: break-word;
}

.completed-time {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-stone);
  font-size: 12px;
  margin-top: 4px;
}

.completed-relative-time {
  color: var(--color-clay);
  font-size: 11px;
  font-weight: 500;
  margin-top: 2px;
}

.undo-btn {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.completed-item:hover .undo-btn {
  opacity: 1;
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

.completed-stats {
  margin-top: 24px;
  padding-top: 16px;
}

.separator {
  background-color: var(--color-stone);
  opacity: 0.3;
}

.stats-content {
  padding: 8px 0;
}

.stats-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-stone);
  margin: 0;
  text-align: center;
}

/* Responsive */
@media (max-width: 600px) {
  .completed-tasks-container {
    padding: 8px;
  }
  
  .completed-header {
    margin-bottom: 16px;
  }
  
  .completed-title {
    font-size: 18px;
  }
  
  .completed-text {
    font-size: 14px;
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
  
  .undo-btn {
    opacity: 1; /* Always visible on mobile */
  }
}

@media (min-width: 1024px) {
  .completed-tasks-container {
    padding: 24px;
  }
}

/* Animation for list items */
.completed-item {
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