import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ToDo } from '@/types'
import { useStorage } from '@/composables/storage'
/**
 * Pinia es un store para Vue 3 que permite compartir estado entre componentes
 * de forma reactiva.
 *
 * Para crear un store con Pinia, se utiliza la función defineStore, que recibe
 * un nombre y una función que retorna el estado y las acciones del store.
 *
 * En este caso, el store tiene un array de todos y una acción para añadir un todo.
 */

const toDoFactory = (text: string): ToDo => ({
  timestamp: Date.now(),
  text,
  done: false,
})

// const getTodosFromLocalstorage = (): ToDo[] => {
//   /**
//    * El ! es para decirle a TypeScript que el valor no será null.
//    */
//   return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')!) : []
// }

// const setTodosToLocalstorage = (todo: ToDo) => {
//   const storedTodos = getTodosFromLocalstorage()
//   storedTodos.push(todo)
//   localStorage.setItem('todos', JSON.stringify(storedTodos))
// }

export const useCounterStore = defineStore('counterStore', () => {
  const todos = ref<ToDo[]>([])

  /**
   * computed en Vue es una forma de crear valores derivados de otros valores
   * reactivos. Se actualizan automáticamente cuando cambian sus dependencias,
   * pero solo cuando es necesario (tienen caché).
   */
  const total = computed(() => todos.value.length)
  const completed = computed(() => todos.value.filter((todo) => todo.done).length)
  const pending = computed(() => todos.value.filter((todo) => !todo.done))

  const storage = useStorage<ToDo[]>('todos')

  const loadTodos = () => {
    // todos.value = getTodosFromLocalstorage()
    todos.value = storage.get()
  }

  const addTodo = (todo: string) => {
    const newTodo = toDoFactory(todo)
    todos.value.push(newTodo)
    // setTodosToLocalstorage(newTodo)
    storage.set(todos.value)
  }

  const toggleDone = (timestamp: number) => {
    const todo = todos.value.find((todo) => todo.timestamp === timestamp)
    if (todo) {
      todo.done = !todo.done
    }
    storage.set(todos.value)
  }

  const removeTodo = (timestamp: number) => {
    const index = todos.value.findIndex((todo) => todo.timestamp === timestamp)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
    storage.set(todos.value)
  }

  return { todos, total, completed, pending, loadTodos, addTodo, toggleDone, removeTodo }
})
