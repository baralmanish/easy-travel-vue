<script>
import gql from 'graphql-tag'
import { RouterLink, useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import ErrorBoundary from '@/components/ErrorBoundary.vue'

import { BundleByIdQuery } from '@/graphql/queries'

export default {
  components: {
    PulseLoader,
    ErrorBoundary
  },
  setup() {
    const route = useRoute()
    const id = route.params.id

    const variables = { bundleId: +id }
    const { result, loading, error } = useQuery(BundleByIdQuery, variables)

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
            :src="`https://picsum.photos/id/${Math.floor(Math.random() * 50)}/300/200`"
            class="aspect-video w-full object-cover"
          />

          <div class="grid"></div>
        </div>
        <div class="flex flex-col items-start">
          <h1 class="mb-1 text-3xl font-bold">{{ result.bundle.name }}</h1>
          <span class="my-5 text-4xl font-bold">
            <font-awesome-icon icon="fa-solid fa-euro-sign" />
            {{ result.bundle.price }}
          </span>

          <RouterLink
            :to="`/make-order?productId=${result.bundle.id}`"
            class="mt-1 rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-900"
          >
            Make an Order
          </RouterLink>

          <p class="mt-5">
            {{ result.bundle.description }}
          </p>
        </div>
      </div>
    </ErrorBoundary>
  </section>
</template>
