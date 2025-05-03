<script lang="ts" setup>
import { useToDoStore } from '@/stores/to-do.store'
import { getButtonClasses, getBigButtonDivClasses } from '@/composables/styles'

/**
 * Pinia garantiza que el store es único.
 */
const toDoStore = useToDoStore()

const getRadioButtonClasses = () => {
  return 'flex items-center space-x-2 text-gray-700'
}
</script>

<template>
  <section class="bg-white rounded-lg space-y-6">
    <fieldset class="flex flex-wrap justify-center gap-4" aria-label="Filter todos by status">
      <label :class="getRadioButtonClasses()">
        <input
          type="radio"
          name="filter"
          :checked="toDoStore.selectedFilter === 'Pending'"
          @change="toDoStore.setFilter('Pending')"
          aria-label="Show only pending tasks"
        />
        <span>⏳ Pending</span>
      </label>

      <label :class="getRadioButtonClasses()">
        <input
          type="radio"
          name="filter"
          :checked="toDoStore.selectedFilter === 'Completed'"
          @change="toDoStore.setFilter('Completed')"
          aria-label="Show only completed tasks"
        />
        <span>✅ Completed</span>
      </label>

      <label :class="getRadioButtonClasses()">
        <input
          type="radio"
          name="filter"
          :checked="toDoStore.selectedFilter === 'All'"
          @change="toDoStore.setFilter('All')"
          aria-label="Show all tasks"
        />
        <span>📋 All</span>
      </label>
    </fieldset>

    <div :class="getBigButtonDivClasses()" aria-label="Sort to dos">
      <button
        type="button"
        :class="getButtonClasses('emerald-500', 'sky-500')"
        aria-label="Sort by completed first"
        @click="toDoStore.sortToDosByCompletedFirst()"
      >
        ✅ Completed first
      </button>

      <button
        type="button"
        :class="getButtonClasses('yellow-500', 'orange-500')"
        aria-label="Sort by pending first"
        @click="toDoStore.sortToDosByPendingFirst()"
      >
        ⏳ Pending first
      </button>

      <button
        type="button"
        :class="getButtonClasses('purple-500', 'pink-500')"
        aria-label="Sort by newest first"
        @click="toDoStore.sortToDosByTimestampDesc()"
      >
        🆕 Newest first
      </button>

      <button
        type="button"
        :class="getButtonClasses('gray-500', 'gray-700')"
        aria-label="Sort by oldest first"
        @click="toDoStore.sortToDosByTimestampAsc()"
      >
        📜 Oldest first
      </button>
    </div>
  </section>
</template>
