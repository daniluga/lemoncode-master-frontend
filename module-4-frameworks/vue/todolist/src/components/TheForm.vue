<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'

const todoInput = ref<string>('')
const counterStore = useCounterStore()
const addTodo = () => {
  /**
   * Con .value accedemos al valor de "todos", en Vue hace falta.
   */
  counterStore.addTodo(todoInput.value)
  todoInput.value = ''
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
      placeholder="Add a new task"
    />
    <button class="px-4" type="submit">Add</button>
  </form>
</template>
