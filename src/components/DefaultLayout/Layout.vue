<script setup lang="ts">
import Navbar from '@/components/DefaultLayout/Navbar.vue'
</script>

<template>
  <div class="main-layout h-[100dvh]">
    <Navbar />
    <main class="main-content min-h-[calc(100%-8.1rem)]">
      <slot />
    </main>
    <footer class="flex justify-center bg-gray-200 px-4 py-5 max-md:flex-col max-md:items-center">
      <span>&copy; Easy Travel.</span>
      <span class="ml-1 max-md:ml-0 max-md:mt-1">All Rights Reserved.</span>
    </footer>
  </div>
</template>

<style scoped></style>
