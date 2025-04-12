<script lang="ts" setup>
import { useToDoStore } from '@/stores/to-do.store'

/**
 * Pinia garantiza que el store es único.
 */
const toDoStore = useToDoStore()
</script>

<template>
  <div class="flex justify-between">
    <div class="space-x-2">
      <input
        type="radio"
        id="toggle"
        :checked="toDoStore.selectedFilter === 'Pending'"
        @change="toDoStore.setFilter('Pending')"
      />
      <label for="toggle">Show only pending ToDos</label>
    </div>
    <div class="space-x-2">
      <input
        type="radio"
        id="toggle2"
        :checked="toDoStore.selectedFilter === 'Completed'"
        @change="toDoStore.setFilter('Completed')"
      />
      <label for="toggle2">Show only completed ToDos</label>
    </div>
    <div class="space-x-2">
      <input
        type="radio"
        id="toggle3"
        :checked="toDoStore.selectedFilter === 'All'"
        @change="toDoStore.setFilter('All')"
      />
      <label for="toggle3">Show all ToDos</label>
    </div>
  </div>
</template>

<style></style>
