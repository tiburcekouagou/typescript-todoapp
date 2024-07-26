<template>
  <div>
    <TodoHeader @add-todo="addTodo" />

    <TodoMain :taches="filteredTodos" @delete-todo="deleteTodo" @update-todo="updateTodo" @edit-todo="editTodo"
      @toggle-all-input="toggleAllInput" />

    <TodoFooter :todos="todos" @delete-completed="deleteCompleted" />


  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { nanoid } from 'nanoid'
import { useStorage } from '@vueuse/core'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTodos } from '@/composables/todos'

const { createTodo, changeTodo, getTodo, getTodos, removeTodo, firebaseTodos } = useTodos()


const todos = computed(() => firebaseTodos.value);
const route = useRoute()



onMounted(async () => {
  await getTodos()
})



const filters = computed(() => {
  return {
    all: todos,
    waiting: todos.value.filter((todo) => !todo.complete),
    completed: todos.value.filter((todo) => todo.complete)
  }
})

const waitingTodos = computed<Todo[]>(() => filters.value.waiting)
const completedTodos = computed<Todo[]>(() => filters.value.completed)

const filteredTodos = computed(() => {
  switch (route.name) {
    case 'waiting':
      return waitingTodos.value
    case 'completed':
      return completedTodos.value
    default:
      return todos.value
  }
})

async function addTodo(value: string) {
  if (value.trim().length === 0) {
    // si la tâche est vide,
    return // on sort de la fonction sans rien faire
  }

  await createTodo(value);
}

async function deleteTodo(todo: Todo) {
  await removeTodo(todo)
}

async function updateTodo(todo: Todo, completedValue: boolean) {
  changeTodo(todo, { ...todo, complete: completedValue });
}

async function editTodo(todo: Todo, titleValue: string) {
  changeTodo(todo, { ...todo, title: titleValue });
}

function deleteCompleted() {
  const todosToDelete = todos.value.filter((todo) => todo.complete)

  todosToDelete.forEach(async (todo) => {
    await removeTodo(todo);
  })
}

function toggleAllInput(value: boolean) {
  todos.value.forEach((todo) => {
    todo.complete = value
  })
}
</script>

<style scoped></style>
