<script lang="ts" setup>
import { useToDoStore } from '@/stores/to-do.store'

/**
 * Pinia garantiza que el store es único.
 */
const toDoStore = useToDoStore()
</script>

<template>
  <div v-if="toDoStore.totalToDos > 0">
    <p>
      Total: {{ toDoStore.totalToDos }} | Completados: {{ toDoStore.totalToDosCompleted }} |
      Pending:
      {{ toDoStore.totalToDosPending }}
    </p>
  </div>
  <div v-else>No To Do's to be shown</div>
</template>
