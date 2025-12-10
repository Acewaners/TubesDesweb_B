<script setup>
import { onMounted, watch } from 'vue'
import { authState } from '@/stores/authStore' // <--- tambahkan ini

defineOptions({
  name: 'BillingForm',
})

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateField = (field, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  })
}

// === AUTO FILL: load data billing tersimpan saat component mount ===
onMounted(() => {
  try {
    const raw = localStorage.getItem('emotix_billing')
    if (!raw) return

    const saved = JSON.parse(raw)
    // cuma pakai kalau memang disimpan sebagai "save for next time"
    if (!saved || saved.saveInfo === false) return

    emit('update:modelValue', {
      ...props.modelValue,
      ...saved,
      // pastikan checkbox tetap ON
      saveInfo: true,
    })
  } catch (err) {
    console.error('[BillingForm] Failed to load emotix_billing', err)
  }
})

// === AUTO SAVE: setiap form berubah & saveInfo = true, simpan ke localStorage ===
watch(
  () => props.modelValue,
  (val) => {
    if (!val || !val.saveInfo) return
    try {
      localStorage.setItem(
        'emotix_billing',
        JSON.stringify({
          ...val,
          userEmail: authState.email || null, // <--- simpan info user login
        })
      )
    } catch (err) {
      console.error('[BillingForm] Failed to save emotix_billing', err)
    }
  },
  { deep: true }
)

// Kalau user matikan checkbox → hapus data billing tersimpan
watch(
  () => props.modelValue.saveInfo,
  (newVal) => {
    if (newVal === false) {
      try {
        localStorage.removeItem('emotix_billing')
      } catch (err) {
        console.error('[BillingForm] Failed to remove emotix_billing', err)
      }
    }
  }
)
</script>

<template>
  <section
    class="bg-white rounded-md shadow-sm border border-gray-100 p-6 md:p-8 space-y-5"
  >
    <!-- Full Name -->
    <div class="space-y-1">
      <label class="block text-xs md:text-sm text-gray-700 mb-1">
        Full Name<span class="text-red-500">*</span>
      </label>
      <input
        :value="modelValue.firstName"
        @input="updateField('firstName', $event.target.value)"
        type="text"
        placeholder="Full Name"
        class="w-full border border-gray-300 rounded px-3 py-2 text-xs md:text-sm
               focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
      />
    </div>

    <!-- Company Name -->
    <div class="space-y-1">
      <label class="block text-xs md:text-sm text-gray-700 mb-1">
        Company Name
      </label>
      <input
        :value="modelValue.companyName"
        @input="updateField('companyName', $event.target.value)"
        type="text"
        class="w-full border border-gray-300 rounded px-3 py-2 text-xs md:text-sm
               focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
      />
    </div>

    <!-- Street Address -->
    <div class="space-y-1">
      <label class="block text-xs md:text-sm text-gray-700 mb-1">
        Street Address<span class="text-red-500">*</span>
      </label>
      <input
        :value="modelValue.streetAddress"
        @input="updateField('streetAddress', $event.target.value)"
        type="text"
        placeholder="House number and street name"
        class="w-full border border-gray-300 rounded px-3 py-2 text-xs md:text-sm
               focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
      />
    </div>

    <!-- Apartment (optional) -->
    <div class="space-y-1">
      <label class="block text-xs md:text-sm text-gray-700 mb-1">
        Apartment, floor, etc. (optional)
      </label>
      <input
        :value="modelValue.apartment"
        @input="updateField('apartment', $event.target.value)"
        type="text"
        class="w-full border border-gray-300 rounded px-3 py-2 text-xs md:text-sm
               focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
      />
    </div>

    <!-- Town / City -->
    <div class="space-y-1">
      <label class="block text-xs md:text-sm text-gray-700 mb-1">
        Town / City<span class="text-red-500">*</span>
      </label>
      <input
        :value="modelValue.city"
        @input="updateField('city', $event.target.value)"
        type="text"
        class="w-full border border-gray-300 rounded px-3 py-2 text-xs md:text-sm
               focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
      />
    </div>

    <!-- Phone Number -->
    <div class="space-y-1">
      <label class="block text-xs md:text-sm text-gray-700 mb-1">
        Phone Number<span class="text-red-500">*</span>
      </label>
      <input
        :value="modelValue.phoneNumber"
        @input="updateField('phoneNumber', $event.target.value)"
        type="tel"
        placeholder="08xx xxxx xxxx"
        minlength="12"
        maxlength="12"
        class="w-full border border-gray-300 rounded px-3 py-2 text-xs md:text-sm
               focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
      />
    </div>

    <!-- Save info checkbox -->
    <div class="flex items-start gap-2 pt-2">
      <input
        id="save-info"
        type="checkbox"
        :checked="modelValue.saveInfo"
        @change="updateField('saveInfo', $event.target.checked)"
        class="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-red-500 focus:ring-red-500"
      />
      <label
        for="save-info"
        class="text-xs md:text-sm text-gray-600"
      >
        Save this information for faster check-out next time
      </label>
    </div>
  </section>
</template>
