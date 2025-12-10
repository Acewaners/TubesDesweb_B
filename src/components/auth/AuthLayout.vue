<script setup>
defineOptions({
  name: 'AuthLayout',
})
</script>

<template>
  <!-- Pakai min-h-screen supaya boleh scroll kalau konten tinggi -->
  <section class="min-h-screen flex items-center bg-white">
    <div class="w-full max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16 lg:py-20">
      <div
        class="flex flex-col lg:flex-row items-center lg:items-stretch
               gap-8 md:gap-10 lg:gap-16"
      >
        <!-- KIRI: gambar (di atas pada layar kecil) -->
        <div
          class="w-full lg:w-1/2 flex justify-center mb-6 md:mb-0"
        >
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="w-full max-w-md md:max-w-lg h-auto object-contain rounded-lg shadow-lg"
            alt="Phone image"
          />
        </div>

        <!-- KANAN: slot untuk form -->
        <div class="w-full lg:w-1/2">
          <div class="w-full max-w-md mx-auto">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
