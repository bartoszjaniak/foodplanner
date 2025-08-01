<template>
  <q-item
    class="todo-item"
    :class="itemClasses"
    clickable
    @click="handleToggle"
  >
    <q-item-section side>
      <q-checkbox
        :model-value="task.completed"
        @update:model-value="handleToggle"
        color="primary"
        class="task-checkbox"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label
        class="task-text"
        :class="textClasses"
      >
        {{ task.text }}
      </q-item-label>
      
      <q-item-label
        v-if="task.completed && task.completedAt"
        caption
        class="task-completed-time"
      >
        Wykonano: {{ formatRelativeTime(task.completedAt) }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '@/types'
import { useTodoStore } from '@/stores/todoStore'
import { formatRelativeTime } from '@/utils/dateUtils'

// Props
interface Props {
  task: Task
}

const props = defineProps<Props>()

// Store
const todoStore = useTodoStore()

// Computed
const itemClasses = computed(() => ({
  'todo-item--completed': props.task.completed,
  'todo-item--active': !props.task.completed,
  'task-transition': true
}))

const textClasses = computed(() => ({
  'task-completed': props.task.completed,
  'task-active': !props.task.completed
}))

// Methods
function handleToggle() {
  todoStore.toggleTask(props.task.id)
}
</script>

<style scoped>
.todo-item {
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: var(--color-oat);
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.todo-item:hover {
  border-color: var(--color-stone);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(45, 44, 42, 0.1);
}

.todo-item--completed {
  opacity: 0.7;
  background-color: rgba(199, 194, 188, 0.1);
}

.todo-item--active {
  background-color: var(--color-oat);
}

.task-checkbox {
  margin-right: 8px;
}

.task-text {
  font-size: 16px;
  line-height: 1.4;
  word-break: break-word;
}

.task-completed {
  color: var(--color-stone);
  text-decoration: line-through;
}

.task-active {
  color: var(--color-slate);
}

.task-completed-time {
  color: var(--color-stone);
  font-size: 12px;
  margin-top: 4px;
}

.task-transition {
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 600px) {
  .todo-item {
    margin-bottom: 4px;
    padding: 12px 16px;
  }
  
  .task-text {
    font-size: 14px;
  }
  
  .task-checkbox {
    margin-right: 12px;
  }
}

/* Touch targets for mobile */
@media (max-width: 600px) {
  .todo-item {
    min-height: 44px;
  }
  
  .task-checkbox :deep(.q-checkbox__inner) {
    width: 24px;
    height: 24px;
  }
}
</style>