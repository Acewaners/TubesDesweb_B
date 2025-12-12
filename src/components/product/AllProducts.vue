<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/product/ProductCard.vue'
import { products } from '@/data/products'

defineOptions({ name: 'AllProducts' })

const route = useRoute()

// Get category from query param
const category = computed(() => route.query.category || 'Our Products')
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-10">
    <!-- Breadcrumb -->
    <nav class="text-xs md:text-sm text-gray-500">
      <RouterLink to="/" class="hover:underline">Home</RouterLink>
      <span> / </span>
      <span>{{ category }}</span>
      <span> / </span>
      <span class="text-gray-900 font-medium">View All Products</span>
    </nav>

    <div class="text-center space-y-2">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900">All Products</h1>
      <p class="text-gray-500 text-sm md:text-base">
        Jelajahi semua produk yang tersedia di toko kami.
      </p>
    </div>

    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
    >
      <ProductCard
        v-for="item in products"
        :key="item.id"
        :id="item.id"
        :title="item.name"
        :price="item.price"
        :old-price="item.oldPrice"
        :rating="item.rating"
        :reviews="item.reviewsCount"
        :image="item.image"
      />
    </div>
  </section>
</template>
