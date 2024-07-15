<script lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import Card from '@/components/Card.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'

const QUERY = gql`
  query Products {
    products {
      id
      name
      price
      location
      category {
        id
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
  <section class="bg-gray-100 py-14">
    <div class="container-xl m-auto lg:container">
      <h2 class="mb-2 px-4 text-2xl font-bold sm:text-3xl md:text-4xl">Our Products</h2>
      <ErrorBoundary :error="error">
        <div class="p-4 text-center" v-if="loading"><PulseLoader /></div>
        <div
          v-if="result"
          class="grid grid-cols-1 gap-5 rounded-lg p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          <Card v-for="item in result.products" :key="item.id" bg="bg-white">
            <div class="flex flex-col items-center gap-2 text-center">
              <img
                :src="`https://picsum.photos/id/${Math.floor(Math.random() * 200)}/300/200`"
                class="aspect-video w-full object-cover"
              />
              <span class="font-bold text-blue-700">{{ item.name }}</span>
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
            </div>
          </Card>
        </div>
      </ErrorBoundary>
    </div>
  </section>
</template>
