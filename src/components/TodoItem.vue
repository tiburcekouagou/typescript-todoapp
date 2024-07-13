<template>
  <li :class="{ completed: todo.complete }">
    <div class="view">
      <input type="checkbox" class="toggle" v-model="isTodoCompleted" />
      <label for="">{{ todo.title }}</label>
      <button class="destroy" @click="emit('delete-todo', todo)"></button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import { ref, watch } from 'vue';
const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void
  (e: 'update-todo', todo: Todo, completeVal: boolean): void
}>()

const isTodoCompleted = ref<boolean>(props.todo.complete)

watch(() => isTodoCompleted.value, (newVal) => {
  emit('update-todo', props.todo, newVal)
})

// const isTodoCompleted = computed({
//   get: () => props.todo.complete,
//   set: (val: boolean) => emit('update-todo', props.todo, val)
// });
</script>

<style scoped></style>
