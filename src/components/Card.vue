<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
  bg: {
    type: String,
    default: 'bg-gray-100'
  },
  to: {
    type: String
  }
})
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="`rounded-lg p-6 shadow-md ${bg}`">
    <slot></slot>
  </RouterLink>
  <div v-else :class="`${bg} rounded-lg p-6 shadow-md`">
    <slot></slot>
  </div>
</template>
