<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { wishlistState, removeFromWishlist } from '@/stores/wishlistStore'
import { addToCart } from '@/stores/cartStore'

defineOptions({
  name: 'WishlistPage',
})

const items = computed(() => wishlistState.items)

const formatCurrency = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(v ?? 0)

const handleAddToCart = (item) => {
  addToCart({
    id: item.id,
    title: item.title,
    price: Number(item.price),
    image: item.image,
  })
}

const handleRemove = (id) => {
  removeFromWishlist(id)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-4">

    <!-- Breadcrumb -->
    <p class="text-xs md:text-sm text-gray-500">
      <RouterLink to="/" class="text-gray-400 hover:text-red-500 transition">
        Home
      </RouterLink>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-900 font-medium">Wishlist</span>
    </p>

    <!-- Heading -->
    <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">My Wishlist</h1>

    <!-- EMPTY -->
    <div
      v-if="items.length === 0"
      class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <p class="text-xs sm:text-sm text-gray-600 mb-1">
        You don't have a wishlist yet
      </p>
      <RouterLink to="/" class="text-red-500 hover:underline text-xs sm:text-sm">
        Shop Now!
      </RouterLink>
    </div>

    <!-- HAS ITEMS -->
    <div
      v-else
      class="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="flex flex-col gap-3 px-4 sm:px-6 py-4 text-xs sm:text-sm md:text-base"
      >
        <div class="flex items-center gap-2 sm:gap-3">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
          />

          <div>
            <p class="text-gray-800 text-xs sm:text-sm md:text-base font-medium">{{ item.title }}</p>
            <p class="text-gray-500 text-xs sm:text-sm">{{ formatCurrency(item.price) }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            type="button"
            class="px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded text-xs sm:text-sm md:text-base text-gray-700 hover:bg-gray-100 transition whitespace-nowrap"
            @click="handleAddToCart(item)"
          >
            Add to Cart
          </button>

          <button
            type="button"
            class="px-2 sm:px-3 py-1 sm:py-1.5 border border-red-400 rounded text-xs sm:text-sm md:text-base text-red-500 hover:bg-red-50 transition whitespace-nowrap"
            @click="handleRemove(item.id)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
