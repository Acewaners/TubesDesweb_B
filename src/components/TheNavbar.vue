<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'

defineOptions({
  name: 'TheNavbar',
})

const isMobileMenuOpen = ref(false)
const cartItemCount = ref(0)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-white w-full border-b border-gray-300">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-20">
        <!-- Logo - Left -->
        <div class="flex items-center gap-3 shrink-0">
          <img src="@/assets/logo.png" alt="Emotix Logo" class="h-8 w-8 object-contain" />
          <RouterLink to="/" class="text-xl font-semibold text-black tracking-tight">
            Emotix
          </RouterLink>
        </div>

        <!-- Desktop Menu - Center -->
        <div class="hidden lg:flex items-center gap-12">
          <RouterLink
            to="/"
            class="text-sm font-medium text-black hover:text-gray-600 transition-colors relative group"
          >
            Home
            <span
              class="absolute left-0 right-0 -bottom-1 h-0.5 bg-black opacity-0 group-hover:opacity-100 transition-opacity"
            ></span>
          </RouterLink>
          <RouterLink
            to="/contact"
            class="text-sm font-medium text-black hover:text-gray-600 transition-colors relative group"
          >
            Contact
            <span
              class="absolute left-0 right-0 -bottom-1 h-0.5 bg-black opacity-0 group-hover:opacity-100 transition-opacity"
            ></span>
          </RouterLink>
          <RouterLink
            to="/about"
            class="text-sm font-medium text-black hover:text-gray-600 transition-colors relative group"
          >
            About
            <span
              class="absolute left-0 right-0 -bottom-1 h-0.5 bg-black opacity-0 group-hover:opacity-100 transition-opacity"
            ></span>
          </RouterLink>
          <RouterLink
            to="/signup"
            class="text-sm font-medium text-black hover:text-gray-600 transition-colors relative group"
          >
            Sign Up
            <span
              class="absolute left-0 right-0 -bottom-1 h-0.5 bg-black opacity-0 group-hover:opacity-100 transition-opacity"
            ></span>
          </RouterLink>
        </div>

        <!-- Icons - Right -->
        <div class="flex items-center gap-6">
          <!-- Desktop Icons -->
          <div class="hidden lg:flex items-center gap-6">
            <button class="text-black hover:text-gray-600 transition-colors" aria-label="Wishlist">
              <HeartIcon class="w-6 h-6" />
            </button>

            <button
              class="relative text-black hover:text-gray-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCartIcon class="w-6 h-6" />
              <span
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium"
              >
                {{ cartItemCount }}
              </span>
            </button>

            <button class="text-black hover:text-gray-600 transition-colors" aria-label="Account">
              <UserIcon class="w-6 h-6" />
            </button>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden text-black hover:text-gray-600 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isMobileMenuOpen" class="lg:hidden py-4 border-t border-gray-100">
        <div class="flex flex-col space-y-3">
          <RouterLink
            to="/"
            @click="closeMobileMenu"
            class="text-sm font-medium text-black hover:text-gray-600 px-4 py-2 transition-colors"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/contact"
            @click="closeMobileMenu"
            class="text-sm font-medium text-black hover:text-gray-600 px-4 py-2 transition-colors"
          >
            Contact
          </RouterLink>
          <RouterLink
            to="/about"
            @click="closeMobileMenu"
            class="text-sm font-medium text-black hover:text-gray-600 px-4 py-2 transition-colors"
          >
            About
          </RouterLink>
          <RouterLink
            to="/signup"
            @click="closeMobileMenu"
            class="text-sm font-medium text-black hover:text-gray-600 px-4 py-2 transition-colors"
          >
            Sign Up
          </RouterLink>

          <!-- Mobile Icons -->
          <div class="flex items-center gap-6 px-4 pt-4 border-t border-gray-100">
            <button class="text-black hover:text-gray-600 transition-colors" aria-label="Wishlist">
              <HeartIcon class="w-6 h-6" />
            </button>

            <button
              class="relative text-black hover:text-gray-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCartIcon class="w-6 h-6" />
              <span
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium"
              >
                {{ cartItemCount }}
              </span>
            </button>

            <button class="text-black hover:text-gray-600 transition-colors" aria-label="Account">
              <UserIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Active link styling handled by router-link-active class */
.router-link-active span {
  opacity: 1;
}
</style>
