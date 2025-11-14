<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import ProductCard from './ProductCard.vue'

defineOptions({
  name: 'HomeOverviewSection',
})

// Best Selling Products Data
const bestSellingProducts = [
  {
    id: 1,
    title: 'The north coat',
    price: 260,
    oldPrice: 360,
    rating: 5,
    reviews: 65,
    image: '/airpods.png',
  },
  {
    id: 2,
    title: 'Gucci duffle bag',
    price: 960,
    oldPrice: 1160,
    rating: 5,
    reviews: 65,
    image: '/airpods.png',
  },
  {
    id: 3,
    title: 'RGB liquid CPU Cooler',
    price: 160,
    oldPrice: 170,
    rating: 5,
    reviews: 65,
    image: '/airpods.png',
  },
  {
    id: 4,
    title: 'Small BookSelf',
    price: 360,
    oldPrice: null,
    rating: 5,
    reviews: 65,
    image: '/airpods.png',
  },
]

// Explore Our Products Data
const exploreProducts = [
  {
    id: 1,
    title: 'Breed Dry Dog Food',
    price: 100,
    oldPrice: null,
    rating: 5,
    reviews: 35,
    image: '/airpods.png',
  },
  {
    id: 2,
    title: 'CANON EOS DSLR Camera',
    price: 360,
    oldPrice: null,
    rating: 5,
    reviews: 95,
    image: '/airpods.png',
  },
  {
    id: 3,
    title: 'ASUS FHD Gaming Laptop',
    price: 700,
    oldPrice: null,
    rating: 5,
    reviews: 325,
    image: '/airpods.png',
  },
  {
    id: 4,
    title: 'Curology Product Set',
    price: 500,
    oldPrice: null,
    rating: 5,
    reviews: 145,
    image: '/airpods.png',
  },
  {
    id: 5,
    title: 'Kids Electric Car',
    price: 960,
    oldPrice: null,
    rating: 5,
    reviews: 65,
    image: '/airpods.png',
  },
  {
    id: 6,
    title: 'Jr. Zoom Soccer Cleats',
    price: 1160,
    oldPrice: null,
    rating: 5,
    reviews: 35,
    image: '/airpods.png',
  },
  {
    id: 7,
    title: 'GP11 Shooter USB Gamepad',
    price: 660,
    oldPrice: null,
    rating: 5,
    reviews: 55,
    image: '/airpods.png',
  },
  {
    id: 8,
    title: 'Quilted Satin Jacket',
    price: 660,
    oldPrice: null,
    rating: 5,
    reviews: 55,
    image: '/airpods.png',
  },
]
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-16">
    <!-- SECTION 1: Best Selling Products -->
    <div>
      <!-- Header -->
      <div class="mb-8">
        <!-- Label with red indicator -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-5 h-10 bg-red-500 rounded"></div>
          <span class="text-red-500 font-semibold text-sm md:text-base">This Month</span>
        </div>

        <!-- Title & Button -->
        <div class="flex items-center justify-between">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Best Selling Products
          </h2>
          <button
            class="bg-red-500 hover:bg-red-800 text-white px-6 md:px-8 py-2.5 md:py-3 rounded text-sm md:text-base font-medium transition-colors cursor-pointer"
          >
            View All
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <ProductCard
          v-for="product in bestSellingProducts"
          :key="product.id"
          :title="product.title"
          :price="product.price"
          :old-price="product.oldPrice"
          :rating="product.rating"
          :reviews="product.reviews"
          :image="product.image"
        />
      </div>
    </div>

    <!-- SECTION 2: Explore Our Products -->
    <div>
      <!-- Header -->
      <div class="mb-8">
        <!-- Label with red indicator -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-5 h-10 bg-red-500 rounded"></div>
          <span class="text-red-500 font-semibold text-sm md:text-base">Our Products</span>
        </div>

        <!-- Title & Navigation -->
        <div class="flex items-center justify-between">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Explore Our Products
          </h2>

          <!-- Navigation Buttons -->
          <div class="flex items-center gap-2">
            <button
              class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeftIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <button
              class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRightIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <ProductCard
          v-for="product in exploreProducts"
          :key="product.id"
          :title="product.title"
          :price="product.price"
          :old-price="product.oldPrice"
          :rating="product.rating"
          :reviews="product.reviews"
          :image="product.image"
        />
      </div>

      <div class="mt-7 w-full flex justify-center">
        <button
          class="bg-red-500 hover:bg-red-800 text-white px-6 md:px-8 py-2.5 md:py-3 rounded text-sm md:text-base font-medium transition-colors cursor-pointer"
        >
          View All Products
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Additional styles if needed */
</style>
