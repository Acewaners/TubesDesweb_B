<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { cartState, clearCart } from '@/stores/cartStore'
import { authState } from '@/stores/authStore'

defineOptions({
  name: 'PaymentPage',
})

const router = useRouter()

const cartItems = computed(() => cartState.items)

const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value ?? 0)

const cartSubtotal = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0),
    0,
  ),
)

const shippingCost = 0
const totalPayment = computed(() => cartSubtotal.value + shippingCost)

const orderNumber = ref('')
const countdown = ref(15 * 60) // 15 menit
let timerId = null

const formattedCountdown = computed(() => {
  const m = Math.floor(countdown.value / 60)
    .toString()
    .padStart(2, '0')
  const s = (countdown.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

onMounted(() => {
  // kalau cart kosong, jangan bisa ke halaman ini
  if (cartItems.value.length === 0) {
    router.replace('/cart')
    return
  }

  orderNumber.value = `ORD-${Date.now().toString().slice(-6)}`

  timerId = setInterval(() => {
    if (countdown.value > 0) countdown.value -= 1
  }, 1000)
})

onBeforeUnmount(() => {
  if (timerId) clearInterval(timerId)
})

// ===================
// Simulate Payment -> halaman sukses
const simulatePayment = () => {
  // safety: kalau cart kosong tiba-tiba, lempar ke home
  if (cartItems.value.length === 0) {
    router.push('/')
    return
  }

  // bikin objek order lengkap
  const order = {
    orderNumber: orderNumber.value,
    method: 'QRIS',
    // pakai ISO supaya gampang diparse lagi
    date: new Date().toISOString(),
    totalFormatted: formatCurrency(totalPayment.value),
    total: totalPayment.value,
    status: 'Paid',
    items: cartItems.value.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity ?? 1,
      price: item.price ?? 0,
      image: item.image,
    })),
  }

  // simpan data order terakhir buat dibaca di PaymentSuccessCard
  localStorage.setItem('emotix_last_order', JSON.stringify(order))

  // ====== SIMPAN KE RIWAYAT ORDER PER USER / GUEST ======
  const userEmail = authState.email || null
  const storageKey = userEmail
    ? `emotix_orders_${userEmail}`
    : 'emotix_orders_guest'

  let orders = []
  try {
    const raw = localStorage.getItem(storageKey) || '[]'
    const parsed = JSON.parse(raw)
    orders = Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('[PaymentPage] Failed to parse orders', err)
    orders = []
  }

  // taruh order terbaru di paling atas
  orders.unshift(order)

  try {
    localStorage.setItem(storageKey, JSON.stringify(orders))
  } catch (err) {
    console.error('[PaymentPage] Failed to save orders', err)
  }

  // kosongkan cart & pindah ke halaman sukses
  clearCart()
  router.push('/payment-success')
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-3xl mx-auto px-4 py-10">
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6"
      >
        <!-- Header + countdown -->
        <header class="flex items-center justify-between gap-4">
          <div>
            <h1 class="text-lg md:text-xl font-semibold text-gray-900">
              Complete Your Payment
            </h1>
            <p class="text-xs md:text-sm text-gray-500 mt-1">
              Scan the QR code below to complete your payment.
            </p>
          </div>

          <div
            v-if="countdown > 0"
            class="px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-xs md:text-sm text-yellow-700"
          >
            Complete payment within
            <span class="font-semibold">{{ formattedCountdown }}</span>
          </div>
        </header>

        <!-- Order info -->
        <section class="space-y-3 text-sm md:text-base text-gray-700">
          <div class="flex justify-between">
            <span class="text-gray-500">Order Number</span>
            <span class="font-medium">{{ orderNumber }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Payment Method</span>
            <span class="font-medium">QRIS</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Total Payment</span>
            <span class="font-semibold text-red-500">
              {{ formatCurrency(totalPayment) }}
            </span>
          </div>
        </section>

        <!-- QR dummy -->
        <section class="flex flex-col items-center gap-4">
          <div
            class="w-52 h-52 md:w-64 md:h-64 bg-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center"
          >
            <div class="text-gray-400 text-xs md:text-sm text-center">
              QR CODE<br />
              (dummy)
            </div>
          </div>
          <p class="text-xs md:text-sm text-gray-500 text-center max-w-sm">
            Scan QR Code with your banking app or e-wallet that supports QRIS
            payment.
          </p>
        </section>

        <!-- Instructions -->
        <section class="space-y-2 text-xs md:text-sm text-gray-600">
          <h2 class="font-semibold text-gray-800">Payment Instructions</h2>
          <ol class="list-decimal list-inside space-y-1">
            <li>Open your mobile banking or e-wallet app.</li>
            <li>Select "Scan QR" or "QRIS" menu.</li>
            <li>Scan the QR code shown above.</li>
            <li>Verify the payment amount matches the total.</li>
            <li>Complete the payment in your app.</li>
          </ol>
        </section>

        <!-- Simulate button -->
        <section class="pt-2">
          <button
            type="button"
            @click="simulatePayment"
            class="w-full border border-gray-300 rounded-md px-4 py-2 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Simulate Payment (Demo)
          </button>
        </section>

        <p class="text-xs md:text-sm text-gray-400 text-center">
          This is a demo page. In production, payment will be verified
          automatically.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
