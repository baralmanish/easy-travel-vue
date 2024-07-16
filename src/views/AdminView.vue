<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import { formatDate } from '@/helpers/utility'
import { OrderQuery } from '@/graphql/queries'
import ErrorBoundary from '@/components/ErrorBoundary.vue'

const { result, loading, error } = useQuery(OrderQuery)
</script>

<template>
  <section class="container-xl m-auto px-4 py-10 lg:container">
    <h1 class="mb-5 text-3xl font-bold">Orders</h1>
    <ErrorBoundary :error="error">
      <div class="p-4 text-center" v-if="loading"><PulseLoader color="rgb(29 78 216)" /></div>
      <div v-if="result" class="relative overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-900 rtl:text-right">
          <thead class="bg-blue-700 text-xs uppercase text-white">
            <tr>
              <th scope="col" class="w-14 px-4 py-3">ID</th>
              <th scope="col" class="w-28 px-4 py-3">Date</th>
              <th scope="col" class="px-4 py-3">Customer Name</th>
              <th scope="col" class="px-4 py-3">Product / Bundle</th>
              <th scope="col" class="w-14 px-4 py-3">Type</th>
              <th scope="col" class="w-28 px-4 py-3">Price</th>
              <th scope="col" class="w-24 px-4 py-3">Status</th>
              <th scope="col" class="w-24 px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in result.orders"
              :key="row.id"
              class="border-b odd:bg-white even:bg-gray-100"
            >
              <td class="px-4 py-3">{{ row.id }}</td>
              <td class="px-4 py-3">{{ formatDate(row.createdAt) }}</td>
              <td class="px-4 py-3">{{ row.customerName }}</td>
              <td class="px-4 py-3">{{ row.product?.name || row.bundle?.name }}</td>
              <td class="px-4 py-3">{{ row.product?.name ? 'Product' : 'Bundle' }}</td>
              <td class="px-4 py-3">
                <font-awesome-icon icon="fa-solid fa-euro-sign" />
                {{ row.product?.price || row.bundle?.price }}
              </td>
              <td class="px-4 py-3">
                <span
                  :class="[
                    row.status === 'PENDING' && 'border-orange-200 bg-orange-100 text-orange-800',
                    row.status === 'CONFIRMED' && 'border-green-200 bg-green-100 text-green-800',
                    row.status === 'CANCELLED' && 'border-red-200 bg-red-100 text-red-800',
                    'rounded-lg',
                    'border-[1px]',
                    'px-2',
                    'py-1',
                    'text-xs'
                  ]"
                >
                  {{ row.status }}
                </span>
              </td>
              <td class="px-4 py-3">
                <RouterLink
                  :to="`/admin/order/${row.id}`"
                  class="rounded-lg bg-blue-700 px-3 py-1 text-xs text-white hover:bg-blue-800"
                >
                  View
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ErrorBoundary>
  </section>
</template>
