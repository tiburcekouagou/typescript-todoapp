<template>
  <div>
    <TodoHeader @add-todo="addTodo" />

    <TodoMain :taches="todos" />

    <TodoFooter :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { ref } from 'vue'
import { nanoid } from 'nanoid'

const todos = ref<Todo[]>([])
function addTodo(value: string) {
  todos.value.push({
    id: nanoid(),
    title: value,
    complete: false
  })
}
</script>

<style scoped></style>
