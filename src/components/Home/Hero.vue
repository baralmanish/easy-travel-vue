<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Easy Travel'
  },
  subtitle: {
    type: String,
    default: 'Discover the real value of travel'
  }
})
</script>

<template>
  <section class="hero-section bg-blue-700 py-16">
    <div class="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          {{ title }}
        </h1>
        <p class="my-4 text-xl text-white">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>
