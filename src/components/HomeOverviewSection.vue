<script setup>
import { computed } from 'vue'
import ProductCard from './product/ProductCard.vue'
import { products } from '@/data/products'

defineOptions({
  name: 'HomeOverviewSection',
})

// ID produk yang mau ditampilkan di HOME
// Sesuaikan sendiri kalau kamu ganti / tambah produk
const bestSellingIds = [1, 2, 3, 4]       // cuma 4 item
const exploreIds = [5, 6, 7, 8]           // contoh: 4 item untuk "Explore"

// Ambil data dari products.js berdasarkan ID di atas
const bestSellingProducts = computed(() =>
  products.filter((p) => bestSellingIds.includes(p.id))
)

const exploreProducts = computed(() =>
  products.filter((p) => exploreIds.includes(p.id))
)
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-16">
    <!-- SECTION 1: Best Selling Products -->
    <div>
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-5 h-10 bg-red-500 rounded"></div>
          <span class="text-red-500 font-semibold text-sm md:text-base">This Month</span>
        </div>

        <div class="flex items-center justify-between">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Best Selling Products
          </h2>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <ProductCard
          v-for="product in bestSellingProducts"
          :key="product.id"
          :id="product.id"
          :title="product.name"
          :price="product.price"
          :old-price="product.oldPrice"
          :rating="product.rating"
          :reviews="product.reviewsCount"
          :image="product.image"
        />
      </div>
    </div>

    <!-- SECTION 2: Explore Our Products -->
    <div>
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-5 h-10 bg-red-500 rounded"></div>
          <span class="text-red-500 font-semibold text-sm md:text-base">Our Products</span>
        </div>

        <div class="flex items-center justify-between">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Explore Our Products
          </h2>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <ProductCard
          v-for="product in exploreProducts"
          :key="product.id"
          :id="product.id"
          :title="product.name"
          :price="product.price"
          :old-price="product.oldPrice"
          :rating="product.rating"
          :reviews="product.reviewsCount"
          :image="product.image"
        />
      </div>

      <div class="mt-7 w-full flex justify-center">
        <RouterLink
          :to="{ name: 'all-products', query: { category: 'Our Products' } }"
          class="bg-red-500 hover:bg-red-800 text-white px-6 md:px-8 py-2.5 md:py-3 rounded text-sm md:text-base font-medium transition-colors cursor-pointer"
        >
          View All Products
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Additional styles if needed */
</style>
