<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { isAuthenticated } from '@/helpers/utility'

const route = useRoute()
const authenticated = ref(isAuthenticated())
const clientPages = [
  {
    t0: '/',
    name: 'Home'
  },
  {
    t0: '/about',
    name: 'About'
  }
]

const pages = ref(clientPages)
watch(route, () => {
  authenticated.value = isAuthenticated()
  if (isAuthenticated()) {
    let adminPages = [
      {
        t0: '/admin',
        name: 'Dashboard'
      },
      {
        t0: '/admin/products',
        name: 'Products'
      }
    ]
    if (!route.path.includes('/admin')) {
      adminPages = [
        ...clientPages,
        {
          t0: '/admin',
          name: 'Admin'
        }
      ]
    }

    pages.value = adminPages
  }
})

const handleLogout = () => {
  localStorage.clear()
  window.location.replace('/')
}
</script>

<template>
  <nav class="border-b border-blue-500 bg-blue-700">
    <div class="container-xl m-auto lg:container">
      <div class="flex h-16 items-center justify-between px-4">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="mr-4 flex flex-shrink-0 items-center" to="/">
            <span class="hidden text-2xl font-bold text-white max-md:block">ET</span>
            <span class="ml-2 hidden text-2xl font-bold text-white md:block">Easy Travel</span>
          </RouterLink>

          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                v-for="(page, index) in pages"
                :key="index"
                :to="page.t0"
                :class="[
                  route.path === page.t0 ? 'bg-blue-900' : 'hover:bg-blue-600',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md'
                ]"
              >
                {{ page.name }}
              </RouterLink>
              <button
                v-if="authenticated"
                @click="handleLogout"
                class="cursor-pointer rounded-md px-3 py-2 text-white hover:bg-blue-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
