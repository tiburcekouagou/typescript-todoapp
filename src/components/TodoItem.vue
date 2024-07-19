<template>
  <li :class="{ completed: todo.complete, editing: editing }">
    <div class="view">
      <input type="checkbox" class="toggle" v-model="isTodoCompleted" />
      <label @dblclick="startEditing">{{ todo.title }}</label>
      <button class="destroy" @click="emit('delete-todo', todo)"></button>
    </div>
    <div class="input-container">
      <input
        ref="editRef"
        id="edit-to-input"
        class="edit"
        type="text"
        v-model="editInput"
        @keyup.enter="finishEdit"
        @blur="cancelEdit"
      />
      <label class="visually-hidden" for="edit-to-input">Editer</label>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import { computed, nextTick, ref } from 'vue'
const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void
  (e: 'update-todo', todo: Todo, completeVal: boolean): void
  (e: 'edit-todo', todo: Todo, value: string): void
}>()

const isTodoCompleted = computed<boolean>({
  get: () => props.todo.complete,
  set: (value: boolean) => {
    emit('update-todo', props.todo, value)
  }
})

const editRef = ref<HTMLInputElement>() // élement du dom
const editing = ref<boolean>(false)
const editText = ref<string>('')
const editInput = computed({
  get: () => props.todo.title,
  set: (val) => {
    editText.value = val
  }
})

function startEditing() {
  editing.value = true

  // faire un focus sur le champs de saisie
  nextTick(() => {
    editRef.value!.focus()
  })
}

function finishEdit() {
  editing.value = false

  editTodo()
}

function editTodo() {
  emit('edit-todo', props.todo, editText.value) // emettre un event

  editText.value = ''
}

function cancelEdit() {
  editing.value = false
}
</script>

<style scoped>
.visually-hidden {
  bottom: 0;
  clip-path: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}
</style>
