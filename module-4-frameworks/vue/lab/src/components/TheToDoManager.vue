<script setup lang="ts">
import { useToDoStore } from '../stores/to-do.store'
import { getBigButtonDivClasses, getButtonClasses } from '@/composables/styles'

/**
 * Pinia garantiza que el store es único.
 */
const toDoStore = useToDoStore()
</script>

<template>
  <div :class="getBigButtonDivClasses()" aria-label="Manage all to dos">
    <button
      type="button"
      :class="getButtonClasses('green-500', 'green-700')"
      @click="toDoStore.setAllToDosAsDone()"
      aria-label="Mark all tasks as done"
    >
      ✅ Mark all as done
    </button>

    <button
      type="button"
      :class="getButtonClasses('gray-500', 'gray-700')"
      @click="toDoStore.setAllToDosAsPending()"
      aria-label="Mark all tasks as pending"
    >
      🔁 Reset all to pending
    </button>
    <button
      type="button"
      :class="getButtonClasses('red-500', 'red-700')"
      @click="toDoStore.removeAllCompletedToDos()"
      aria-label="Remove all completed tasks"
    >
      🗑️ Remove completed
    </button>
  </div>
</template>
