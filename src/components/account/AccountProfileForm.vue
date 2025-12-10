<script setup>
import { ref, computed, watch } from 'vue'
import { updatePassword } from '@/stores/authStore'

defineOptions({
  name: 'AccountProfileForm',
})

// ==== PROPS ====
const props = defineProps({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
})

// ==== EMITS (buat v-model firstName & lastName) ====
const emit = defineEmits(['update:firstName', 'update:lastName'])

// v-model bridging untuk firstName & lastName
const firstNameModel = computed({
  get: () => props.firstName,
  set: (val) => emit('update:firstName', val),
})

const lastNameModel = computed({
  get: () => props.lastName,
  set: (val) => emit('update:lastName', val),
})

// ==== Email & Address: lokal tapi di-seed dari props ====
const email = ref(props.email || '')
const address = ref(props.address || '')

watch(
  () => props.email,
  (val) => {
    email.value = val || ''
  },
)

watch(
  () => props.address,
  (val) => {
    address.value = val || ''
  },
)

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const isSaving = ref(false)
const message = ref('')
const errorMessage = ref('')

// helper: ambil password terdaftar sekarang
function getRegisteredPassword() {
  try {
    const raw = localStorage.getItem('emotix_registered_user')
    if (!raw) return null
    const registered = JSON.parse(raw)
    return registered?.password || null
  } catch {
    return null
  }
}

const handleSave = () => {
  message.value = ''
  errorMessage.value = ''
  isSaving.value = true

  // --- VALIDASI & UPDATE PASSWORD (kalau user isi) ---
  const wantsChangePassword =
    currentPassword.value || newPassword.value || confirmPassword.value

  if (wantsChangePassword) {
    // semua field wajib diisi
    if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
      isSaving.value = false
      errorMessage.value = 'Please fill all password fields.'
      return
    }

    const registeredPassword = getRegisteredPassword()
    if (!registeredPassword) {
      isSaving.value = false
      errorMessage.value =
        'No registered user found. Password cannot be updated in this demo.'
      return
    }

    // cek current password benar
    if (currentPassword.value !== registeredPassword) {
      isSaving.value = false
      errorMessage.value = 'Current password is incorrect.'
      return
    }

    // cek new = confirm
    if (newPassword.value !== confirmPassword.value) {
      isSaving.value = false
      errorMessage.value = 'New password and confirmation do not match.'
      return
    }

    // boleh tambahin rule panjang minimal kalau mau
    if (newPassword.value.length < 6) {
      isSaving.value = false
      errorMessage.value = 'New password must be at least 6 characters.'
      return
    }

    // update ke localStorage (emotix_registered_user)
    const ok = updatePassword(newPassword.value)
    if (!ok) {
      isSaving.value = false
      errorMessage.value = 'Failed to update password (local error).'
      return
    }
  }

  // simulasi delay save profile
  setTimeout(() => {
    isSaving.value = false

    if (wantsChangePassword) {
      message.value =
        'Profile and password updated successfully!'
      // bersihin field password biar aman
      currentPassword.value = ''
      newPassword.value = ''
      confirmPassword.value = ''
    } else {
      message.value =
        'Profile updated successfully!'
    }
  }, 700)
}

const handleCancel = () => {
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  message.value = ''
  errorMessage.value = ''
}
</script>

<template>
  <div
    class="bg-white rounded-md shadow-sm border border-gray-100 px-6 py-6 md:px-10 md:py-8"
  >
    <!-- Title card -->
    <h2 class="text-sm md:text-base font-semibold text-red-500 mb-6">
      Edit Your Profile
    </h2>

    <form class="space-y-6" @submit.prevent="handleSave">
      <!-- First / Last Name -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs text-gray-500 mb-1">
            First Name
          </label>
          <input
            v-model="firstNameModel"
            type="text"
            class="block w-full rounded bg-gray-100 border border-gray-200
                   px-3 py-2 text-xs md:text-sm text-gray-900
                   focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div>
          <label class="block text-xs text-gray-500 mb-1">
            Last Name
          </label>
          <input
            v-model="lastNameModel"
            type="text"
            class="block w-full rounded bg-gray-100 border border-gray-200
                   px-3 py-2 text-xs md:text-sm text-gray-900
                   focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      <!-- Email / Address -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs text-gray-500 mb-1">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            class="block w-full rounded bg-gray-100 border border-gray-200
                   px-3 py-2 text-xs md:text-sm text-gray-900
                   focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div>
          <label class="block text-xs text-gray-500 mb-1">
            Address
          </label>
          <input
            v-model="address"
            type="text"
            class="block w-full rounded bg-gray-100 border border-gray-200
                   px-3 py-2 text-xs md:text-sm text-gray-900
                   focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      <!-- Password changes -->
      <div class="space-y-3">
        <p class="text-xs font-semibold text-gray-500">
          Password Changes
        </p>

        <div class="space-y-3">
          <div>
            <input
              v-model="currentPassword"
              type="password"
              placeholder="Current Password"
              class="block w-full rounded bg-gray-100 border border-gray-200
                     px-3 py-2 text-xs md:text-sm text-gray-900
                     focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <input
              v-model="newPassword"
              type="password"
              placeholder="New Password"
              class="block w-full rounded bg-gray-100 border border-gray-200
                     px-3 py-2 text-xs md:text-sm text-gray-900
                     focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              class="block w-full rounded bg-gray-100 border border-gray-200
                     px-3 py-2 text-xs md:text-sm text-gray-900
                     focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      <!-- Footer form -->
      <div class="flex flex-col md:flex-row items-center justify-end gap-3 pt-2">
        <p v-if="errorMessage" class="text-xs text-red-500 mr-auto md:mr-4">
          {{ errorMessage }}
        </p>
        <p v-else-if="message" class="text-xs text-teal-600 mr-auto md:mr-4">
          {{ message }}
        </p>

        <button
          type="button"
          @click="handleCancel"
          class="text-xs md:text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          :disabled="isSaving"
          class="inline-flex items-center justify-center rounded-md px-5 py-2
                 text-xs md:text-sm font-medium text-white shadow-sm
                 transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                 hover:bg-red-600 active:bg-red-700"
          style="background-color:#e04b4b"
        >
          <span v-if="!isSaving">Save Changes</span>
          <span v-else>Saving...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
