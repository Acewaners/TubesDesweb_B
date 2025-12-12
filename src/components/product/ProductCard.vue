<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { HeartIcon, EyeIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'
import { addToCart } from '@/stores/cartStore'
import { authState } from '@/stores/authStore'
import { toggleWishlist } from '@/stores/wishlistStore'
import { reviewState } from '@/stores/reviewStore'

defineOptions({
  name: 'ProductCard',
})

const router = useRouter()

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
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
  image: {
    type: String,
    default: '/airpods.png',
  },
})

// =====================
//  REVIEW DATA (REAL TIME)
// =====================

// Semua review produk ini
const productReviews = computed(() =>
  reviewState.reviews.filter((r) => Number(r.productId) === Number(props.id)),
)

// Jumlah review asli
const reviewsCount = computed(() => productReviews.value.length)

// Average rating dari review nyata
const averageRating = computed(() => {
  if (!productReviews.value.length) return 0
  const sum = productReviews.value.reduce(
    (acc, r) => acc + Number(r.rating || 0),
    0,
  )
  return Number((sum / productReviews.value.length).toFixed(1))
})

// =====================
// ADD TO CART
// =====================
const handleAddToCart = () => {
  if (!authState.isAuthenticated) {
    router.push({
      path: '/signup',
      query: { redirect: router.currentRoute.value.fullPath },
    })
    return
  }

  addToCart({
    id: props.id,
    title: props.title,
    price: Number(props.price),
    image: props.image,
  })
}

// =====================
// WISHLIST (fungsi jalan, ikon tidak ikut state)
// =====================
const handleToggleWishlist = () => {
  if (!authState.isAuthenticated) {
    router.push({
      path: '/signup',
      query: { redirect: router.currentRoute.value.fullPath },
    })
    return
  }

  toggleWishlist({
    id: props.id,
    title: props.title,
    price: Number(props.price),
    image: props.image,
  })
}

// =====================
// DETAIL PAGE REDIRECT
// =====================
const goToProductDetail = () => {
  router.push({
    name: 'product-detail',
    params: { id: props.id },
  })
}
</script>

<template>
  <div
    class="bg-gray-100 rounded-lg p-4 relative group hover:shadow-md transition-shadow overflow-hidden"
  >
    <!-- Wishlist & Eye Icons -->
    <div class="absolute top-3 right-3 flex flex-col space-y-2 z-10">
      <!-- HEART: toggle wishlist (ikon tetap abu-abu, hanya hover yang merah) -->
      <button
        class="bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors"
        @click.stop="handleToggleWishlist"
      >
        <HeartIcon
          class="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors"
        />
      </button>

      <!-- EYE: Product Detail -->
      <button
        class="bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors"
        @click.stop="goToProductDetail"
      >
        <EyeIcon class="w-5 h-5 text-gray-600 hover:text-black transition-colors" />
      </button>
    </div>

    <!-- Product Image -->
    <div class="relative">
      <div class="aspect-square flex items-center justify-center py-4">
        <img :src="image" :alt="title" class="w-full h-full object-contain" />
      </div>

      <div
        class="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out"
      >
        <button
          class="w-full cursor-pointer bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
          @click.stop="handleAddToCart"
        >
          Add To Cart
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="space-y-2 mt-4">
      <h3 class="font-medium text-sm md:text-base line-clamp-2 min-h-10">
        {{ title }}
      </h3>

      <!-- Price Section: Desktop/Tablet horizontal, Mobile vertical -->
      <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
        <span class="text-red-500 font-semibold text-lg md:text-lg sm:text-base">
          Rp. {{ Number(price).toLocaleString('id-ID') }}
        </span>
        <span v-if="oldPrice" class="text-gray-400 line-through text-xs md:text-sm">
          Rp. {{ Number(oldPrice).toLocaleString('id-ID') }}
        </span>
      </div>

      <!-- RATING + REVIEW COUNT REAL TIME -->
      <div class="flex items-center gap-2">
        <div class="flex items-center">
          <StarIcon
            v-for="star in 5"
            :key="star"
            class="w-4 h-4"
            :class="star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'"
          />
        </div>
        <span class="text-gray-500 text-sm">({{ reviewsCount }})</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
