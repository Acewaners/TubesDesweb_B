<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar -->
    <TheNavbar />

    <!-- Main Content -->
    <main class="grow">
      <RouterView />
    </main>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>
