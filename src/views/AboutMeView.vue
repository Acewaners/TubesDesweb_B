<script setup>
import AboutMeStorySection from '@/components/aboutMe/AboutMeStorySection.vue'
import AboutMeStatsGrid from '@/components/aboutMe/AboutMeStatsGrid.vue'

defineOptions({
  name: 'AboutMeView',
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-10 space-y-10">
      <!-- Our Story -->
      <AboutMeStorySection />

      <!-- Stats cards -->
      <AboutMeStatsGrid />
    </div>
  </div>
</template>

<style scoped></style>
