<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

defineOptions({
  name: 'PaymentSuccessCard',
})

// router buat pindah halaman
const router = useRouter()

// Ambil data order terakhir dari localStorage (kalau ada)
let storedOrder = null
try {
  storedOrder = JSON.parse(localStorage.getItem('emotix_last_order') || 'null')
} catch {
  storedOrder = null
}

const orderNumber = computed(
  () => storedOrder?.orderNumber ?? 'ORD-1762341616096',
)

const paymentMethod = computed(
  () => (storedOrder?.method ?? 'QRIS').toUpperCase(),
)

// Payment date (force English format & fallback-safe)
const paymentDate = computed(() => {
  let dateObj

  if (storedOrder?.date && !isNaN(Date.parse(storedOrder.date))) {
    dateObj = new Date(storedOrder.date)
  } else {
    dateObj = new Date()
  }

  return dateObj.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

// Estimated delivery (+7 days)
const estimatedDelivery = computed(() => {
  let dateObj

  if (storedOrder?.date && !isNaN(Date.parse(storedOrder.date))) {
    dateObj = new Date(storedOrder.date)
  } else {
    dateObj = new Date()
  }

  const deliveryDate = new Date(dateObj.getTime() + 7 * 24 * 60 * 60 * 1000)

  return deliveryDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const totalPaid = computed(
  () => storedOrder?.totalFormatted ?? 'Rp 29.018.400',
)

// ====== BUTTON HANDLERS ======

// Dummy download invoice – jelasin ke user kalau ini cuma demo front-end
const onDownloadInvoice = () => {
  alert(
    'Invoice download is not available in this demo version because the app is front-end only (no backend to generate a real invoice).'
  )
}

// Track Order → halaman My Orders
const goToOrders = () => {
  router.push('/orders')
}
</script>

<template>
  <div class="bg-gray-100 min-h-[calc(100vh-5rem)] py-10">
    <div class="max-w-3xl mx-auto">
      <!-- Card utama -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <!-- Top: icon + pesan sukses -->
        <div class="border-b border-gray-100 px-8 pt-8 pb-6 flex flex-col items-center">
          <div
            class="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4"
          >
            <CheckCircleIcon class="w-9 h-9 text-green-500" />
          </div>
          <p class="text-sm font-semibold text-green-600 mb-1">
            Payment Successful!
          </p>
          <p class="text-sm text-gray-600">
            Thank you for your purchase
          </p>
        </div>

        <!-- Order summary -->
        <div class="px-8 py-6 space-y-6">
          <div>
            <h2 class="text-sm font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <dl class="text-xs md:text-sm text-gray-700 space-y-2">
              <div class="flex justify-between">
                <dt class="text-gray-500">Order Number:</dt>
                <dd class="font-medium">
                  {{ orderNumber }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500">Payment Method:</dt>
                <dd class="font-medium">
                  {{ paymentMethod }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500">Payment Date:</dt>
                <dd class="font-medium">
                  {{ paymentDate }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500">Total Paid:</dt>
                <dd class="font-semibold text-green-600">
                  {{ totalPaid }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Estimated delivery -->
          <div
            class="rounded-md border border-blue-100 bg-blue-50 px-4 py-3 text-xs md:text-sm text-gray-700"
          >
            <p class="font-semibold text-blue-700 mb-1">
              Estimated Delivery
            </p>
            <p class="text-gray-600">
              Your order will arrive by {{ estimatedDelivery }}.
              <br />
              We will send you a tracking number once your order is shipped.
            </p>
          </div>

          <!-- What's next -->
          <div class="space-y-2 text-xs md:text-sm text-gray-700">
            <p class="font-semibold text-gray-900">
              What's Next?
            </p>
            <ul class="space-y-1">
              <li class="flex items-start gap-2">
                <span class="mt-0.5 text-green-500">✔</span>
                <span>We're preparing your items for shipment.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-0.5 text-green-500">✔</span>
                <span>You can track your order in the "My Orders" section.</span>
              </li>
            </ul>
          </div>

          <!-- Buttons: invoice & track -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              class="w-full border border-gray-300 rounded-md px-4 py-2 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              @click="onDownloadInvoice"
            >
              Download Invoice
            </button>
            <button
              type="button"
              class="w-full border border-gray-300 rounded-md px-4 py-2 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              @click="goToOrders"
            >
              Track Order
            </button>
          </div>

          <!-- Bottom buttons -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <RouterLink
              to="/"
              class="w-full text-center rounded-md px-4 py-2 text-xs md:text-sm font-medium text-white hover:bg-gray-900 transition-colors"
              style="background-color:#111827"
            >
              Back to Home
            </RouterLink>

          </div>

          <p class="text-[11px] md:text-xs text-gray-500 text-center pt-4 pb-2">
            Need help?
            <a href="#" class="text-blue-600 hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
