<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useToDoStore } from '../stores/to-do.store'
import TheCounter from '@/components/TheCounter.vue'
import TheFilter from '@/components/TheFilter.vue'
import TheToDoManager from './TheToDoManager.vue'

const toDoStore = useToDoStore()

const onCheckboxClick = (timestamp: number) => {
  toDoStore.setToDoAsDone(timestamp)
}

const onClickOnRemove = (timestamp: number) => {
  toDoStore.removeTodo(timestamp)
}

const onClickOnEdit = (timestamp: string) => {
  toDoStore.editToDo.value = timestamp
}

const onEditSave = (todo: ToDoItem, newText: string) => {
  todo.text = newText.trim()
  editingId.value = null
}

onMounted(() => {
  toDoStore.loadTodos()
})
</script>

<template>
  <TheCounter />
  <TheFilter />
  <TheToDoManager />
  <ul class="max-w-md mx-auto">
    <li v-for="todo in toDoStore.filteredToDos" :key="todo.timestamp">
      <form @submit.prevent class="flex items-center justify-between">
        <input
          type="checkbox"
          :id="`todo-${todo.timestamp}`"
          :checked="todo.isCompleted"
          @change="onCheckboxClick(todo.timestamp)"
        />

        <!-- <label
          :for="`todo-${todo.timestamp}`"
          :class="['mr - auto', { 'line-through text-green-800': todo.isCompleted }]"
          >{{ todo.text }}
        </label> -->
        <label
          v-if="editingId !== todo.timestamp"
          :for="`todo-${todo.timestamp}`"
          :class="['mr-auto', { 'line-through text-green-800': todo.isCompleted }]"
          >{{ todo.text }}
        </label>

        <input
          v-else
          class="mr-auto border border-gray-300 rounded px-2"
          type="text"
          :value="todo.text"
          @blur="(event) => onEditSave(todo, (event.target as HTMLInputElement).value)"
          @keyup.enter="(event) => onEditSave(todo, (event.target as HTMLInputElement).value)"
          autofocus
        />

        <button
          class="px-4"
          type="button"
          @click="onClickOnEdit(todo.timestamp)"
          aria-label="edit-to-do"
        >
          ✍🏻
        </button>
        <button
          class="px-4"
          type="button"
          @click="onClickOnRemove(todo.timestamp)"
          aria-label="delete-to-do"
        >
          ❌
        </button>
      </form>
    </li>
  </ul>
</template>
