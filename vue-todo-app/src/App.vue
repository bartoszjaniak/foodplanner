<script setup lang="ts">
import TodoApp from '@/components/TodoApp.vue'
</script>

<template>
  <TodoApp />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: var(--color-oat);
  color: var(--color-slate);
}

#app {
  min-height: 100vh;
}
</style>
