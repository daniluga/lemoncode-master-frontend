<script lang="ts" setup>
import { useToDoStore } from '@/stores/to-do.store'

/**
 * Pinia garantiza que el store es único.
 */
const toDoStore = useToDoStore()
</script>

<template>
  <div class="flex justify-center items-center text-center my-6" aria-label="To do summary section">
    <div v-if="toDoStore.totalToDos > 0" class="bg-white p-4 rounded-lg">
      <p class="text-lg text-gray-800 font-medium">
        📝 Total:
        <span class="font-bold" aria-label="Total to dos counter">{{ toDoStore.totalToDos }}</span>
        &nbsp;|&nbsp; ✅ Completed:
        <span class="text-green-600 font-bold" aria-label="Completed to dos counter">{{
          toDoStore.totalToDosCompleted
        }}</span>
        &nbsp;|&nbsp; ⏳ Pending:
        <span class="text-yellow-500 font-bold" aria-label="Pending to dos counter">{{
          toDoStore.totalToDosPending
        }}</span>
      </p>
    </div>
    <div v-else class="text-gray-500 italic" ariia-label="No to dos available">
      🚫 No tasks to show. Time to relax!
    </div>
  </div>
</template>
