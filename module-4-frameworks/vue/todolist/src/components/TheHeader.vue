<script setup lang="ts">
import { RouterLink } from 'vue-router'

const title = 'Vue - Todo List'
</script>

<template>
 <header class="shadow-md bg-white">
    <h1>{{ title }}</h1>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>
</template>