<script lang="ts" setup>
import { reactive } from 'vue'

import router from '@/router'
import Card from '@/components/Card.vue'

const form = reactive({
  username: '',
  password: ''
})
const formStatus = reactive({
  loading: false,
  success: '',
  error: ''
})

const handleSubmit = async () => {
  formStatus.error = ''
  formStatus.success = ''
  formStatus.loading = true

  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (form.username === 'admin' && form.password === 'admin') {
    localStorage.setItem('easyTravel', JSON.stringify({ authenticated: true }))
    router.push(`/admin`)
  } else {
    formStatus.error = 'Incorrect credentials'
    formStatus.loading = false
  }
}
</script>

<template>
  <section class="container-xl m-auto px-4 py-10 lg:container">
    <div class="flex min-h-[calc(100dvh-13.1rem)] flex-col items-center justify-center">
      <div class="w-[400px] max-w-full">
        <Card>
          <form @submit.prevent="handleSubmit" :disabled="formStatus.loading">
            <h1 class="mb-5 text-center text-2xl font-bold">Admin Login</h1>
            <div
              v-if="formStatus.error"
              class="mb-4 rounded-lg border-[1px] border-red-200 bg-red-100 px-3 py-2 text-xs text-red-800"
            >
              {{ formStatus.error }}
            </div>

            <div class="mb-4">
              <label class="mb-2 block font-bold text-gray-700">Username</label>
              <input
                type="text"
                v-model="form.username"
                id="username"
                name="username"
                class="mb-2 w-full rounded border px-3 py-2"
                :disabled="formStatus.loading"
                required
              />
            </div>
            <div class="mb-4">
              <label class="mb-2 block font-bold text-gray-700">Password</label>
              <input
                type="password"
                v-model="form.password"
                id="password"
                name="password"
                class="mb-2 w-full rounded border px-3 py-2"
                :disabled="formStatus.loading"
                required
              />
            </div>

            <div>
              <button
                class="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none disabled:opacity-50"
                type="submit"
                :disabled="formStatus.loading"
              >
                {{ formStatus.loading ? 'Please Wait...' : 'Login' }}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  </section>
</template>
