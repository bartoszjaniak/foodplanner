<template>
  <q-layout view="hHh lpR fFf" class="todo-app">
    <q-header elevated class="app-header">
      <q-toolbar class="toolbar">
        <q-toolbar-title class="app-title">
          <q-icon name="checklist" size="28px" class="title-icon" />
          TODO List
        </q-toolbar-title>

        <div class="header-stats">
          <q-chip
            :label="`${activeTasks.length} aktywnych`"
            color="primary"
            text-color="white"
            size="sm"
            class="stats-chip"
          />
          <q-chip
            :label="`${completedTasks.length} wykonanych`"
            color="secondary"
            text-color="white"
            size="sm"
            class="stats-chip"
          />
        </div>
      </q-toolbar>

      <!-- Input section -->
      <div class="input-section">
        <TodoInput />
      </div>

      <!-- Navigation tabs -->
      <q-tabs
        v-model="activeTab"
        class="navigation-tabs"
        active-color="primary"
        indicator-color="primary"
        align="center"
        narrow-indicator
      >
        <q-tab
          name="active"
          :label="`Aktywne (${visibleActiveTasks.length})`"
          icon="list"
          class="nav-tab"
        />
        <q-tab
          name="completed"
          :label="`Wykonane (${completedTasks.length})`"
          icon="task_alt"
          class="nav-tab"
        />
      </q-tabs>
    </q-header>

    <q-page-container class="page-container">
      <q-page class="main-page">
        <div class="content-container">
          <!-- Active tasks view -->
          <div v-show="activeTab === 'active'" class="tab-content">
            <TodoList />
          </div>

          <!-- Completed tasks view -->
          <div v-show="activeTab === 'completed'" class="tab-content">
            <CompletedTasks />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
import CompletedTasks from './CompletedTasks.vue'

// Store
const todoStore = useTodoStore()

// Local state
const activeTab = ref<'active' | 'completed'>('active')

// Computed
const activeTasks = computed(() => todoStore.activeTasks)
const completedTasks = computed(() => todoStore.completedTasks)
const visibleActiveTasks = computed(() => todoStore.visibleActiveTasks)
</script>

<style scoped>
.todo-app {
  background-color: var(--color-oat);
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, var(--color-moss) 0%, var(--color-clay) 100%);
  color: white;
}

.toolbar {
  padding: 0 16px;
  min-height: 64px;
}

.app-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 600;
}

.title-icon {
  color: white;
}

.header-stats {
  display: flex;
  gap: 8px;
  align-items: center;
}

.stats-chip {
  font-size: 11px;
  font-weight: 500;
}

.input-section {
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.navigation-tabs {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-tab {
  font-weight: 500;
  text-transform: none;
}

.page-container {
  background-color: var(--color-oat);
}

.main-page {
  padding: 0;
  background-color: var(--color-oat);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 0;
}

.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .toolbar {
    padding: 0 12px;
    min-height: 56px;
  }
  
  .app-title {
    font-size: 20px;
  }
  
  .header-stats {
    gap: 4px;
  }
  
  .stats-chip {
    font-size: 10px;
    padding: 2px 8px;
  }
  
  .input-section {
    padding: 12px;
  }
  
  .content-container {
    padding: 16px 0;
  }
  
  .nav-tab {
    font-size: 12px;
    min-width: auto;
    padding: 0 12px;
  }
}

@media (max-width: 480px) {
  .header-stats {
    flex-direction: column;
    gap: 2px;
  }
  
  .app-title {
    font-size: 18px;
  }
  
  .title-icon {
    display: none;
  }
}

@media (min-width: 1024px) {
  .content-container {
    padding: 32px 24px;
  }
  
  .toolbar {
    padding: 0 32px;
  }
  
  .input-section {
    padding: 24px 32px;
  }
}

/* Dark mode support (future enhancement) */
@media (prefers-color-scheme: dark) {
  .todo-app {
    background-color: var(--color-slate);
  }
  
  .page-container,
  .main-page {
    background-color: var(--color-slate);
  }
}
</style>