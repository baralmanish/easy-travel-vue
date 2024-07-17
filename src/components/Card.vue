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
  <RouterLink
    data-test="card-component-with-link"
    v-if="to"
    :to="to"
    :class="`rounded-lg p-6 shadow-md ${bg}`"
  >
    <slot></slot>
  </RouterLink>
  <div data-test="card-component-without-link" v-else :class="`${bg} rounded-lg p-6 shadow-md`">
    <slot></slot>
  </div>
</template>
