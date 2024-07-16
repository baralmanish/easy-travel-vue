<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import { AllProductsQuery } from '@/graphql/queries'
import ErrorBoundary from '@/components/ErrorBoundary.vue'

const { result, loading, error, ...res } = useQuery(AllProductsQuery)

console.log('>>>> res', res)
</script>

<template>
  <section class="container-xl m-auto px-4 py-10 lg:container">
    <div class="mb-5 flex justify-between">
      <h1 class="text-3xl font-bold">Products</h1>
      <button class="rounded-lg bg-blue-700 px-3 py-1 text-sm text-white hover:bg-blue-800">
        Add Product
      </button>
    </div>
    <ErrorBoundary :error="error">
      <div class="p-4 text-center" v-if="loading"><PulseLoader color="rgb(29 78 216)" /></div>
      <div v-if="result" class="relative overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-900 rtl:text-right">
          <thead class="bg-blue-700 text-xs uppercase text-white">
            <tr>
              <th scope="col" class="w-14 px-4 py-3">ID</th>
              <th scope="col" class="px-4 py-3">Name</th>
              <th scope="col" class="px-4 py-3">Category</th>
              <th scope="col" class="w-28 px-4 py-3">Price</th>
              <th scope="col" class="w-20 px-4 py-3">Status</th>
              <th scope="col" class="w-24 px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in result.products"
              :key="row.id"
              class="border-b odd:bg-white even:bg-gray-100"
            >
              <td class="px-4 py-3">{{ row.id }}</td>
              <td class="px-4 py-3">{{ row.name }}</td>
              <td class="px-4 py-3">{{ row.category.name }}</td>
              <td class="px-4 py-3">
                <font-awesome-icon icon="fa-solid fa-euro-sign" />
                {{ row.price }}
              </td>
              <td class="px-4 py-3">
                <span
                  v-if="row.isActive"
                  class="rounded-lg border-[1px] border-green-200 bg-green-100 px-1 py-1 text-xs text-green-800"
                >
                  Active
                </span>
                <span
                  v-else
                  class="rounded-lg border-[1px] border-red-200 bg-red-100 px-1 py-0.5 text-xs text-red-800"
                >
                  Inactive
                </span>
              </td>
              <td class="px-4 py-3">
                <button
                  class="rounded-lg bg-blue-700 px-3 py-1 text-xs text-white hover:bg-blue-800"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ErrorBoundary>
  </section>
</template>
