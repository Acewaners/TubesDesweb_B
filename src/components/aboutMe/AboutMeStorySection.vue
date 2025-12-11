<script setup>
defineOptions({
  name: 'AboutMeStorySection',
})
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
    <!-- Left text -->
    <div class="space-y-4">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
        Hari Yatun Nasifa
      </h1>
      <h3 class="text-2xl md:text-xl font-bold text-gray-900">
        11231030 - Informatika - Institut Teknologi Kalimantan
      </h3>
      <p class="text-sm md:text-base text-gray-600 leading-relaxed">
        Saya adalah mahasiswa Semester 5. Saya memiliki bidang minat di Data Science dan mungkin juga di Game. Saya akan berusaha memberikan yang terbaik untuk kedua orang tua saya. Dan kalo pengen dan ada kesempatan saya mau lulus 3.5 tahun eheheh.
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
          src="@/assets/Ini-aku.jpg"
          alt="Ini Adalah Aku"
          class="max-w-[80%] max-h-[80%] object-contain"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
