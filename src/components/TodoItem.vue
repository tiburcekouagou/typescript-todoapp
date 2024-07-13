<template>
  <li :class="{ completed: todo.complete }">
    <div class="view">
      <input type="checkbox" class="toggle" />
      <label for="">{{ todo.title }}</label>
      <button class="destroy" @click="emit('delete-todo', todo)"></button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void
}>()
</script>

<style scoped></style>
