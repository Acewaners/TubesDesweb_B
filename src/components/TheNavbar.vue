<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  ShoppingBagIcon,
  NoSymbolIcon,
  StarIcon,
} from '@heroicons/vue/24/outline'
import { cartItemCount } from '@/stores/cartStore'
import { authState, logout as authLogout } from '@/stores/authStore'
import { wishlistCount } from '@/stores/wishlistStore'

defineOptions({
  name: 'TheNavbar',
})

const router = useRouter()

const isMobileMenuOpen = ref(false)

// ----- Account dropdown (desktop) -----
const isAccountMenuOpen = ref(false)
const accountMenuRef = ref(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleAccountMenu = () => {
  isAccountMenuOpen.value = !isAccountMenuOpen.value
}

const closeAccountMenu = () => {
  isAccountMenuOpen.value = false
}

const handleClickOutside = (event) => {
  if (!accountMenuRef.value) return
  if (!accountMenuRef.value.contains(event.target)) {
    isAccountMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

// Logout
const handleLogout = () => {
  authLogout()
  isAccountMenuOpen.value = false
  router.push('/login')
}

// Mobile: klik icon orang → langsung ke halaman account
const goToAccountMobile = () => {
  closeMobileMenu()
  router.push('/account')
}
</script>

<template>
  <nav class="bg-white w-full border-b border-gray-300">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-20">
        <!-- Logo - Left -->
        <div class="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="Emotix Logo" class="h-8 w-8 object-contain" />
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
            to="/aboutme"
            class="text-sm font-medium text-black hover:text-gray-600 transition-colors relative group"
          >
            About Me
            <span
              class="absolute left-0 right-0 -bottom-1 h-0.5 bg-black opacity-0 group-hover:opacity-100 transition-opacity"
            ></span>
          </RouterLink>

          <!-- Sign Up hanya muncul kalau BELUM login -->
          <RouterLink
            v-if="!authState.isAuthenticated"
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
          <!-- Desktop Icons: hanya saat SUDAH login -->
          <div
            v-if="authState.isAuthenticated"
            class="hidden lg:flex items-center gap-6"
          >
            <!-- WISHLIST DESKTOP -->
            <RouterLink
              to="/wishlist"
              class="relative text-black hover:text-gray-600 cursor-pointer transition-colors"
              aria-label="Wishlist"
            >
              <HeartIcon class="w-6 h-6" />
              <span
                v-if="wishlistCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium"
              >
                {{ wishlistCount }}
              </span>
            </RouterLink>

            <!-- Cart desktop -->
            <RouterLink
              to="/cart"
              class="relative text-black hover:text-gray-600 cursor-pointer transition-colors"
              aria-label="Cart"
            >
              <ShoppingCartIcon class="w-6 h-6" />
              <span
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium"
              >
                {{ cartItemCount }}
              </span>
            </RouterLink>

            <!-- Account dropdown (desktop) -->
            <div class="relative" ref="accountMenuRef">
              <button
                @click.stop="toggleAccountMenu"
                class="text-black hover:text-gray-600 cursor-pointer transition-colors flex items-center"
                aria-label="Account"
              >
                <UserIcon class="w-6 h-6" />
              </button>

              <div
                v-if="isAccountMenuOpen"
                class="absolute right-0 mt-3 w-64 bg-teal-500 text-white rounded-lg shadow-lg py-3 z-50"
              >
                <RouterLink
                  to="/account"
                  @click="closeAccountMenu"
                  class="flex items-center gap-3 px-5 py-2.5 hover:bg-teal-600 transition-colors"
                >
                  <UserIcon class="w-5 h-5" />
                  <span class="text-sm font-medium">Manage My Account</span>
                </RouterLink>

                <RouterLink
                  to="/orders"
                  @click="closeAccountMenu"
                  class="flex items-center gap-3 px-5 py-2.5 hover:bg-teal-600 transition-colors"
                >
                  <ShoppingBagIcon class="w-5 h-5" />
                  <span class="text-sm font-medium">My Order</span>
                </RouterLink>

                <RouterLink
                  to="/cancellations"
                  @click="closeAccountMenu"
                  class="flex items-center gap-3 px-5 py-2.5 hover:bg-teal-600 transition-colors"
                >
                  <NoSymbolIcon class="w-5 h-5" />
                  <span class="text-sm font-medium">My Cancellations</span>
                </RouterLink>

                <RouterLink
                  to="/reviews"
                  @click="closeAccountMenu"
                  class="flex items-center gap-3 px-5 py-2.5 hover:bg-teal-600 transition-colors"
                >
                  <StarIcon class="w-5 h-5" />
                  <span class="text-sm font-medium">My Reviews</span>
                </RouterLink>

                <button
                  type="button"
                  @click="handleLogout"
                  class="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-teal-600 transition-colors text-left"
                >
                  <ArrowLeftOnRectangleIcon class="w-5 h-5" />
                  <span class="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
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

          <!-- Sign Up mobile: hanya saat belum login -->
          <RouterLink
            v-if="!authState.isAuthenticated"
            to="/signup"
            @click="closeMobileMenu"
            class="text-sm font-medium text-black hover:text-gray-600 px-4 py-2 transition-colors"
          >
            Sign Up
          </RouterLink>

          <!-- Mobile Icons: hanya saat SUDAH login -->
          <div
            v-if="authState.isAuthenticated"
            class="flex items-center gap-6 px-4 pt-4 border-t border-gray-100"
          >
            <!-- Wishlist mobile -->
            <RouterLink
              to="/wishlist"
              @click="closeMobileMenu"
              class="relative text-black hover:text-gray-600 transition-colors"
              aria-label="Wishlist"
            >
              <HeartIcon class="w-6 h-6" />
              <span
                v-if="wishlistCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium"
              >
                {{ wishlistCount }}
              </span>
            </RouterLink>

            <!-- Cart mobile -->
            <RouterLink
              to="/cart"
              @click="closeMobileMenu"
              class="relative text-black hover:text-gray-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCartIcon class="w-6 h-6" />
              <span
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium"
              >
                {{ cartItemCount }}
              </span>
            </RouterLink>

            <!-- Account mobile: langsung ke /account -->
            <button
              class="text-black hover:text-gray-600 transition-colors"
              aria-label="Account"
              type="button"
              @click="goToAccountMobile"
            >
              <UserIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active span {
  opacity: 1;
}
</style>
