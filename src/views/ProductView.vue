<script>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useRoute } from 'vue-router'

import ErrorBoundary from '@/components/ErrorBoundary.vue'

const QUERY = gql`
  query Product($productId: Int!) {
    getProductById(id: $productId) {
      id
      name
      price
      location
      description
      category {
        name
      }
    }
  }
`

export default {
  components: {
    // Card,
    PulseLoader,
    ErrorBoundary
  },
  setup() {
    const route = useRoute()
    const id = route.params.id

    const variables = { productId: +id }
    const { result, loading, error } = useQuery(QUERY, variables)

    return {
      result,
      loading,
      error
    }
  }
}
</script>

<template>
  <section class="container-xl m-auto px-4 py-12 lg:container">
    <ErrorBoundary :error="error">
      <div class="p-4 text-center" v-if="loading"><PulseLoader /></div>

      <div v-if="result" class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
        <div>
          <img
            :src="`https://picsum.photos/id/${result.getProductById.id}/300/200`"
            class="aspect-video w-full object-cover"
          />
        </div>
        <div class="flex flex-col items-start">
          <small class="text-gray-600">{{ result.getProductById.category.name }}</small>
          <h1 class="mb-1 text-3xl font-bold">{{ result.getProductById.name }}</h1>
          <small class="text-gray-600">
            <font-awesome-icon icon="fa-solid fa-location-dot" />
            {{ result.getProductById.location }}
          </small>

          <span class="my-5 text-4xl font-bold">
            <font-awesome-icon icon="fa-solid fa-euro-sign" />
            {{ result.getProductById.price }}
          </span>

          <Button
            class="flex items-center rounded-lg bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
          >
            Place an Order
          </Button>

          <p class="mt-5">
            {{ result.getProductById.description }}
          </p>
        </div>
      </div>
    </ErrorBoundary>
  </section>
</template>
