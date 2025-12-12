<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  couponCode: {
    type: String,
    required: true,
  },
  couponMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:couponCode', 'applyCoupon', 'deleteItems'])

const onInputCoupon = (event) => {
  emit('update:couponCode', event.target.value)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap gap-3">
      <RouterLink
        to="/"
        class="px-4 py-2 border border-gray-300 rounded text-xs md:text-sm text-gray-700
              hover:bg-gray-100 transition-colors"
      >
        Return To Shop
      </RouterLink>

      <button
        type="button"
        @click="emit('deleteItems')"
        class="px-4 py-2 border border-red-500 rounded text-xs md:text-sm text-red-500
              hover:bg-red-50 transition-colors"
      >
        Delete Item
      </button>
    </div>

    <div class="flex flex-col md:flex-row gap-3 md:items-center">
      <input
        :value="props.couponCode"
        @input="onInputCoupon"
        type="text"
        placeholder="Coupon Code"
        class="flex-1 border border-gray-300 rounded px-3 py-2 text-xs md:text-sm
              focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
      />
      <button
        type="button"
        @click="emit('applyCoupon')"
        class="px-4 py-2 text-xs md:text-sm font-medium text-white rounded
              hover:bg-red-600 active:bg-red-700 transition-colors"
        style="background-color:#e04b4b"
      >
        Apply Coupon
      </button>
    </div>

    <p v-if="props.couponMessage" class="text-xs text-gray-500">
      {{ props.couponMessage }}
    </p>
  </div>
</template>

<style scoped></style>
