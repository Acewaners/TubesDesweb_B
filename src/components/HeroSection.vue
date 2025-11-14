<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

defineOptions({
  name: 'HeroSection',
})
</script>

<template>
  <section class="bg-gray-50 py-8 px-4 md:py-12 md:px-6 lg:py-16 lg:px-8">
    <div class="bg-black text-white rounded-2xl overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[450px] lg:min-h-[550px]">
          <!-- Left Side: Text Content -->
          <div class="flex flex-col justify-center py-12 lg:py-16">
            <!-- Apple iPhone Label -->
            <div class="flex items-center gap-3 mb-6">
              <img src="@/assets/apple.png" alt="Apple" class="w-10 h-10 object-contain" />
              <span class="text-sm lg:text-base text-white/80">iPhone 14 Series</span>
            </div>

            <!-- Main Heading -->
            <h1 class="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 lg:mb-10">
              Up to 10%<br />
              off Voucher
            </h1>

            <!-- CTA Button -->
            <a
              href="#"
              class="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group w-fit"
            >
              <span class="text-base font-medium border-b border-white/60 pb-1">Shop Now</span>
              <ArrowRightIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <!-- Right Side: iPhone Image -->
          <div class="flex items-end justify-center lg:justify-end relative pb-0 lg:pb-0">
            <img
              src="/iphone.png"
              alt="iPhone 14"
              class="w-auto h-[350px] lg:h-[450px] xl:h-[520px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Additional styling if needed */
</style>
