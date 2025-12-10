<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { login as authLogin } from '@/stores/authStore'

defineOptions({
  name: 'RegisterForm',
})

const router = useRouter()

const nama = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const onRegister = () => {
  errorMessage.value = ''
  loading.value = true

  if (!nama.value || !email.value || !password.value) {
    errorMessage.value = 'Nama, email, dan password wajib diisi.'
    loading.value = false
    return
  }

  setTimeout(() => {
    const newUser = {
      name: nama.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    }

    localStorage.setItem('emotix_registered_user', JSON.stringify(newUser))

    loading.value = false
    alert('Registrasi berhasil! Silakan login terlebih dahulu.')
    router.push('/login')
  }, 600)
}

const onGoogleSignup = () => {
  loading.value = true
  errorMessage.value = ''

  setTimeout(() => {
    const googleUser = {
      name: 'Google User',
      email: 'googleuser@example.com',
    }

    localStorage.setItem('emotix_registered_user', JSON.stringify(googleUser))

    authLogin(googleUser)

    loading.value = false
    alert('Sign up with Google (dummy) berhasil! Anda sudah login sebagai Google User.')
    router.push('/')
  }, 800)
}
</script>

<template>
  <div>
    <h2 class="text-2xl md:text-3xl font-semibold text-black mb-4">
      Create an account
    </h2>

    <form class="space-y-4" @submit.prevent="onRegister">
      <!-- Nama -->
      <div>
        <label for="name" class="block text-sm text-neutral-500 mb-2">
          Name
        </label>
        <input
          v-model="nama"
          id="nama"
          type="text"
          class="block w-full rounded border border-neutral-200 bg-transparent
                 px-3 py-2 leading-normal outline-none transition-shadow duration-150
                 focus:shadow-outline focus:border-primary"
          placeholder="Full Name"
          required
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm text-neutral-500 mb-2">
          Email
        </label>
        <input
          v-model="email"
          id="email"
          type="email"
          class="block w-full rounded border border-neutral-200 bg-transparent
                 px-3 py-2 leading-normal outline-none transition-shadow duration-150
                 focus:shadow-outline focus:border-primary"
          placeholder="name@company.com"
          required
        />
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm text-neutral-500 mb-2">
          Password
        </label>
        <input
          v-model="password"
          id="password"
          type="password"
          class="block w-full rounded border border-neutral-200 bg-transparent
                 px-3 py-2 leading-normal outline-none transition-shadow duration-150
                 focus:shadow-outline focus:border-primary"
          placeholder="Password"
          required
        />
      </div>

      <!-- Tombol utama -->
      <button
        type="submit"
        :disabled="loading"
        class="inline-block w-full rounded-md px-4 py-2 text-sm font-medium
               leading-normal text-white shadow transition-colors duration-150
               ease-in-out hover:bg-red-600 focus:bg-red-600 focus:outline-none
               active:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
        style="background-color:#e04b4b"
      >
        <span v-if="!loading">Create an account</span>
        <span v-else>Processing...</span>
      </button>

      <!-- Google -->
      <button
        type="button"
        @click="onGoogleSignup"
        :disabled="loading"
        class="w-full flex items-center justify-center text-gray-900 bg-white border
               border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none
               focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-2.5
               text-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <svg
          class="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign up with Google
      </button>

      <!-- Link ke login -->
      <p class="text-sm text-neutral-500 mt-3">
        Already have an account?
        <RouterLink
          to="/login"
          class="text-red-500 hover:underline"
        >
          Login here
        </RouterLink>
      </p>

      <!-- Error message -->
      <p v-if="errorMessage" class="text-sm text-red-500 mt-1">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<style scoped></style>
