<script setup>
import AboutLogo from '@/components/about/AboutLogo.vue'
import AboutStorySection from '@/components/about/AboutStorySection.vue'
import AboutStatsGrid from '@/components/about/AboutStatsGrid.vue'

defineOptions({
  name: 'AboutView',
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-10 space-y-10">
      <!-- Logo -->
      <AboutLogo />

      <!-- Our Story -->
      <AboutStorySection />

      <!-- Stats cards -->
      <AboutStatsGrid />
    </div>
  </div>
</template>

<style scoped></style>
