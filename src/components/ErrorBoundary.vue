<script setup lang="ts">
import { ApolloError } from '@apollo/client/core'
import type { IError } from '@/interfaces/common'

defineProps<{
  error: ApolloError | IError | null
}>()
</script>

<template>
  <div v-if="error" class="flex flex-col p-4 text-center text-red-600">
    <span>{{ error.name }}</span>
    <span>{{ error.message }}</span>
  </div>
  <div v-else><slot></slot></div>
</template>
