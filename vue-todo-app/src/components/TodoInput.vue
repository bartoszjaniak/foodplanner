<template>
  <div class="todo-input-container">
    <q-input
      v-model="inputText"
      placeholder="Dodaj nowe zadanie..."
      outlined
      dense
      class="todo-input"
      @keyup.enter="handleAddTask"
      :disable="isLoading"
    >
      <template v-slot:append>
        <q-btn
          icon="add"
          color="primary"
          flat
          round
          dense
          @click="handleAddTask"
          :disable="!canAddTask"
          :loading="isLoading"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

// Store
const todoStore = useTodoStore()

// Local state
const inputText = ref('')
const isLoading = ref(false)

// Computed
const canAddTask = computed(() => {
  return inputText.value.trim().length > 0 && !isLoading.value
})

// Methods
async function handleAddTask() {
  if (!canAddTask.value) return

  isLoading.value = true
  
  try {
    todoStore.addTask(inputText.value)
    inputText.value = '' // Wyczyść input po dodaniu
  } catch (error) {
    console.error('Error adding task:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.todo-input-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.todo-input {
  width: 100%;
}

.todo-input :deep(.q-field__control) {
  background-color: var(--color-oat);
  border-color: var(--color-stone);
}

.todo-input :deep(.q-field__control):hover {
  border-color: var(--color-moss);
}

.todo-input :deep(.q-field__control):focus-within {
  border-color: var(--color-moss);
  box-shadow: 0 0 0 1px var(--color-moss);
}

.todo-input :deep(.q-field__native) {
  color: var(--color-slate);
}

.todo-input :deep(.q-field__native)::placeholder {
  color: var(--color-stone);
}

@media (max-width: 600px) {
  .todo-input-container {
    padding: 0 16px;
  }
}
</style>