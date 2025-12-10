<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { authState } from '@/stores/authStore'

defineOptions({
  name: 'CancellationsPage',
})

const cancelledOrders = ref([])

const hasCancelled = computed(() => cancelledOrders.value.length > 0)

const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value ?? 0)

const formatDate = (isoString) => {
  if (!isoString) return '-'
  const d = new Date(isoString)
  if (isNaN(d.getTime())) return '-'
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

onMounted(() => {
  const email = authState.email || null
  const key = email
    ? `emotix_cancellations_${email}`
    : 'emotix_cancellations_guest'

  try {
    const raw = localStorage.getItem(key) || '[]'
    const parsed = JSON.parse(raw)
    cancelledOrders.value = Array.isArray(parsed) ? parsed : []
  } catch {
    cancelledOrders.value = []
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-4">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
      My Cancellations
    </h1>
    <p class="text-sm text-gray-500">
      This page shows the orders you have cancelled.
    </p>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <!-- Belum ada cancel -->
      <div v-if="!hasCancelled">
        <p class="text-sm text-gray-600 mb-2">
          You don't have any cancelled orders yet.
        </p>
        <RouterLink
          to="/orders"
          class="inline-block text-xs md:text-sm text-red-500 hover:underline"
        >
          Go to My Orders
        </RouterLink>
      </div>

      <!-- Sudah ada cancel -->
      <div v-else class="space-y-4">
        <div
          v-for="order in cancelledOrders"
          :key="order.orderNumber + (order.cancelledAt || '')"
          class="border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 bg-gray-50"
        >
          <!-- Header order -->
          <div class="flex justify-between items-start gap-4">
            <div>
              <p class="font-semibold text-gray-900">
                Order {{ order.orderNumber }}
              </p>
              <p class="text-xs text-gray-500">
                Ordered on: {{ formatDate(order.date) }}
              </p>
              <p class="text-xs text-gray-500">
                Cancelled on: {{ formatDate(order.cancelledAt) }}
              </p>
            </div>

            <div class="text-right">
              <p class="text-sm font-semibold text-gray-700">
                {{ order.totalFormatted || formatCurrency(order.total) }}
              </p>
              <p class="text-xs font-semibold text-red-500">
                Cancelled
              </p>
            </div>
          </div>

          <!-- List items -->
          <div
            v-if="order.items && order.items.length"
            class="mt-3 space-y-2"
          >
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center gap-3"
            >
              <img
                v-if="item.image"
                :src="item.image"
                alt=""
                class="w-10 h-10 rounded object-cover border border-gray-200"
              />
              <div class="flex-1">
                <p class="text-xs md:text-sm text-gray-900">
                  {{ item.title }}
                </p>
                <p class="text-[11px] text-gray-500">
                  Qty: {{ item.quantity || 1 }} ×
                  {{ formatCurrency(item.price || 0) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
