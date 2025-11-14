<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <TheNavbar />

    <!-- Main Content -->
    <main>
      <RouterView />
    </main>
  </div>
</template>
