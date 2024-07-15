<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

import Card from '@/components/Card.vue'

const route = useRoute()

const routeQuery = computed(() => {
  return route.query || null
})

const form = reactive({
  customerName: '',
  customerEmail: ''
})

const handleSubmit = async () => {
  //
}
</script>

<template>
  <section class="container-xl m-auto px-4 py-10 lg:container">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
      <Card>
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
                >ABC Product</RouterLink
              >
            </li>
            <li class="mt-2">
              <span class="pr-2 text-gray-600">Price:</span>
              <span class="font-bold">Euro 100.00</span>
            </li>
            <li class="mt-2">
              <span class="pr-2 text-gray-600">Category:</span>
              <span class="font-bold">ABC Category</span>
            </li>
            <li class="mt-2">
              <span class="pr-2 text-gray-600">Location:</span>
              <span class="font-bold">ABC Category</span>
            </li>
          </ul>
        </div>
      </Card>

      <div>
        <Card>
          <form @submit.prevent="handleSubmit">
            <h1 class="mb-5 text-2xl font-bold">Make an Order for: ABC</h1>

            <div class="mb-4">
              <label class="mb-2 block font-bold text-gray-700">Job Listing Name</label>
              <input
                type="text"
                v-model="form.customerName"
                id="customerName"
                name="customerName"
                class="mb-2 w-full rounded border px-3 py-2"
                placeholder="Enter your full name"
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
                required
              />
            </div>

            <div>
              <button
                class="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
                type="submit"
              >
                Place Order
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  </section>
</template>
