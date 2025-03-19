<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCounterStore } from '../../stores/counter'

const counterStore = useCounterStore()
const onChange = (timestamp: number) => {
  counterStore.toggleDone(timestamp)
}
const onClick = (timestamp: number) => {
  counterStore.removeTodo(timestamp)
}

const toDosToShow = ref(counterStore.todos)

const showOnlyPendingToDos = (event: Event) => {
  if ((event.target as HTMLInputElement)?.checked) {
    toDosToShow.value = counterStore.pending
  } else {
    toDosToShow.value = counterStore.todos
  }
}
onMounted(() => {
  counterStore.loadTodos()
  toDosToShow.value = counterStore.todos
})
</script>

<template>
  <div v-if="counterStore.total > 0">
    <p>Total: {{ counterStore.total }} | Completados: {{ counterStore.completed }}</p>
  </div>
  <div>
    <input type="checkbox" id="toggle" @change="showOnlyPendingToDos" />
    <label for="toggle">Show only pending ToDos</label>
  </div>
  <ul class="max-w-md mx-auto">
    <li v-for="todo in toDosToShow" :key="todo.timestamp">
      <form @submit.prevent class="flex items-center justify-between">
        <!-- El label está asociado al input con el atributo for, que tiene el 
       mismo valor que el id del input. Por eso al hacer click en el label, 
       se chequea el checbox -->
        <input
          type="checkbox"
          :id="`todo-${todo.timestamp}`"
          :checked="todo.done"
          @change="onChange(todo.timestamp)"
        />
        <label
          :for="`todo-${todo.timestamp}`"
          :class="['mr - auto', { 'line-through text-green-800': todo.done }]"
          >{{ todo.text }}</label
        >
        <button class="px-4" type="button" @click="onClick(todo.timestamp)">Delete</button>
      </form>
    </li>
  </ul>
</template>
