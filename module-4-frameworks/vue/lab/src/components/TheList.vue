<script setup lang="ts">
import { onMounted, nextTick, reactive, ref } from 'vue'
import { useToDoStore } from '../stores/to-do.store'
import type { ToDo } from '@/types'

const toDoStore = useToDoStore()
const inputRefs = reactive<Record<number, HTMLInputElement | null>>({})
const editingTodoTimestamp = ref<number | null>(null) // Almacena el timestamp del ToDo en edición

const onCheckboxClick = (timestamp: number) => {
  toDoStore.setToDoAsDone(timestamp)
}

const onClickOnRemove = (timestamp: number) => {
  toDoStore.removeTodo(timestamp)
}

const onClickOnEdit = async (timestamp: number) => {
  const inputEl = inputRefs[timestamp]

  console.log('Activando el modo edición.')
  editingTodoTimestamp.value = timestamp // Activar el modo edición
  toDoStore.editToDo = timestamp

  // Espera a que el DOM se actualice
  await nextTick()

  // Enfoca el input correspondiente
  if (inputEl) {
    inputEl.focus()
    inputEl.select()
  }
}

const onEditSave = (todo: ToDo, newText: string) => {
  console.log('onEditSave executed')
  todo.text = newText.trim()
  toDoStore.editToDo = 0 // Salir del modo edición
  editingTodoTimestamp.value = null // Restablecer el estado de edición
}

const onCancelEdit = () => {
  console.log('Cancelando el modo edición.')
  toDoStore.editToDo = 0 // Salir del modo edición
  editingTodoTimestamp.value = null // Restablecer el estado de edición
}

onMounted(() => {
  toDoStore.loadTodos()
})

const checkboxButtonClasses = (color: string) => {
  return `p-2 bg-${color} text-white rounded-full
  hover:bg-${color.replace(/[0-9]+/, (n) => String(+n + 100))}
  focus:outline-none focus:ring-4 focus:ring-${color.replace(/[0-9]+/, (n) => String(+n - 200))} `
}

const getToDoButtonClasses = (color: string) => {
  return `px-3 py-1 bg-${color} rounded-full hover:bg-${color.replace(/[0-9]+/, (n) => String(+n + 100))}`
}
</script>

<template>
  <ul class="max-w-full mx-auto space-y-4">
    <li v-for="(todo, index) in toDoStore.filteredToDos" :key="todo.timestamp">
      <form
        @submit.prevent
        class="grid grid-cols-3 items-center gap-4 p-4 bg-white shadow-lg rounded-lg transition-all hover:shadow-xl"
      >
        <div class="flex justify-center">
          <button
            v-if="todo.isCompleted"
            :id="`todo-${todo.timestamp}`"
            :checked="todo.isCompleted"
            type="button"
            @click="onCheckboxClick(todo.timestamp)"
            :class="checkboxButtonClasses('green-500')"
            aria-label="mark-as-done"
          >
            ✅
          </button>
          <button
            v-else
            :id="`todo-${todo.timestamp}`"
            :checked="todo.isCompleted"
            type="button"
            @click="onCheckboxClick(todo.timestamp)"
            :class="checkboxButtonClasses('yellow-400')"
            aria-label="mark-as-done"
          >
            ⌛
          </button>
        </div>

        <div class="flex items-center">
          <label
            v-if="toDoStore.editToDo !== todo.timestamp"
            :for="`todo-${todo.timestamp}`"
            :class="['text-lg font-medium', { 'line-through text-gray-500': todo.isCompleted }]"
            class="w-full cursor-pointer"
          >
            {{ todo.text }}
          </label>
          <input
            v-else
            :ref="(el) => (inputRefs[todo.timestamp] = el as HTMLInputElement)"
            class="w-full border border-gray-300 rounded px-2 py-1 text-lg focus:outline-none focus:ring-2"
            type="text"
            :value="todo.text"
            aria-label="To do text input to edit"
          />
        </div>

        <!-- Columna 3: Botones -->
        <div class="flex items-center justify-end space-x-2">
          <div v-if="toDoStore.editToDo === todo.timestamp" class="flex space-x-2">
            <button
              :class="getToDoButtonClasses('green-500')"
              type="button"
              @click="(event) => onEditSave(todo, inputRefs[todo.timestamp]?.value || '')"
              aria-label="Save to do"
            >
              💾
            </button>
            <button
              :class="getToDoButtonClasses('gray-500')"
              type="button"
              @click="onCancelEdit"
              aria-label="Cancel edit to do"
            >
              ❌
            </button>
          </div>

          <div v-else class="flex items-center space-x-2">
            <button
              :class="getToDoButtonClasses('blue-500')"
              type="button"
              @click="onClickOnEdit(todo.timestamp)"
              aria-label="Edit to do"
            >
              ✍🏻
            </button>
          </div>
          <button
            :class="getToDoButtonClasses('red-500')"
            type="button"
            @click="onClickOnRemove(todo.timestamp)"
            aria-label="Remove to do"
          >
            🗑️
          </button>
        </div>
      </form>
    </li>
  </ul>
</template>
