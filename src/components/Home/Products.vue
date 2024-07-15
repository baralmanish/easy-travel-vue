<script setup lang="ts">
import Card from '@/components/Card.vue'
</script>

<template>
  <section class="bg-gray-100 py-14">
    <div class="container-xl m-auto lg:container">
      <h2 class="mb-2 px-4 text-2xl font-bold sm:text-3xl md:text-4xl">Our Products</h2>
      <div class="grid grid-cols-1 gap-5 rounded-lg p-4 sm:grid-cols-2 md:grid-cols-4">
        <Card bg="bg-white">Product</Card>
        <Card bg="bg-white">Product</Card>
        <Card bg="bg-white">Product</Card>
        <Card bg="bg-white">Product</Card>
        <Card bg="bg-white">Product</Card>
      </div>
    </div>
  </section>
</template>
