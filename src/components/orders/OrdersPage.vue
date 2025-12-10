<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { authState } from '@/stores/authStore'

defineOptions({ name: 'OrdersPage' })

const orders = ref([])
const ordersKey = ref(null)
const hasOrders = computed(() => orders.value.length > 0)

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

const formatEstimated = (isoString) => {
  if (!isoString) return '-'
  const d = new Date(isoString)
  if (isNaN(d.getTime())) return '-'
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ==== LOAD & SAVE ORDERS ====

function loadOrders() {
  const email = authState.email || null
  const key = email ? `emotix_orders_${email}` : 'emotix_orders_guest'
  ordersKey.value = key

  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      orders.value = []
      return
    }

    const parsed = JSON.parse(raw)
    orders.value = Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('[OrdersPage] Failed to load orders', err)
    orders.value = []
  }
}

function saveOrders() {
  if (!ordersKey.value) return
  try {
    localStorage.setItem(ordersKey.value, JSON.stringify(orders.value))
  } catch (err) {
    console.error('[OrdersPage] Failed to save orders', err)
  }
}

// ==== CONFIRM DELIVERED ====

function confirmDelivered(orderNumber) {
  const order = orders.value.find((o) => o.orderNumber === orderNumber)
  if (!order) return

  const ok = window.confirm('Confirm that you have received this order?')
  if (!ok) return

  order.status = 'Delivered'
  order.deliveredAt = new Date().toISOString()

  saveOrders()
}

// ==== CANCEL ORDER ====

function cancelOrder(orderNumber) {
  const idx = orders.value.findIndex((o) => o.orderNumber === orderNumber)
  if (idx === -1) return

  const confirmCancel = window.confirm('Are you sure you want to cancel this order?')
  if (!confirmCancel) return

  const [order] = orders.value.splice(idx, 1)
  saveOrders()

  const email = authState.email || null
  const cancelKey = email
    ? `emotix_cancellations_${email}`
    : 'emotix_cancellations_guest'

  let cancelledList = []
  try {
    const raw = localStorage.getItem(cancelKey) || '[]'
    const parsed = JSON.parse(raw)
    cancelledList = Array.isArray(parsed) ? parsed : []
  } catch {
    cancelledList = []
  }

  cancelledList.unshift({
    ...order,
    status: 'Cancelled',
    cancelledAt: new Date().toISOString(),
  })

  try {
    localStorage.setItem(cancelKey, JSON.stringify(cancelledList))
  } catch (err) {
    console.error('[OrdersPage] Failed to save cancellations', err)
  }
}

onMounted(() => loadOrders())
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-4">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
    <p class="text-sm text-gray-500">Here you can see your recent orders.</p>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <!-- Belum ada order -->
      <div v-if="!hasOrders">
        <p class="text-sm text-gray-600 mb-2">You don't have any orders yet.</p>
        <RouterLink
          to="/"
          class="inline-block text-xs md:text-sm text-red-500 hover:underline"
        >
          Continue shopping
        </RouterLink>
      </div>

      <!-- Sudah ada order -->
      <div v-else class="space-y-4">
        <div
          v-for="order in orders"
          :key="order.orderNumber"
          class="border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700"
        >
          <!-- Header order -->
          <div class="flex justify-between items-start gap-4">
            <div>
              <p class="font-semibold text-gray-900">
                Order {{ order.orderNumber }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatDate(order.date) }} ·
                {{ (order.method || 'QRIS').toUpperCase() }}
              </p>
              <p
                v-if="order.estimatedDelivery"
                class="text-xs text-gray-500"
              >
                Estimated arrival:
                {{ formatEstimated(order.estimatedDelivery) }}
              </p>
            </div>

            <div class="text-right">
              <p class="text-sm font-semibold text-green-600">
                {{ order.totalFormatted || formatCurrency(order.total) }}
              </p>
              <span
                class="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium"
                :class="{
                  'bg-yellow-100 text-yellow-700': order.status === 'Paid',
                  'bg-blue-100 text-blue-700': order.status === 'Shipped',
                  'bg-green-100 text-green-700': order.status === 'Delivered',
                  'bg-red-100 text-red-600': order.status === 'Cancelled'
                }"
              >
                {{ order.status || 'Paid' }}
              </span>
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

          <!-- Bottom action buttons -->
          <div
            v-if="(order.status || 'Paid') !== 'Cancelled'"
            class="mt-3 flex flex-wrap gap-2 justify-end"
          >
            <!-- Confirm received: hanya kalau masih Paid -->
            <button
              v-if="order.status === 'Paid'"
              type="button"
              class="px-3 py-1 rounded border border-gray-300
                     text-[11px] font-medium text-gray-700
                     hover:bg-gray-50 transition-colors"
              @click="confirmDelivered(order.orderNumber)"
            >
              Confirm received
            </button>

            <!-- Cancel only if still Paid -->
            <button
              v-if="order.status === 'Paid'"
              type="button"
              class="px-3 py-1 rounded border border-red-400
                     text-[11px] font-medium text-red-500
                     hover:bg-red-50 transition-colors"
              @click="cancelOrder(order.orderNumber)"
            >
              Cancel order
            </button>

            <!-- Write Review: hanya saat Delivered -->
            <template v-if="order.status === 'Delivered'">
              <RouterLink
                v-for="item in order.items"
                :key="item.id"
                :to="{ name: 'product-reviews', params: { id: item.id } }"
                class="px-3 py-1 rounded border border-teal-400
                       text-[11px] font-medium text-teal-600
                       hover:bg-teal-50 transition-colors"
              >
                Write review for {{ item.title }}
              </RouterLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
