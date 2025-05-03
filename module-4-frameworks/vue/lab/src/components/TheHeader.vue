<script setup lang="ts">
const title = 'Just Do It'
const subtitle = 'with your To Do App'
const description = 'Organize your tasks, prioritize what matters, and make every day count.'
</script>

<template>
  <header class="shadow-md p-4 mb-6 bg-white rounded-lg">
    <h1 class="mb-4 text-3xl font-extrabold text-gray-400 md:text-5xl lg:text-6xl">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{{
        title
      }}</span>
      {{ subtitle }}
    </h1>
    <p class="text-lg font-normal text-gray-800 lg:text-xl">
      {{ description }}
    </p>
  </header>
</template>
