// src/stores/reviewStore.js
import { reactive } from 'vue'
import { authState } from './authStore'
import { products } from '@/data/products'

export const reviewState = reactive({
  reviews: [
    {
      id: 1,
      productId: 3,
      userId: 1,
      userName: 'Ahmad Rizki',
      rating: 5,
      comment:
        'Gamepad ini luar biasa responsif, nyaman dipakai, dan cocok banget buat game kompetitif.',
      createdAt: '2025-01-01T10:00:00Z',
    },
  ],
})

// helper kecil buat ambil identitas user saat ini
function getCurrentUser() {
  const baseUser = authState.user

  const userName =
    baseUser?.name ||
    authState.userName || // dari state lama
    authState.email || // fallback terakhir
    'Guest User'

  const userId =
    baseUser?.id ||
    authState.email ||
    authState.userName ||
    0

  return { userId, userName }
}

// tambah review baru
export const addReview = ({ productId, rating, comment }) => {
  if (!authState.isAuthenticated) {
    throw new Error('NOT_AUTHENTICATED')
  }

  const { userId, userName } = getCurrentUser()

  reviewState.reviews.unshift({
    id: Date.now(),
    productId: Number(productId),      // pastikan number
    userId,
    userName,
    rating: Number(rating) || 0,       // pastikan number
    comment,
    createdAt: new Date().toISOString(),
  })
}

// update review yang sudah ada (dipakai saat Edit)
export const updateReview = ({ productId, rating, comment }) => {
  if (!authState.isAuthenticated) {
    throw new Error('NOT_AUTHENTICATED')
  }

  const { userId } = getCurrentUser()

  const target = reviewState.reviews.find(
    (r) => r.userId === userId && Number(r.productId) === Number(productId),
  )

  if (!target) {
    throw new Error('REVIEW_NOT_FOUND')
  }

  target.rating = Number(rating) || 0
  target.comment = comment
  target.updatedAt = new Date().toISOString()
}

// helper: ambil nama produk (biar My Reviews bisa nunjukin nama produknya)
export const getProductName = (productId) => {
  const product = products.find((p) => Number(p.id) === Number(productId))
  return product?.name || 'Unknown Product'
}
