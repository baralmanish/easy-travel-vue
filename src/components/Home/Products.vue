<script lang="ts">
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { computed, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import Card from '@/components/Card.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'

import { ProductQuery } from '@/graphql/queries'

export default {
  components: {
    Card,
    PulseLoader,
    ErrorBoundary
  },
  setup() {
    const route = useRoute()
    const currentId = computed(() => {
      return route.query.category || null
    })

    let variables = { isActive: true, categoryId: currentId.value ? +currentId.value : null }
    const res = useQuery(ProductQuery, variables)

    watchEffect(async () => {
      const id = route.query.category
      await res.refetch({ isActive: true, categoryId: id ? +id : null })
    })

    return {
      route,
      currentId,
      ...res
    }
  }
}
</script>

<template>
  <section data-test="products-section" class="bg-gray-100 py-14">
    <div class="container-xl m-auto lg:container">
      <h2 class="mb-2 px-4 text-2xl font-bold sm:text-3xl md:text-4xl">Our Products</h2>
      <ErrorBoundary :error="error">
        <div class="p-4 text-center" v-if="loading"><PulseLoader color="rgb(29 78 216)" /></div>
        <div
          v-if="result"
          class="grid grid-cols-1 gap-5 rounded-lg p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          <Card v-for="item in result.products" :key="item.id" bg="bg-white">
            <div class="flex flex-col items-center gap-2 text-center">
              <img
                :src="`https://picsum.photos/id/${item.id}/300/200`"
                class="aspect-video w-full object-cover"
              />
              <RouterLink
                :to="`/product/${item.id}`"
                class="font-bold text-blue-700 hover:text-blue-600"
                >{{ item.name }}</RouterLink
              >
              <span class="text-2xl font-bold">
                <font-awesome-icon icon="fa-solid fa-euro-sign" />
                {{ item.price }}
              </span>
              <div class="flex w-full justify-between gap-2 text-xs text-gray-600">
                <span>
                  <font-awesome-icon icon="fa-solid fa-hashtag" />
                  {{ item.category.name }}
                </span>
                <span>
                  <font-awesome-icon icon="fa-solid fa-location-dot" />
                  {{ item.location }}
                </span>
              </div>

              <RouterLink
                :to="`/make-order?productId=${item.id}`"
                class="mt-1 w-full rounded-md bg-blue-700 px-3 py-2 text-white hover:bg-blue-900"
              >
                Make an Order
              </RouterLink>
            </div>
          </Card>
        </div>
      </ErrorBoundary>
    </div>
  </section>
</template>
