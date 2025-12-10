<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { products } from '@/data/products'
import { reviewState, addReview, updateReview } from '@/stores/reviewStore'
import { authState } from '@/stores/authStore'

defineOptions({ name: 'ProductReviews' })

const route = useRoute()
const productId = computed(() => Number(route.params.id))

// Product data
const product = computed(() =>
  products.find((p) => Number(p.id) === productId.value),
)

// Breadcrumb: Best Selling / Our Products
const breadcrumbCategory = computed(() => {
  if (product.value?.isBestSelling) return 'Best Selling Products'
  return 'Our Products'
})

// All reviews for this product
const productReviews = computed(() =>
  reviewState.reviews.filter((r) => Number(r.productId) === productId.value),
)

// Count & average
const reviewsCount = computed(() => productReviews.value.length)
const averageRating = computed(() => {
  if (!productReviews.value.length) return 0
  const sum = productReviews.value.reduce(
    (acc, r) => acc + Number(r.rating || 0),
    0,
  )
  return Number((sum / productReviews.value.length).toFixed(1))
})

// Auth checks
const currentUserId = computed(() => {
  if (!authState.isAuthenticated) return null
  const baseUser = authState.user
  return baseUser?.id || authState.email || authState.userName || null
})

// User's own review (if any)
const myReview = computed(() => {
  if (!currentUserId.value) return null
  return (
    productReviews.value.find((r) => r.userId === currentUserId.value) || null
  )
})
const userAlreadyReviewed = computed(() => !!myReview.value)

// Purchase verification
const canWriteReview = computed(() => {
  if (!authState.isAuthenticated) return false
  const email = authState.email || null
  const key = email ? `emotix_orders_${email}` : 'emotix_orders_guest'

  try {
    const raw = localStorage.getItem(key)
    if (!raw) return false
    const orders = JSON.parse(raw)
    if (!Array.isArray(orders)) return false

    return orders.some(
      (order) =>
        order.status === 'Delivered' &&
        Array.isArray(order.items) &&
        order.items.some((item) => Number(item.id) === productId.value),
    )
  } catch {
    return false
  }
})

// Form states
const ratingInput = ref(5)
const commentInput = ref('')
const isEditing = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Sync form with user's existing review
watch(
  myReview,
  (val) => {
    if (val) {
      ratingInput.value = val.rating
      commentInput.value = val.comment
    } else {
      ratingInput.value = 5
      commentInput.value = ''
    }
    isEditing.value = false
  },
  { immediate: true },
)

// Actions
const startEditing = () => {
  if (!myReview.value) return
  isEditing.value = true
}

const handleSubmit = () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!authState.isAuthenticated) {
    errorMessage.value = 'Please login before writing a review.'
    return
  }

  if (!commentInput.value.trim()) {
    errorMessage.value = 'Comment cannot be empty.'
    return
  }

  try {
    if (userAlreadyReviewed.value) {
      updateReview({
        productId: productId.value,
        rating: Number(ratingInput.value),
        comment: commentInput.value.trim(),
      })
      successMessage.value = 'Your review has been updated.'
    } else {
      if (!canWriteReview.value) {
        errorMessage.value =
          'You can only review products you have purchased and received (Delivered).'
        return
      }
      addReview({
        productId: productId.value,
        rating: Number(ratingInput.value),
        comment: commentInput.value.trim(),
      })
      successMessage.value = 'Review submitted successfully.'
    }
    isEditing.value = false
  } catch (err) {
    console.error(err)
    errorMessage.value = 'An error occurred while saving your review.'
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-6">
    <!-- Breadcrumb -->
    <nav class="text-xs text-gray-500 mb-4">
      <RouterLink to="/" class="hover:underline">Home</RouterLink>
      <span> / </span>
      <span>{{ breadcrumbCategory }}</span>
      <span> / </span>
      <RouterLink
        :to="`/products/${product?.id}`"
        class="hover:underline"
      >
        {{ product?.name }}
      </RouterLink>
      <span> / </span>
      <span class="text-gray-900 font-medium">Reviews</span>
    </nav>

    <!-- Header -->
    <div class="space-y-1">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
        {{ product?.name }}
      </h1>
      <p class="text-sm text-gray-500">
        {{ reviewsCount }} Reviews • Average {{ averageRating }} / 5
      </p>
    </div>

    <!-- Overall Rating -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 class="text-sm font-semibold text-gray-900 mb-2">Overall Rating</h2>
      <p class="text-4xl font-bold text-gray-900">
        {{ averageRating.toFixed(1) }}
        <span class="text-base font-normal text-gray-500">/ 5</span>
      </p>
      <p class="text-xs text-gray-500 mt-1">
        Based on {{ reviewsCount }} customer reviews.
      </p>
    </div>

    <!-- Review Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <h2 class="text-sm font-semibold text-gray-900">Customer Reviews</h2>

      <!-- Messages -->
      <p v-if="successMessage" class="text-xs text-green-600">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="text-xs text-red-500">
        {{ errorMessage }}
      </p>

      <!-- User's review (view mode) -->
      <div
        v-if="userAlreadyReviewed && !isEditing && myReview"
        class="border rounded-md p-3 bg-gray-50 text-sm"
      >
        <div class="flex items-center justify-between mb-1">
          <p class="font-semibold">{{ myReview.userName }}</p>
          <p class="text-xs text-gray-500">Rating: {{ myReview.rating }} / 5</p>
        </div>
        <p class="text-gray-700 mb-2">{{ myReview.comment }}</p>
        <button
          type="button"
          class="px-3 py-1 rounded border border-gray-300 text-xs text-gray-700 hover:bg-gray-100"
          @click="startEditing"
        >
          Edit Review
        </button>
      </div>

      <!-- Info kalau user TIDAK boleh review -->
      <p
        v-if="!authState.isAuthenticated"
        class="text-xs text-gray-500"
      >
        Please login to write a review.
      </p>
      <p
        v-else-if="!canWriteReview && !userAlreadyReviewed"
        class="text-xs text-gray-500"
      >
        You can only review products you have purchased and received (Delivered).
      </p>

      <!-- Review form (add / edit) -->
      <form
        v-if="(canWriteReview && !userAlreadyReviewed) || isEditing"
        @submit.prevent="handleSubmit"
        class="space-y-3"
      >
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700">Rating</label>
          <select
            v-model="ratingInput"
            class="border rounded-md text-sm px-2 py-1"
          >
            <option v-for="n in 5" :key="n" :value="n">{{ n }} / 5</option>
          </select>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">Comment</label>
          <textarea
            v-model="commentInput"
            rows="3"
            placeholder="Write your experience with this product..."
            class="w-full border rounded-md px-3 py-2 text-sm"
          ></textarea>
        </div>

        <button
          type="submit"
          class="px-4 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 transition"
        >
          {{ userAlreadyReviewed ? 'Update Review' : 'Submit Review' }}
        </button>
      </form>

      <!-- All Reviews -->
      <div class="space-y-3 pt-4 border-t border-gray-100">
        <div
          v-for="review in productReviews"
          :key="review.id"
          class="text-sm text-gray-800"
        >
          <p class="font-semibold">{{ review.userName }}</p>
          <p class="text-xs text-gray-500">Rating: {{ review.rating }} / 5</p>
          <p class="text-sm text-gray-700">{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
