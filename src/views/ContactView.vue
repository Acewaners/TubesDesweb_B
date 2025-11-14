<script setup>
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-10">
    <!-- Row: Contact Info Card + Contact Form -->
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left Side: Contact Info Card -->
      <div class="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6">
        <!-- Call To Us Section -->
        <div>
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shrink-0"
            >
              <PhoneIcon class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900">Call To Us</h3>
          </div>
          <div class="space-y-3 text-sm text-gray-600">
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: 0852-4666-4332</p>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-b border-gray-300"></div>

        <!-- Write To Us Section -->
        <div>
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shrink-0"
            >
              <EnvelopeIcon class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900">Write To Us</h3>
          </div>
          <div class="space-y-3 text-sm text-gray-600">
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
        </div>
      </div>

      <!-- Right Side: Contact Form -->
      <div class="flex-1 bg-white rounded-xl shadow-md p-6 md:p-8">
        <form class="space-y-6">
          <!-- Input Row: Name, Email, Phone -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Your Name *"
              class="w-full bg-gray-100 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              placeholder="Your Email *"
              class="w-full bg-gray-100 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="tel"
              placeholder="Your Phone *"
              class="w-full bg-gray-100 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <!-- Textarea -->
          <textarea
            placeholder="Your Message"
            rows="8"
            class="w-full bg-gray-100 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          ></textarea>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="button"
              class="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Send Massage
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Google Maps Section -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden h-[350px] md:h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127430.89281727595!2d116.79095945!3d-1.2379274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df147340a2ddd67%3A0x56ce90c92627d3c8!2sBalikpapan%2C%20Kota%20Balikpapan%2C%20Kalimantan%20Timur!5e0!3m2!1sid!2sid!4v1699999999999!5m2!1sid!2sid"
        class="w-full h-full border-0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
