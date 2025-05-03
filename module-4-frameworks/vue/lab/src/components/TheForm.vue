<script setup lang="ts">
import { ref } from 'vue'
import { useToDoStore } from '../stores/to-do.store'

const toDoStore = useToDoStore()
const todoInput = ref<string>('')

const addTodo = () => {
  if (todoInput.value === '') return
  toDoStore.addTodo(todoInput.value)
  todoInput.value = ''
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <label for="todo" class="mb-2 text-sm font-medium text-gray-900 sr-only">Add a new To Do</label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 3l5 5-11 11H5v-5L16 3z"
          />
        </svg>
      </div>
      <input
        type="text"
        id="todo"
        v-model="todoInput"
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Add a new To Do..."
        aria-label="Add new to do input field"
        required
      />
      <button
        type="submit"
        class="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-r from-sky-400 to-emerald-600 hover:from-sky-500 hover:to-emerald-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        aria-label="Add new to do button"
      >
        ➕
      </button>
    </div>
  </form>
</template>
