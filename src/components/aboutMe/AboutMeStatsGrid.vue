<script setup>
import { ref } from 'vue'
import AboutMeStatCard from './AboutMeStatCard.vue'

defineOptions({
  name: 'AboutMeStatsGrid',
})

const stats = [
  { id: 1, value: '85%', label: 'Bisa Menggunakan Microsoft World' },
  { id: 2, value: '80%', label: 'Bisa Menggunakan PowerPoint' },
  { id: 3, value: '90%', label: 'Bekerjasama dengan Tim' },
  { id: 4, value: '85%', label: 'Komunikasi Aktif' },
]

const hoveredStatId = ref(null)

const setHover = (id) => {
  hoveredStatId.value = id
}

const clearHover = () => {
  hoveredStatId.value = null
}
</script>

<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <AboutMeStatCard
      v-for="item in stats"
      :key="item.id"
      :item="item"
      :active="hoveredStatId === item.id"
      @hover="setHover(item.id)"
      @leave="clearHover"
    />
  </section>
</template>

<style scoped></style>
