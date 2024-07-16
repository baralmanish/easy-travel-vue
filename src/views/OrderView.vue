<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { computed, reactive, ref, type Ref } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import Card from '@/components/Card.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'

import type { IError } from '@/interfaces/common'
import { CreateOrderMutation } from '@/graphql/mutations/orderMutation'
import { BundleByIdQuery, ProductByIdQuery } from '@/graphql/queries'

const route = useRoute()
const form = reactive({
  customerName: '',
  customerEmail: ''
})
const formStatus = reactive({
  loading: false,
  success: '',
  error: ''
})

const pageError: Ref<IError | null> = ref(null)

const orderFor = computed(() => {
  if (
    !Object.keys(route.query).includes('productId') &&
    !Object.keys(route.query).includes('bundleId')
  ) {
    return null
  }
  if (Object.keys(route.query).includes('productId')) {
    return 'productId'
  }

  return 'bundleId'
})

if (!orderFor.value) {
  pageError.value = {
    name: 'Invalid Url',
    message: 'Please check your url'
  }
}

const variables = { [`${orderFor.value}`]: Number(route.query[`${orderFor.value}`]) }
console.log('>>> q', BundleByIdQuery)
const { result, loading, error } = useQuery(
  orderFor.value === 'productId' ? ProductByIdQuery : BundleByIdQuery,
  variables
)

const { mutate: createOrder } = useMutation(CreateOrderMutation)

const resetForm = () => {
  form.customerEmail = ''
  form.customerName = ''
  formStatus.loading = false
}

const handleSubmit = async () => {
  formStatus.error = ''
  formStatus.success = ''
  formStatus.loading = true

  try {
    const variables = {
      customerEmail: form.customerEmail,
      customerName: form.customerEmail,
      bundleId: route.query.bundleId ? Number(route.query.bundleId) : null,
      productId: route.query.productId ? Number(route.query.productId) : null
    }
    const res = await createOrder({ ...variables })
    console.log('>> res', res)
    formStatus.success = 'Order placed successfully'
    resetForm()
  } catch (error) {
    console.log('>> error', error)
    formStatus.error = 'Error on placing an order'
    formStatus.loading = false
  }
}
</script>

<template>
  <section class="container-xl m-auto px-4 py-10 lg:container">
    <ErrorBoundary :error="pageError || error">
      <div class="p-4 text-center" v-if="loading"><PulseLoader color="rgb(29 78 216)" /></div>
      <div v-if="result" class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
        <Card v-if="orderFor === 'productId'">
          <div class="grid grid-cols-1">
            <div>
              <img
                :src="`https://picsum.photos/id/${result.getProductById.id}/300/200`"
                class="mb-2 aspect-video w-full object-cover"
              />
            </div>
            <ul>
              <li class="mt-2">
                <RouterLink
                  :to="`/product/${result.getProductById.id}`"
                  class="text-xl font-bold text-blue-700 hover:text-blue-600"
                >
                  {{ result.getProductById.name }}
                </RouterLink>
              </li>
              <li class="mt-2">
                <span class="pr-2 text-gray-600">Price:</span>
                <span class="font-bold">
                  <font-awesome-icon icon="fa-solid fa-euro-sign" />
                  {{ result.getProductById.price }}
                </span>
              </li>
              <li class="mt-2">
                <span class="pr-2 text-gray-600">Category:</span>
                <span class="font-bold">{{ result.getProductById.category.name }}</span>
              </li>
              <li class="mt-2">
                <span class="pr-2 text-gray-600">Location:</span>
                <span class="font-bold">{{ result.getProductById.location }}</span>
              </li>
            </ul>
          </div>
        </Card>
        <Card v-if="orderFor === 'bundleId'">
          <div class="grid grid-cols-1">
            <div>
              <img
                :src="`https://picsum.photos/id/1/300/200`"
                class="mb-2 aspect-video w-full object-cover"
              />
            </div>
            <ul>
              <li class="mt-2">
                <RouterLink
                  :to="`/product/1`"
                  class="text-xl font-bold text-blue-700 hover:text-blue-600"
                >
                  {{ result.bundle.name }}
                </RouterLink>
              </li>
              <li class="mt-2">
                <span class="pr-2 text-gray-600">Price:</span>
                <span class="font-bold">{{ result.bundle.price }}</span>
              </li>
            </ul>
          </div>
        </Card>

        <div>
          <Card>
            <form @submit.prevent="handleSubmit" :disabled="formStatus.loading">
              <h1 class="mb-4 text-2xl font-bold">Place an Order</h1>

              <div
                v-if="formStatus.error"
                class="mb-4 rounded-lg border-[1px] border-red-200 bg-red-100 px-3 py-2 text-xs text-red-800"
              >
                {{ formStatus.error }}
              </div>

              <div
                v-if="formStatus.success"
                class="mb-4 rounded-lg border-[1px] border-green-200 bg-green-100 px-3 py-2 text-xs text-green-800"
              >
                {{ formStatus.success }}
              </div>

              <div class="mb-4">
                <label class="mb-2 block font-bold text-gray-700">Job Listing Name</label>
                <input
                  type="text"
                  v-model="form.customerName"
                  id="customerName"
                  name="customerName"
                  class="mb-2 w-full rounded border px-3 py-2"
                  placeholder="Enter your full name"
                  :disabled="formStatus.loading"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="mb-2 block font-bold text-gray-700">Job Listing Name</label>
                <input
                  type="email"
                  v-model="form.customerEmail"
                  id="customerEmail"
                  name="customerEmail"
                  class="mb-2 w-full rounded border px-3 py-2"
                  placeholder="Enter your email address"
                  :disabled="formStatus.loading"
                  required
                />
              </div>

              <div>
                <button
                  class="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
                  type="submit"
                  :disabled="formStatus.loading"
                >
                  {{ formStatus.loading ? 'Submitting...' : 'Submit' }}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  </section>
</template>
