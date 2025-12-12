<script setup>
import ContactInfoCard from '@/components/contact/ContactInfoCard.vue'
import ContactForm from '@/components/contact/ContactForm.vue'
import ContactMap from '@/components/contact/ContactMap.vue'

defineOptions({
  name: 'ContactView',
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-10">
    <!-- Contact Form (Top) -->
    <ContactForm />

    <!-- Contact Info Card (Middle) -->
    <ContactInfoCard />

    <!-- Google Maps Section (Bottom) -->
    <ContactMap />
  </div>
</template>

<style scoped></style>
