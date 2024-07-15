<script setup lang="ts">
import Card from '@/components/Card.vue'
</script>

<template>
  <section class="py-14">
    <div class="container-xl m-auto lg:container">
      <h2 class="mb-2 px-4 text-2xl font-bold sm:text-3xl md:text-4xl">Product Bundles</h2>
      <div class="grid grid-cols-1 gap-5 rounded-lg p-4 sm:grid-cols-2 md:grid-cols-4">
        <Card>Bundle</Card>
        <Card>Bundle</Card>
        <Card>Bundle</Card>
        <Card>Bundle</Card>
        <Card>Bundle</Card>
      </div>
    </div>
  </section>
</template>
