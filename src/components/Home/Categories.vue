<script setup lang="ts">
import Card from '@/components/Card.vue'
</script>

<template>
  <section class="py-8">
    <div class="container-xl m-auto lg:container">
      <div class="grid grid-cols-1 gap-12 rounded-lg p-4 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <div class="flex flex-col items-center gap-3 p-2">
            <font-awesome-icon icon="fa-solid fa-plane" class="text-2xl" />
            <span class="text-xl font-bold">Flight</span>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col items-center gap-3 p-2">
            <font-awesome-icon icon="fa-solid fa-plane" class="text-2xl" />
            <span class="text-xl font-bold">Flight</span>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col items-center gap-3 p-2">
            <font-awesome-icon icon="fa-solid fa-plane" class="text-2xl" />
            <span class="text-xl font-bold">Flight</span>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
