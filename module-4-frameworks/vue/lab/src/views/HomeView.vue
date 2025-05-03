<script setup lang="ts">
import TheCounter from '@/components/TheCounter.vue'
import TheFilter from '@/components/TheFilter.vue'
import TheForm from '@/components/TheForm.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheList from '@/components/TheList.vue'
import TheToDoManager from '@/components/TheToDoManager.vue'
</script>

<template>
  <main class="p-4 space-y-6">
    <TheHeader />
    <TheForm />
    <TheCounter />
    <TheFilter />
    <TheToDoManager />
    <TheList />
  </main>
</template>
