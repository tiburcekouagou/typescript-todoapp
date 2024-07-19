<template>
  <div>
    <TodoHeader @add-todo="addTodo" />

    <TodoMain :taches="filteredTodos" @delete-todo="deleteTodo" @update-todo="updateTodo" @edit-todo="editTodo" />

    <TodoFooter :todos="todos" />

  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { nanoid } from 'nanoid'
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const todos = useStorage<Todo[]>('todoapp-todos', [])
const route = useRoute()

const filters = computed(() => {
  return {
    all: todos,
    waiting: todos.value.filter((todo) => !todo.complete),
    completed: todos.value.filter((todo) => todo.complete),
  };
})

const waitingTodos = computed<Todo[]>(() => filters.value.waiting)
const completedTodos = computed<Todo[]>(() => filters.value.completed)



const filteredTodos = computed(() => {
  switch (route.name) {
    case 'waiting':
      return waitingTodos.value;
    case 'completed':
      return completedTodos.value;
    default:
      return todos.value
  }
})


function addTodo(value: string): void {
  if (value.trim().length === 0) {
    // si la tâche est vide,
    return // on sort de la fonction sans rien faire
  }

  todos.value.push({
    id: nanoid(),
    title: value,
    complete: false
  })
}

function deleteTodo(todo: Todo): void {
  todos.value = todos.value.filter((t) => t !== todo)
}

function updateTodo(todo: Todo, completedValue: boolean) {
  todo.complete = completedValue
}

function editTodo(todo: Todo, value: string) {
  todo.title = value
}
</script>

<style scoped></style>
