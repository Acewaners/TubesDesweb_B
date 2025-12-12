<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  formatCurrency: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['update-quantity', 'update-selected'])

const onChangeQuantity = (event) => {
  const qty = Number(event.target.value)
  emit('update-quantity', props.item, qty)
}

const onToggleSelected = (event) => {
  const checked = event.target.checked
  emit('update-selected', props.item, checked)
}

const itemSubtotal = computed(
  () => (props.item.price ?? 0) * (props.item.quantity ?? 0),
)
</script>

<template>
  <div class="border-b border-gray-100 last:border-b-0">
    <!-- Desktop View -->
    <div class="hidden md:grid grid-cols-4 gap-4 px-6 py-4 items-center text-sm">
      <!-- Product + Checkbox -->
      <div class="flex items-center gap-3">
        <!-- Checkbox untuk pilih item -->
        <input
          type="checkbox"
          class="h-4 w-4 text-red-500 border-gray-300 rounded"
          :checked="item.selected ?? true"
          @change="onToggleSelected"
        />

        <img
          :src="item.image"
          :alt="item.title"
          class="w-12 h-12 md:w-14 md:h-14 object-contain"
        />
        <span class="text-gray-800 text-xs md:text-sm">
          {{ item.title }}
        </span>
      </div>

      <!-- Price -->
      <div class="text-right md:text-left text-xs md:text-sm text-gray-700">
        {{ formatCurrency(item.price) }}
      </div>

      <!-- Quantity -->
      <div class="flex justify-center">
        <select
          class="border border-gray-300 rounded px-2 py-1 text-xs md:text-sm bg-white"
          :value="item.quantity"
          @change="onChangeQuantity"
        >
          <option v-for="n in 10" :key="n" :value="n">
            {{ n.toString().padStart(2, '0') }}
          </option>
        </select>
      </div>

      <!-- Subtotal -->
      <div class="text-right text-xs md:text-sm text-gray-700">
        {{ formatCurrency(itemSubtotal) }}
      </div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden px-4 py-4 space-y-3">
      <div class="flex gap-3">
        <input
          type="checkbox"
          class="h-4 w-4 text-red-500 border-gray-300 rounded mt-1 flex-shrink-0"
          :checked="item.selected ?? true"
          @change="onToggleSelected"
        />
        <img
          :src="item.image"
          :alt="item.title"
          class="w-16 h-16 object-contain flex-shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
            {{ item.title }}
          </p>
          <p class="text-xs text-gray-600 mb-2">
            {{ formatCurrency(item.price) }}
          </p>
          <div class="flex justify-between items-center">
            <select
              class="border border-gray-300 rounded px-2 py-1 text-xs bg-white"
              :value="item.quantity"
              @change="onChangeQuantity"
            >
              <option v-for="n in 10" :key="n" :value="n">
                {{ n.toString().padStart(2, '0') }}
              </option>
            </select>
            <p class="font-semibold text-sm text-gray-900">
              {{ formatCurrency(itemSubtotal) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
