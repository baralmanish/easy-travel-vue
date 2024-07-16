<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useMutation, useQuery } from '@vue/apollo-composable'

import { formatDate } from '@/helpers/utility'
import { ProductByIdQuery } from '@/graphql/queries'
import Notification from '@/components/Notification.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import type { IProductFormInput } from '@/interfaces/form'
import { CreateProductMutation, UpdateProductMutation } from '@/graphql/mutations'

const route = useRoute()
const router = useRouter()

const form = computed(() => ({
  name: '',
  date: '',
  price: '',
  location: '',
  categoryId: null,
  description: '',
  isActive: '1'
}))
const formStatus = reactive({
  submitting: false,
  success: '',
  error: ''
})

const { mutate: createProduct } = useMutation(
  route.params.id ? UpdateProductMutation : CreateProductMutation
)

const variables = { productId: +route.params.id }
const { result, loading, error } = useQuery(ProductByIdQuery, variables, () => ({
  enabled: !!route.params.id
}))
watch(result, () => {
  if (result.value?.getProductById) {
    form.value.name = result.value.getProductById.name
    form.value.date = formatDate(result.value.getProductById.date)
    form.value.price = result.value.getProductById.price
    form.value.location = result.value.getProductById.location
    form.value.categoryId = result.value.getProductById.category.id
    form.value.description = result.value.getProductById.description
    form.value.isActive = result.value.getProductById.isActive ? '1' : '0'
  }
})

const handleSubmit = async () => {
  const data: IProductFormInput = {
    name: form.value.name,
    description: form.value.description,
    price: Number(form.value.price),
    categoryId: Number(form.value.categoryId),
    isActive: form.value.isActive === '1'
  }
  if (form.value.date) {
    data.date = new Date(form.value.date)
  }
  if (form.value.location) {
    data.location = form.value.location
  }

  formStatus.error = ''
  formStatus.success = ''
  formStatus.submitting = true
  try {
    if (route.params.id) {
      await createProduct({ data, id: +route.params.id })
    } else {
      await createProduct({ data })
    }
    router.push('/admin/products')
  } catch (error) {
    formStatus.submitting = false
    formStatus.error = `Error in ${route.params.id ? 'updating' : 'creating'} product`
  }
}
</script>

<template>
  <section class="container-xl m-auto px-4 py-10 lg:container">
    <div class="mb-5 flex justify-between">
      <h1 class="text-3xl font-bold">{{ route.params.id ? 'Edit' : 'Add' }} Product</h1>
    </div>

    <ErrorBoundary :error="error">
      <div class="p-4 text-center" v-if="loading"><PulseLoader color="rgb(29 78 216)" /></div>
      <form @submit.prevent="handleSubmit">
        <Notification :error="formStatus.error" :success="formStatus.success" />
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <label class="mb-2 block font-bold text-gray-700">Name*</label>
            <input
              type="text"
              v-model="form.name"
              id="name"
              name="name"
              class="w-full rounded border px-3 py-2"
              :disabled="loading || formStatus.submitting"
              required
            />
          </div>
          <div>
            <label class="mb-2 block font-bold text-gray-700">Price*</label>
            <input
              type="text"
              v-model="form.price"
              id="price"
              name="price"
              class="w-full rounded border px-3 py-2"
              :disabled="loading || formStatus.submitting"
              required
            />
          </div>
          <div>
            <label class="mb-2 block font-bold text-gray-700">Category*</label>
            <select
              v-model="form.categoryId"
              id="categoryId"
              name="categoryId"
              class="w-full rounded border px-3 py-2"
              :disabled="loading || formStatus.submitting"
              required
              placeholder="Select Category"
            >
              <option disabled>Select Category</option>
              <option value="1">Flight</option>
              <option value="2">Hotel</option>
              <option value="3">Car Rental</option>
            </select>
          </div>
          <div>
            <label class="mb-2 block font-bold text-gray-700">Date</label>
            <input
              type="date"
              v-model="form.date"
              id="date"
              name="date"
              class="w-full rounded border px-3 py-2"
              :disabled="loading || formStatus.submitting"
            />
          </div>
          <div>
            <label class="mb-2 block font-bold text-gray-700">Location</label>
            <input
              type="text"
              v-model="form.location"
              id="location"
              name="location"
              class="w-full rounded border px-3 py-2"
              :disabled="loading || formStatus.submitting"
            />
          </div>
          <div>
            <label class="mb-2 block font-bold text-gray-700">Status</label>
            <select
              v-model="form.isActive"
              id="isActive"
              name="isActive"
              class="w-full rounded border px-3 py-2"
              :disabled="loading || formStatus.submitting"
              required
              placeholder="Select Category"
            >
              <option disabled value="">Select Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div class="col-span-3">
            <label class="mb-2 block font-bold text-gray-700">Description*</label>
            <textarea
              rows="4"
              v-model="form.description"
              id="description"
              name="description"
              class="w-full rounded border px-3 py-2"
              required
              :disabled="loading || formStatus.submitting"
            />
          </div>

          <div class="col-span-3 flex justify-end">
            <button
              class="focus:shadow-outline w-40 rounded-full bg-blue-500 px-3 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none disabled:opacity-50"
              type="submit"
              :disabled="loading || formStatus.submitting"
            >
              {{ route.params.id ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
      </form>
    </ErrorBoundary>
  </section>
</template>
