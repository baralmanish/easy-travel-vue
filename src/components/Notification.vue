<script lang="ts">
export default {
  props: {
    success: {
      type: String,
      required: false
    },
    error: {
      type: String,
      required: false
    },
    textSize: {
      type: String,
      default: 'text-sm'
    }
  }
}
</script>

<template>
  <div
    v-if="success"
    :class="`mb-4 rounded-lg border-[1px] border-green-200 bg-green-100 px-3 py-2 text-green-800 ${textSize}`"
  >
    {{ success }}
  </div>
  <div
    v-if="error"
    :class="`mb-4 rounded-lg border-[1px] border-red-200 bg-red-100 px-3 py-2 text-red-800 ${textSize}`"
  >
    {{ error }}
  </div>
</template>
