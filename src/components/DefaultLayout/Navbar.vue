<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const isActiveLink = (routePath: string) => {
  const route = useRoute()
  return route.path === routePath
}
</script>

<template>
  <nav class="border-b border-blue-500 bg-blue-700">
    <div class="container-xl m-auto lg:container">
      <div class="flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="mr-4 flex flex-shrink-0 items-center" to="/">
            <span class="hidden text-2xl font-bold text-white max-md:block">ET</span>
            <span class="ml-2 hidden text-2xl font-bold text-white md:block">Easy Travel</span>
          </RouterLink>

          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md'
                ]"
              >
                Home
              </RouterLink>
              <RouterLink
                to="/about"
                :class="[
                  isActiveLink('/about') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md'
                ]"
              >
                About
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
