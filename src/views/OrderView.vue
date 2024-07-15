<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routeQuery = computed(() => {
  return route.query || null
})

console.log('>>>> queryParam', routeQuery.value)
</script>

<template>
  <section class="container-xl m-auto px-4 py-10 lg:container">
    <h1 class="mb-5 text-3xl font-bold">About</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis aliquid hic dolore unde
      deleniti officiis beatae asperiores numquam, quo sint vel? Aliquid quos optio eligendi magni
      nobis vel similique. Dolore.
    </p>
  </section>
</template>
