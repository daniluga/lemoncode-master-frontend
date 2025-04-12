import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Statuses, ToDo } from '@/types'
import { useStorage } from '@/composables/storage'

const toDoFactory = (text: string): ToDo => ({
  timestamp: Date.now(),
  text,
  isCompleted: false,
})

export const useToDoStore = defineStore('toDoStore', () => {
  /* Storage */
  const storage = useStorage<ToDo[]>('allToDos')

  /* Reactive constants */
  const allToDos = ref<ToDo[]>([])
  const toDosToBeShown = ref<ToDo[]>([])
  const selectedFilter = ref<Statuses>('All')
  const searchToDosText = ref<string>('')

  /* Computed variables */
  const totalToDos = computed(() => allToDos.value.length)
  const totalToDosCompleted = computed(
    () => allToDos.value.filter((todo) => todo.isCompleted).length,
  )
  const totalToDosPending = computed(
    () => allToDos.value.filter((todo) => !todo.isCompleted).length,
  )

  const editToDo = ref<string>()

  const laTocha = computed(() => {
    toDosToBeShown.value.length === 0 ? filteredToDos.value : toDosToBeShown.value
  })

  const setFilter = (filter: Statuses) => {
    if (filter === selectedFilter.value) {
      return
    }
    selectedFilter.value = filter
  }

  const filteredToDos = computed(() => {
    if (selectedFilter.value === 'Pending') {
      return allToDos.value.filter((todo) => !todo.isCompleted)
    } else if (selectedFilter.value === 'Completed') {
      return allToDos.value.filter((todo) => todo.isCompleted)
    } else {
      return allToDos.value
    }
  })

  const loadTodos = () => {
    allToDos.value = storage.get()
  }

  /* CRUD: Create, Read, Update, Delete */
  const createToDo = (toDo: string) => {
    const fecha = new Date()
    const fechaFormateada = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}:${fecha.getMilliseconds()} | ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
    const newTodo = toDoFactory(`${toDo} #${Math.floor(Math.random() * 1000)} - ${fechaFormateada}`)
    allToDos.value.push(newTodo)
    storage.set(allToDos.value)
  }

  /**
   * Update/Edit
   */

  const removeToDo = (timestamp: number) => {
    const index = allToDos.value.findIndex((todo) => todo.timestamp === timestamp)
    if (index !== -1) {
      allToDos.value.splice(index, 1)
    }
    storage.set(allToDos.value)
  }

  /* Search */
  const searchToDos = (text: string) => {
    searchToDosText.value = text.toLowerCase()
    // if (!text.trim()) {
    //   toDosToBeShown.value = allToDos.value
    //   return
    // }
    toDosToBeShown.value = allToDos.value.filter((todo) => {
      return todo.text.toLowerCase().includes(searchToDosText.value)
    })
    console.log('toDosToBeShown', toDosToBeShown.value)
  }

  /* Set status */
  const setToDoAsDone = (timestamp: number) => {
    const todo = allToDos.value.find((todo) => todo.timestamp === timestamp)
    if (todo) {
      todo.isCompleted = !todo.isCompleted
    }
    storage.set(allToDos.value)
  }

  /**
   * Filters
   */
  const setAllToDosAsPending = () => {
    allToDos.value.forEach((todo) => (todo.isCompleted = false))
    storage.set(allToDos.value)
  }

  const removeAllCompletedToDos = () => {
    if (allToDos.value.filter((todo) => todo.isCompleted).length === 0) {
      return
    }
    /**
     * Todo lo que NO esté completado se queda.
     */
    allToDos.value = allToDos.value.filter((todo) => !todo.isCompleted)
    storage.set(allToDos.value)
  }

  const setAllToDosAsDone = () => {
    allToDos.value.forEach((todo) => {
      if (!todo.isCompleted) {
        todo.isCompleted = true
      }
    })
    storage.set(allToDos.value)
  }

  /* Sort To Dos by status */
  const sortToDosByCompletedFirst = () => {
    allToDos.value.sort((a, b) => {
      if (a.isCompleted && !b.isCompleted) {
        return -1
      } else if (!a.isCompleted && b.isCompleted) {
        return 1
      } else {
        return 0
      }
    })
  }

  const sortToDosByPendingFirst = () => {
    allToDos.value.sort((a, b) => {
      if (!a.isCompleted && b.isCompleted) {
        return -1
      } else if (a.isCompleted && !b.isCompleted) {
        return 1
      } else {
        return 0
      }
    })
  }

  /* Sort To Dos by timestamp */
  const sortToDosByTimestampAsc = () => {
    allToDos.value.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return 1
      } else if (a.timestamp < b.timestamp) {
        return -1
      } else {
        return 0
      }
    })
  }
  const sortToDosByTimestampDesc = () => {
    allToDos.value.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return -1
      } else if (a.timestamp < b.timestamp) {
        return 1
      } else {
        return 0
      }
    })
  }

  return {
    toDosToBeShown,
    allToDos,
    totalToDos,
    totalToDosCompleted,
    totalToDosPending,
    filteredToDos,
    selectedFilter,
    laTocha,
    editToDo,
    setFilter,
    loadTodos,
    addTodo: createToDo,
    searchToDos,
    setToDoAsDone,
    removeTodo: removeToDo,
    removeAllCompletedToDos,
    setAllToDosAsDone,
    setAllToDosAsPending,
    sortToDosByCompletedFirst,
    sortToDosByPendingFirst,
    sortToDosByTimestampAsc,
    sortToDosByTimestampDesc,
  }
})
