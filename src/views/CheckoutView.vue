<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { cartState } from '@/stores/cartStore'

import BillingForm from '@/components/checkout/BillingForm.vue'
import OrderSummary from '@/components/checkout/OrderSummary.vue'
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector.vue'
import CouponSection from '@/components/checkout/CouponSection.vue'

defineOptions({
  name: 'CheckoutView',
})

// router untuk pindah ke halaman pembayaran
const router = useRouter()

// semua item di cart
const cartItems = computed(() => cartState.items)

// HANYA item yang dicentang yang ikut checkout
const checkoutItems = computed(() =>
  cartItems.value.filter((item) => item.selected !== false),
)

// billing data dibungkus jadi satu object (dipakai v-model di BillingForm)
const billingData = ref({
  firstName: '',      // di UI labelnya Full Name
  companyName: '',
  streetAddress: '',
  apartment: '',
  city: '',
  phoneNumber: '',
  saveInfo: true,
})

// payment
const paymentMethod = ref('qris')

// coupon
const couponCode = ref('')
const couponMessage = ref('')

// format uang
const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value ?? 0)

// ---------- VALIDASI NOMOR HP ----------
const validatePhoneNumber = () => {
  const value = billingData.value.phoneNumber.trim()
  // 08 + 10 digit berikutnya = 12 digit total
  const regex = /^08\d{10}$/

  if (!regex.test(value)) {
    alert('Phone Number harus 12 digit dan dimulai dengan 08 (contoh: 081234567890).')
    return false
  }

  return true
}

// ---------- COUPON ----------
const applyCoupon = () => {
  if (!couponCode.value.trim()) {
    couponMessage.value = 'Masukkan coupon code terlebih dahulu.'
    return
  }
  couponMessage.value =
    'Coupon diterapkan (dummy). Diskon sebenarnya belum terhubung ke backend.'
}

// ---------- PLACE ORDER → lanjut ke /payment ----------
const placeOrder = () => {
  const d = billingData.value

  // validasi field wajib (email sudah tidak dipakai)
  if (!d.firstName || !d.streetAddress || !d.city || !d.phoneNumber) {
    alert(
      'Lengkapi field wajib (Full Name, Street Address, Town/City, Phone Number).',
    )
    return
  }

  // validasi format nomor HP
  if (!validatePhoneNumber()) {
    return
  }

  // validasi item yang ikut checkout: harus ada yang dicentang
  if (checkoutItems.value.length === 0) {
    alert('Pilih minimal satu produk di Cart (centang) sebelum checkout.')
    return
  }

  // simpan data billing & metode bayar (kalau mau dipakai di halaman payment)
  localStorage.setItem('emotix_billing', JSON.stringify(d))
  localStorage.setItem('emotix_payment_method', paymentMethod.value)

  // simpan juga item yang benar-benar di-checkout (bukan semua isi cart)
  localStorage.setItem('emotix_checkout_items', JSON.stringify(checkoutItems.value))

  // pindah ke halaman pembayaran (QRIS)
  router.push('/payment')

  // clearCart TIDAK dipanggil di sini, supaya payment page masih bisa baca cart
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-10 space-y-10">
      <!-- Breadcrumb -->
      <p class="text-xs text-gray-500">
        <RouterLink
          to="/account"
          class="text-gray-400 hover:text-red-500 transition-colors"
        >
          Account
        </RouterLink>
        <span class="mx-2 text-gray-400">/</span>
        <RouterLink
          to="/cart"
          class="text-gray-400 hover:text-red-500 transition-colors"
        >
          View Cart
        </RouterLink>
        <span class="mx-2 text-gray-400">/</span>
        <span class="text-gray-900 font-medium">CheckOut</span>
      </p>

      <!-- Judul -->
      <h1 class="text-xl md:text-2xl font-semibold text-gray-900">
        Billing Details
      </h1>

      <!-- Konten utama: 2 kolom -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Kiri: Billing form -->
        <BillingForm v-model="billingData" />

        <!-- Kanan: Ringkasan order + Payment + Coupon -->
        <section class="space-y-4">
          <!-- Penting: pakai checkoutItems, bukan cartItems -->
          <OrderSummary :items="checkoutItems" :formatCurrency="formatCurrency" />

          <PaymentMethodSelector v-model="paymentMethod" />

          <CouponSection
            v-model:couponCode="couponCode"
            :couponMessage="couponMessage"
            @applyCoupon="applyCoupon"
            @placeOrder="placeOrder"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* tambahan styling khusus kalau perlu */
</style>
