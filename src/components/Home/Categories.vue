<script lang="ts">
import gql from 'graphql-tag'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import Card from '@/components/Card.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'

const QUERY = gql`
  query Categories {
    categories {
      id
      name
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
    const route = useRoute()
    const icons = ['fa-plane', 'fa-hotel', 'fa-cab']

    const currentId = computed(() => {
      return route.query.category || null
    })

    const { result, loading, error } = useQuery(QUERY)

    return {
      currentId,
      result,
      loading,
      error,
      icons
    }
  }
}
</script>

<template>
  <section class="py-8">
    <div class="container-xl m-auto lg:container">
      <ErrorBoundary :error="error">
        <div class="p-4 text-center" v-if="loading"><PulseLoader /></div>
        <div
          v-if="result"
          class="grid grid-cols-1 gap-12 rounded-lg p-4 sm:grid-cols-2 md:grid-cols-3"
        >
          <Card
            v-for="(item, index) in result.categories"
            :key="item.id"
            :bg="`${currentId === item.id ? 'bg-blue-500 text-white' : 'bg-gray-100'} hover:bg-blue-700 hover:text-white`"
            :to="`/?category=${item.id}`"
          >
            <div class="flex flex-col items-center gap-3 p-2">
              <font-awesome-icon :icon="`fa-solid ${icons[index]}`" class="text-2xl" />
              <span class="text-xl font-bold">{{ item.name }}</span>
            </div>
          </Card>
        </div>
      </ErrorBoundary>
    </div>
  </section>
</template>
