<script setup>
defineOptions({
  name: 'AboutLogo',
})
</script>

<template>
  <div class="flex justify-center">
    <div
      class="w-full md:w-80 lg:w-96 h-56 md:h-72 lg:h-80 rounded-md shadow-sm
             bg-gradient-to-br from-gray-200 via-gray-100 to-white
             flex items-center justify-center"
    >
      <img
        src="@/assets/emotix-logo.png"
        alt="Emotix Logo"
        class="max-w-[80%] max-h-[80%] object-contain"
      />
    </div>
  </div>
</template>

<style scoped></style>
