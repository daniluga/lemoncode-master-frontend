<script setup lang="ts">
import { useToDoStore } from '../stores/to-do.store'

/**
 * Pinia garantiza que el store es único.
 */
const toDoStore = useToDoStore()
</script>

<template>
  <div class="flex justify-between">
    <button
      type="button"
      class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      aria-label="remove-all-completed-to-dos"
      @click="toDoStore.removeAllCompletedToDos()"
    >
      Remove all completed ToDos
    </button>
    <button
      type="button"
      class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      aria-label="remove-all-completed-to-dos"
      @click="toDoStore.setAllToDosAsDone()"
    >
      Set all as done
    </button>
    <button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
      aria-label="remove-all-completed-to-dos"
      @click="toDoStore.setAllToDosAsPending()"
    >
      Set all as pending
    </button>
  </div>
  <div class="flex justify-between">
    <button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
      aria-label="sort-by-completed-first"
      @click="toDoStore.sortToDosByCompletedFirst()"
    >
      Completed first
    </button>
    <button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
      aria-label="sort-by-pending-first"
      @click="toDoStore.sortToDosByPendingFirst()"
    >
      Pending first
    </button>
    <button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
      aria-label="sort-by-timestamp-asc"
      @click="toDoStore.sortToDosByTimestampDesc()"
    >
      Newer first
    </button>
    <button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
      aria-label="sort-by-timestamp-desc"
      @click="toDoStore.sortToDosByTimestampAsc()"
    >
      Older first
    </button>
  </div>
</template>
