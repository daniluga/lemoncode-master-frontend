<script setup lang="ts">
import { ref } from 'vue'
import { useToDoStore } from '../stores/to-do.store'

const toDoStore = useToDoStore()

const todoInput = ref<string>('To Do') // TODO: remove test value
const addTodo = () => {
  if (todoInput.value === '') return
  toDoStore.addTodo(todoInput.value)
  // todoInput.value = '' // TODO: Uncomment this line
}

const searchInput = ref<string>('')
const onSearch = () => {
  toDoStore.searchToDos(searchInput.value)
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <label for="todo">To Do</label>
    <input
      id="todo"
      type="text"
      v-model="todoInput"
      class="border border-2"
      placeholder="Add a new To Do..."
    />
    <button
      class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full"
      type="submit"
      aria-label="add-new-to-do"
    >
      ➕
    </button>
  </form>

  <hr />
  <form @submit.prevent="onSearch">
    <label for="todo">Search To Dos</label>
    <input
      id="todo"
      type="text"
      v-model="searchInput"
      class="border border-2"
      placeholder="Search To Dos..."
      @input="onSearch"
    />
    <button
      class="bg-emerald-400 hover:bg-emerald-700 py-2 px-4 rounded-full"
      type="submit"
      aria-label="search-to-do"
    >
      🔎
    </button>
  </form>
</template>

<style></style>
