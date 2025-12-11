<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['hover', 'leave'])
</script>

<template>
  <div
    @mouseenter="emit('hover')"
    @mouseleave="emit('leave')"
    class="rounded-md shadow-sm flex flex-col items-center justify-center py-6
           transition-colors duration-200 border cursor-default"
    :class="active ? 'bg-red-500 border-red-500' : 'bg-white border-gray-200'"
  >
    <!-- Icon kecil -->
    <div
      class="w-10 h-10 rounded-full flex items-center justify-center mb-3
             transition-colors duration-200"
      :class="active
        ? 'bg-white/10 text-white'
        : 'bg-gray-100 text-gray-600'"
    >
      <span class="text-xs font-semibold">i</span>
    </div>

    <!-- Angka -->
    <p
      class="text-xl md:text-2xl font-bold mb-1 transition-colors duration-200"
      :class="active ? 'text-white' : 'text-gray-900'"
    >
      {{ item.value }}
    </p>

    <!-- Label -->
    <p
      class="text-xs md:text-sm text-center px-4 transition-colors duration-200"
      :class="active ? 'text-white/90' : 'text-gray-500'"
    >
      {{ item.label }}
    </p>
  </div>
</template>

<style scoped></style>
