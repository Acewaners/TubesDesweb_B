<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'
import { products } from '@/data/products'
import { reviewState } from '@/stores/reviewStore'

defineOptions({ name: 'ProductDetail' })

const route = useRoute()
const router = useRouter()
const productId = computed(() => Number(route.params.id))

// Ambil produk berdasarkan ID
const product = computed(() =>
  products.find((p) => Number(p.id) === productId.value)
)

// Breadcrumb
const breadcrumbCategory = computed(() => {
  if (product.value?.isBestSelling) return 'Best Selling Products'
  return 'Our Products'
})

// Reviews asli dari store
const productReviews = computed(() =>
  reviewState.reviews.filter(r => Number(r.productId) === productId.value)
)

const reviewsCount = computed(() => productReviews.value.length)

// Average rating berdasarkan review nyata
const averageRating = computed(() => {
  if (!productReviews.value.length) return 0
  const sum = productReviews.value.reduce(
    (acc, r) => acc + Number(r.rating || 0),
    0
  )
  return Number((sum / productReviews.value.length).toFixed(1))
})

// Arahkan ke halaman review
const goToProductReviews = () => {
  if (!product.value) return
  router.push({
    name: 'product-reviews',
    params: { id: productId.value }
  })
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10">
    <!-- Breadcrumb -->
    <nav class="text-xs text-gray-500 mb-4">
      <RouterLink to="/" class="hover:underline">Home</RouterLink>
      <span> / </span>
      <span>{{ breadcrumbCategory }}</span>
      <span> / </span>
      <span class="text-gray-900 font-medium">{{ product?.name }}</span>
    </nav>

    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- Gambar -->
      <div class="space-y-4">
        <div class="bg-gray-100 rounded-xl flex items-center justify-center p-6">
          <img :src="product.image" :alt="product.name" class="w-full h-full object-contain" />
        </div>
      </div>

      <!-- Detail -->
      <div class="space-y-4">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
          {{ product.name }}
        </h1>

        <!-- Rating & review count -->
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <!-- Bintang -->
            <div class="flex items-center">
              <StarIcon
                v-for="n in 5"
                :key="n"
                class="w-4 h-4"
                :class="n <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'"
              />
            </div>

            <!-- Angka rating -->
            <span>{{ averageRating.toFixed(1) }} • {{ reviewsCount }} Reviews</span>
          </div>

          <!-- Tombol menuju halaman review -->
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="goToProductReviews"
          >
            <ChatBubbleLeftRightIcon class="w-5 h-5" />
            <span>See Reviews ({{ reviewsCount }})</span>
          </button>
        </div>

        <!-- Harga -->
        <div class="flex items-center gap-3">
          <span class="text-2xl font-semibold text-red-500">
            Rp. {{ product.price.toLocaleString('id-ID') }}
          </span>

          <span
            v-if="product.oldPrice"
            class="text-gray-400 line-through text-lg"
          >
            Rp. {{ product.oldPrice.toLocaleString('id-ID') }}
          </span>
        </div>

        <!-- Deskripsi -->
        <div class="prose prose-sm text-gray-700 whitespace-pre-line">
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-500">
      Product not found.
    </div>
  </div>
</template>
