<script setup>
import CartItemRow from './CartItemRow.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  formatCurrency: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['update-quantity', 'update-selected'])

const handleUpdateQuantity = (item, qty) => {
  emit('update-quantity', item, qty)
}

const handleUpdateSelected = (item, selected) => {
  emit('update-selected', item, selected)
}
</script>

<template>
  <section class="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
    <!-- Header row -->
    <div
      class="hidden md:grid grid-cols-4 gap-4 px-6 py-4 text-xs md:text-sm font-semibold text-gray-500 border-b border-gray-100"
    >
      <div>Product</div>
      <div class="text-right md:text-left">Price</div>
      <div class="text-center">Quantity</div>
      <div class="text-right">Subtotal</div>
    </div>

    <!-- Item rows -->
    <CartItemRow
      v-for="item in props.items"
      :key="item.id"
      :item="item"
      :formatCurrency="props.formatCurrency"
      @update-quantity="handleUpdateQuantity"
      @update-selected="handleUpdateSelected"
    />
  </section>
</template>
