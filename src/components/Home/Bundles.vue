<script lang="ts">
import gql from 'graphql-tag'
import { RouterLink } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import Card from '@/components/Card.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'

const QUERY = gql`
  query Bundles {
    bundles {
      id
      name
      price
      products {
        name
      }
    }
  }
`

export default {
  components: {
    Card,
    PulseLoader,
    ErrorBoundary
  },
  setup() {
    const { result, loading, error } = useQuery(QUERY)

    return {
      result,
      loading,
      error
    }
  }
}
</script>

<template>
  <section class="py-14">
    <div class="container-xl m-auto lg:container">
      <h2 class="mb-2 px-4 text-2xl font-bold sm:text-3xl md:text-4xl">Product Bundles</h2>
      <ErrorBoundary :error="error">
        <div class="p-4 text-center" v-if="loading"><PulseLoader /></div>
        <div
          v-if="result"
          class="grid grid-cols-1 gap-5 rounded-lg p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          <Card v-for="item in result.bundles" :key="item.id">
            <div class="flex flex-col items-center gap-1 text-center">
              <img
                :src="`https://picsum.photos/id/${Math.floor(Math.random() * 50)}/300/200`"
                class="aspect-video w-full object-cover"
              />
              <RouterLink :to="`/bundle/${item.id}`" class="mt-2 font-bold text-blue-700">
                {{ item.name }}
              </RouterLink>
              <span class="text-lg font-bold">
                <font-awesome-icon icon="fa-solid fa-euro-sign" />
                {{ item.price }}
              </span>

              <div class="mt-3 flex gap-2 text-xs leading-3 text-gray-600">
                <span v-for="(product, index) in item.products" :key="index">
                  {{ product.name }}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </ErrorBoundary>
    </div>
  </section>
</template>
