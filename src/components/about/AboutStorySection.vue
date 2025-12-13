<script setup>
defineOptions({
  name: 'AboutStorySection',
})
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
    <!-- Left text -->
    <div class="space-y-4">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
        Our Story
      </h1>
      <p class="text-sm md:text-base text-gray-600 leading-relaxed">
        Launched in 2025, Emotix is South Asia's premier online shopping
        marketplace with an active presence in multiple regions. Supported
        by a wide range of sellers and brands, we bring a smooth and secure
        online experience for electronics, gadgets, and more.
      </p>
      <p class="text-sm md:text-base text-gray-600 leading-relaxed">
        With thousands of products and growing, Emotix empowers people to
        shop smarter, discover better deals, and enjoy a more delightful
        buying experience from the comfort of their homes.
      </p>
    </div>

    <!-- Right logo box (gradient abu ke putih) -->
    <div class="flex justify-center md:justify-end">
      <div
        class="w-full md:w-80 lg:w-96 h-56 md:h-72 lg:h-80 rounded-md shadow-sm
               bg-gradient-to-br from-gray-200 via-gray-100 to-white
               flex items-center justify-center"
      >
        <img
          src="@/assets/emotix-logo.png"
          alt="Ini adalah logo emotix"
          class="max-w-[80%] max-h-[80%] object-contain"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
