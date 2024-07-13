<template>
  <main class="main">
    <ul class="todo-list">
      <TodoItem
        v-for="todo in taches"
        :key="todo.id"
        :todo="todo"
        @delete-todo="emit('delete-todo', todo)"
      />
    </ul>
  </main>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import TodoItem from '@/components/TodoItem.vue'
// const props = defineProps(['taches']);

const props = defineProps<{
  taches: Todo[]
}>()

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void
}>()
</script>

<style scoped></style>
