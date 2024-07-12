<template>
  <header class="header">
    <RouterLink to="/">
      <h1>todos</h1>
    </RouterLink>

    <input
      class="new-todo"
      type="text"
      placeholder="Entrez une tâche"
      autofocus
      autocomplete="off"
    />
  </header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
