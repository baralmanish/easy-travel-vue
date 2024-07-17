<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, reactive, watch } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useMutation, useQuery } from '@vue/apollo-composable'

import Card from '@/components/Card.vue'
import { formatDate } from '@/helpers/utility'
import { OrderByIdQuery } from '@/graphql/queries'
import Notification from '@/components/Notification.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import { UpdateOrderStatusMutation } from '@/graphql/mutations'

const route = useRoute()

const form = computed(() => ({
  status: 'PENDING'
}))

const formStatus = reactive({
  submitting: false,
  success: '',
  error: ''
})

const { mutate: updateOrderStatus } = useMutation(UpdateOrderStatusMutation)

const variables = { id: +route.params.id }
const { result, loading, error } = useQuery(OrderByIdQuery, variables)

watch(result, () => {
  if (result?.value?.order) {
    form.value.status = result.value.order.status
  }
})

const handleSubmit = async () => {
  formStatus.error = ''
  formStatus.success = ''
  formStatus.submitting = true
  try {
    await updateOrderStatus({ status: form.value.status, orderId: +route.params.id })
    formStatus.submitting = false
    formStatus.success = `Order status updated`
  } catch (error) {
    formStatus.submitting = false
    formStatus.error = `Error in updating order status`
  }
}
</script>

<template>
  <section class="container-xl m-auto px-4 py-10 lg:container">
    <h1 class="mb-5 text-3xl font-bold">
      Order Details
      <small v-if="result" class="text-lg font-medium">
        Created At: {{ formatDate(result.order.createdAt) }}
      </small>
    </h1>
    <ErrorBoundary :error="error">
      <Notification :error="formStatus.error" :success="formStatus.success" />
      <div class="p-4 text-center" v-if="loading"><PulseLoader color="rgb(29 78 216)" /></div>
      <div v-if="result" class="grid grid-cols-3 gap-5">
        <div v-if="result.order.product" class="col-span-2">
          <Card>
            <h2 class="mb-3 text-xl font-bold">Product Details:</h2>
            <div class="grid grid-cols-3 gap-5">
              <img
                :src="`https://picsum.photos/id/${result.order.product.id}/300/200`"
                class="mb-2 w-full object-cover"
              />
              <ul class="text-md col-span-2">
                <li>
                  <span class="pr-2 text-gray-600">Name:</span>
                  <span class="font-bold">
                    <RouterLink
                      :to="`/product/${result.order.product.id}`"
                      target="_blank"
                      class="font-bold text-blue-700 hover:text-blue-600"
                    >
                      {{ result.order.product.name }}
                    </RouterLink>
                  </span>
                </li>
                <li class="mt-2">
                  <span class="pr-2 text-gray-600">Price:</span>
                  <span class="font-bold">
                    <font-awesome-icon icon="fa-solid fa-euro-sign" />
                    {{ result.order.product.price }}
                  </span>
                </li>
                <li class="mt-2">
                  <span class="pr-2 text-gray-600">Category:</span>
                  <span class="font-bold">{{ result.order.product.category.name }}</span>
                </li>
                <li class="mt-2" v-if="result.order.product.location">
                  <span class="pr-2 text-gray-600">Location:</span>
                  <span class="font-bold">{{ result.order.product.location }}</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <div v-if="result.order.bundle" class="col-span-2">
          <Card>
            <h2 class="mb-3 text-xl font-bold">Bundle Details:</h2>
            <div class="">
              <div class="flex gap-4">
                <div>
                  <span class="pr-2 text-gray-600">Name:</span>
                  <span class="font-bold">
                    <RouterLink
                      :to="`/bundle/${result.order.bundle.id}`"
                      target="_blank"
                      class="font-bold text-blue-700 hover:text-blue-600"
                    >
                      {{ result.order.bundle.name }}
                    </RouterLink>
                  </span>
                </div>
                <div>
                  <span class="pr-2 text-gray-600">Price:</span>
                  <span class="font-bold">
                    <font-awesome-icon icon="fa-solid fa-euro-sign" />
                    {{ result.order.bundle.price }}
                  </span>
                </div>
              </div>

              <h2 class="mb-3 mt-4 text-lg font-bold">Bundle Products:</h2>
              <div class="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                <div
                  v-for="item in result.order.bundleProducts"
                  :key="item.id"
                  class="rounded-lg bg-white p-3"
                >
                  <img
                    :src="`https://picsum.photos/id/${item.id}/300/200`"
                    class="aspect-video w-full object-cover"
                  />
                  <div class="mt-1 flex flex-col text-center">
                    <RouterLink
                      :to="`/product/${item.id}`"
                      target="_blank"
                      class="text-sm font-bold text-blue-700 hover:text-blue-600"
                      >{{ item.name }}</RouterLink
                    >
                    <span class="text-sm font-bold">
                      <font-awesome-icon icon="fa-solid fa-euro-sign" />
                      {{ item.price }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <h2 class="text-xl font-bold">Customer Details:</h2>

          <ul class="text-md">
            <li class="mt-4">
              <span class="block pr-2 text-gray-600">Name:</span>
              <span class="block font-bold">
                {{ result.order.customerName }}
              </span>
            </li>
            <li class="mt-4">
              <span class="block pr-2 text-gray-600">Email:</span>
              <span class="block font-bold">
                {{ result.order.customerEmail }}
              </span>
            </li>
            <li class="mt-4">
              <form @submit.prevent="handleSubmit">
                <span class="mb-1 block pr-2 text-gray-600">Update Status</span>
                <span class="block font-bold">
                  <select class="w-full rounded border px-3 py-2" v-model="form.status">
                    <option disabled value="">Select Order Status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </span>
                <button
                  class="focus:shadow-outline mt-2 w-full rounded-full bg-blue-500 px-3 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none disabled:opacity-50"
                  type="submit"
                >
                  Update Status
                </button>
              </form>
            </li>
          </ul>
        </Card>
      </div>
    </ErrorBoundary>
  </section>
</template>
