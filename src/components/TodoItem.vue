<template>
  <li :class="{ completed: todo.complete }">
    <div class="view">
      <input type="checkbox" class="toggle" />
      <label for="">{{ todo.title }}</label>
      <button class="destroy"></button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
defineProps<{
  todo: Todo
}>()
</script>

<style scoped></style>
