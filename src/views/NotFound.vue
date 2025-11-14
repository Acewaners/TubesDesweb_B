<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
    <!-- Breadcrumb -->
    <div class="text-left mb-12">
      <p class="text-sm text-gray-500 font-light">
        <RouterLink to="/" class="hover:text-gray-700 transition-colors">Home</RouterLink>
        <span class="mx-2">/</span>
        <span>404 Error</span>
      </p>
    </div>

    <!-- Main Content (Centered) -->
    <div class="text-center space-y-6 py-10">
      <!-- 404 Title -->
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-black">404 Not Found</h1>

      <!-- Subtext -->
      <p class="text-gray-500 text-base md:text-lg max-w-md mx-auto">
        Your visited page not found. You may go home page.
      </p>

      <!-- Back to Home Button -->
      <div class="pt-6">
        <RouterLink
          to="/"
          class="inline-block bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
        >
          Back to home page
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
