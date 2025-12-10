<script setup>
import { computed, onMounted, ref } from 'vue'
import AccountProfileForm from '@/components/account/AccountProfileForm.vue'
import { authState } from '@/stores/authStore'

defineOptions({
  name: 'AccountView',
})

// ====== First Name & Last Name dari authState.userName ======
const firstName = computed({
  get() {
    const full = authState.userName || ''
    if (!full) return ''
    const parts = full.split(' ').filter(Boolean)
    if (parts.length > 1) return parts.slice(0, parts.length - 1).join(' ')
    return parts[0] || ''
  },
  set(val) {
    const ln = lastName.value
    authState.userName = [val, ln].filter(Boolean).join(' ')
  },
})

const lastName = computed({
  get() {
    const full = authState.userName || ''
    const parts = full.split(' ').filter(Boolean)
    return parts.length > 1 ? parts[parts.length - 1] : ''
  },
  set(val) {
    const fn = firstName.value
    authState.userName = [fn, val].filter(Boolean).join(' ')
  },
})

// ====== Email & Address ======
const email = computed(() => authState.email || '')
const address = ref('')

// ambil data billing terakhir (kalau disimpan)
onMounted(() => {
  try {
    const raw = localStorage.getItem('emotix_billing')
    if (!raw) return

    const billing = JSON.parse(raw)
    if (!billing || billing.saveInfo === false) return

    // Gabungkan street + apartment + city jadi 1 string address
    const parts = [
      billing.streetAddress,
      billing.apartment,
      billing.city,
    ].filter(Boolean)
    if (parts.length > 0) address.value = parts.join(', ')
  } catch (err) {
    console.error('[AccountView] Failed to load emotix_billing', err)
  }
})

// ====== Display name di bagian atas ======
const displayName = computed(() => {
  const n = [firstName.value, lastName.value].filter(Boolean).join(' ')
  return n || authState.email || ''
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-4">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
        Manage My Account
      </h1>

      <p class="text-sm text-gray-500">
        Welcome!
        <span v-if="displayName" class="text-red-500 font-medium">
          {{ displayName }}
        </span>
      </p>

      <!-- Card profil -->
      <AccountProfileForm
        :firstName="firstName"
        :lastName="lastName"
        :email="email"
        :address="address"
      />
    </div>
  </div>
</template>

<style scoped></style>
