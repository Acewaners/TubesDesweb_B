<!-- src/components/reviews/MyReviewsPage.vue -->
<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { authState } from '@/stores/authStore'
import { reviewState, getProductName } from '@/stores/reviewStore'
import { StarIcon } from '@heroicons/vue/24/solid'

defineOptions({
  name: 'MyReviewsPage',
})

// status login
const isLoggedIn = computed(() => authState.isAuthenticated)

// cara kita identifikasi user (HARUS sama dengan di reviewStore.addReview)
const currentUserId = computed(() => {
  if (!authState.isAuthenticated) return null

  const baseUser = authState.user

  return (
    baseUser?.id ||
    authState.email ||
    authState.userName ||
    null
  )
})

// semua review milik user ini
const myReviews = computed(() => {
  if (!currentUserId.value) return []
  return reviewState.reviews.filter(
    (r) => r.userId === currentUserId.value,
  )
})

const hasReviews = computed(() => myReviews.value.length > 0)

const formatDate = (iso) => {
  if (!iso) return '-'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '-'
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-4">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
      My Reviews
    </h1>

    <!-- Belum login -->
    <p v-if="!isLoggedIn" class="text-sm text-gray-500">
      You need to log in to see your reviews.
    </p>

    <!-- Sudah login -->
    <p v-else class="text-sm text-gray-500">
      This page shows the products you have reviewed.
    </p>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <!-- Tidak ada review -->
      <div v-if="isLoggedIn && !hasReviews" class="text-sm text-gray-600">
        <p class="mb-2">
          You haven't written any reviews yet.
        </p>
        <RouterLink
          to="/"
          class="inline-block text-xs md:text-sm text-red-500 hover:underline"
        >
          Browse products
        </RouterLink>
      </div>

      <!-- Ada review -->
      <div v-else-if="isLoggedIn && hasReviews" class="space-y-4">
        <div
          v-for="review in myReviews"
          :key="review.id"
          class="border border-gray-100 rounded-lg p-4 text-sm text-gray-800"
        >
          <!-- Header: nama produk + link -->
          <div class="flex justify-between items-start gap-4 mb-2">
            <div>
              <RouterLink
                :to="{ name: 'product-detail', params: { id: review.productId } }"
                class="font-semibold text-gray-900 hover:text-red-500 hover:underline"
              >
                {{ getProductName(review.productId) }}
              </RouterLink>
              <p class="text-xs text-gray-500">
                {{ formatDate(review.createdAt || review.updatedAt) }}
              </p>
            </div>

            <!-- Rating angka + bintang -->
            <div class="text-right">
              <p class="text-xs text-gray-500">
                Rating: {{ review.rating }} / 5
              </p>
              <div class="flex justify-end mt-1">
                <StarIcon
                  v-for="n in 5"
                  :key="n"
                  class="w-4 h-4"
                  :class="n <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                />
              </div>
            </div>
          </div>

          <!-- Isi komentar -->
          <p class="text-sm text-gray-700">
            {{ review.comment }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
