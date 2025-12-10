<script setup>
import { ref, computed } from "vue"
import { RouterLink } from "vue-router"
import { cartState } from "@/stores/cartStore"

import CartTable from "./CartTable.vue"
import CartActions from "./CartActions.vue"
import CartTotals from "./CartTotals.vue"

defineOptions({ name: "CartPage" })

const cartItems = computed(() => cartState.items)

const couponCode = ref("")
const couponMessage = ref("")

const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value ?? 0)

const updateQuantity = (item, qty) => {
  const parsed = Number(qty)
  item.quantity = Number.isNaN(parsed) || parsed <= 0 ? 1 : parsed
}

const applyCoupon = () => {
  if (!couponCode.value.trim()) {
    couponMessage.value = "Masukkan kode kupon dulu."
    return
  }
  couponMessage.value = "Kupon diterapkan (dummy)."
}

const updateSelected = (item, selected) => {
  item.selected = selected
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-4">

    <!-- Breadcrumb -->
    <p class="text-xs text-gray-500">
      <RouterLink to="/" class="text-gray-400 hover:text-red-500 transition">
        Home
      </RouterLink>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-900 font-medium">Cart</span>
    </p>

    <!-- TITLE -->
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">My Cart</h1>

    <!-- EMPTY STYLE (SAMA DENGAN WISHLIST) -->
    <div
      v-if="cartItems.length === 0"
      class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <p class="text-sm text-gray-600 mb-1">
        Your cart is empty.
      </p>

      <RouterLink to="/" class="text-red-500 hover:underline text-sm">
        Go shop now!
      </RouterLink>
    </div>

    <!-- FILLED CART -->
    <template v-else>
      <CartTable
        :items="cartItems"
        :formatCurrency="formatCurrency"
        @update-quantity="updateQuantity"
        @update-selected="updateSelected"
      />

      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
          <CartActions
            v-model:couponCode="couponCode"
            :couponMessage="couponMessage"
            @applyCoupon="applyCoupon"
          />
        </div>

        <CartTotals
          :items="cartItems"
          :formatCurrency="formatCurrency"
        />
      </section>
    </template>

  </div>
</template>
