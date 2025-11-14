<script setup>
import { HeartIcon, EyeIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'

defineOptions({
  name: 'ProductCard',
})

defineProps({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: [String, Number],
    required: true,
  },
  oldPrice: {
    type: [String, Number],
    default: null,
  },
  rating: {
    type: Number,
    default: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '/airpods.png',
  },
})
</script>

<template>
  <div
    class="bg-gray-100 rounded-lg p-4 relative group hover:shadow-md transition-shadow overflow-hidden"
  >
    <!-- Wishlist & Eye Icons -->
    <div class="absolute top-3 right-3 flex flex-col space-y-2 z-10">
      <button class="bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors">
        <HeartIcon class="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
      </button>
      <button class="bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors">
        <EyeIcon class="w-5 h-5 text-gray-600 hover:text-black transition-colors" />
      </button>
    </div>

    <!-- Product Image Container -->
    <div class="relative">
      <!-- Product Image -->
      <div class="aspect-square flex items-center justify-center py-4">
        <img :src="image" :alt="title" class="w-full h-full object-contain" />
      </div>

      <!-- Add to Cart Button (appears on hover with animation) -->
      <div
        class="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out"
      >
        <button
          class="w-full cursor-pointer bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Add To Cart
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="space-y-2 mt-4">
      <!-- Product Title -->
      <h3 class="font-medium text-sm md:text-base line-clamp-2 min-h-10">
        {{ title }}
      </h3>

      <!-- Price -->
      <div class="flex items-center gap-3">
        <span class="text-red-500 font-semibold text-base md:text-lg">${{ price }}</span>
        <span v-if="oldPrice" class="text-gray-400 line-through text-sm">${{ oldPrice }}</span>
      </div>

      <!-- Rating -->
      <div class="flex items-center gap-2">
        <div class="flex items-center">
          <StarIcon v-for="star in 5" :key="star" class="w-4 h-4 text-yellow-400" />
        </div>
        <span class="text-gray-500 text-sm">({{ reviews }})</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
