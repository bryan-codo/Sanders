<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto text-center text-white">
        <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Contact us anytime and we'll get back to you as soon as possible.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-16">
          <!-- Contact Info Cards -->
          <div class="text-center">
            <div class="text-4xl mb-4">📍</div>
            <h3 class="font-heading text-xl font-bold text-black mb-2">Address</h3>
            <p class="text-gray-600">123 Premium Street<br/>New York, NY 10001<br/>United States</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">📞</div>
            <h3 class="font-heading text-xl font-bold text-black mb-2">Phone</h3>
            <p class="text-gray-600">+1 (555) 123-4567<br/>Mon - Fri: 9am - 6pm EST<br/>Support Hours Available</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">✉️</div>
            <h3 class="font-heading text-xl font-bold text-black mb-2">Email</h3>
            <p class="text-gray-600">info@sandersstore.com<br/>support@sandersstore.com<br/>Response within 24 hours</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="max-w-2xl mx-auto bg-gray-50 p-8 sm:p-12 rounded-lg">
          <h2 class="font-heading text-2xl sm:text-3xl font-bold text-black mb-8">Send us a Message</h2>
          <form class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-black mb-2">First Name</label>
                <input 
                  type="text" 
                  placeholder="John" 
                  class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-black mb-2">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-black mb-2">Email</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-black mb-2">Subject</label>
              <input 
                type="text" 
                placeholder="How can we help?" 
                class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-black mb-2">Message</label>
              <textarea 
                rows="6" 
                placeholder="Tell us more about your inquiry..." 
                class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              class="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-gray-50 py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-3xl mx-auto">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-black text-center mb-12">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div v-for="(faq, idx) in faqs" :key="idx" class="bg-white p-6 rounded-lg cursor-pointer hover:shadow-md transition" @click="toggleFaq(idx)">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-black text-lg">{{ faq.question }}</h3>
              <span class="text-2xl text-black font-light transition-transform" :style="{ transform: faq.open ? 'rotate(45deg)' : 'rotate(0deg)' }">+</span>
            </div>
            <p class="text-gray-600 mt-2 text-sm overflow-hidden transition-all" :style="{ maxHeight: faq.open ? '500px' : '0px', opacity: faq.open ? 1 : 0 }">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Placeholder -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-heading text-2xl sm:text-3xl font-bold text-black mb-8 text-center">Find Us</h2>
        <div class="bg-gray-200 h-96 rounded-lg flex items-center justify-center text-gray-500">
          <span>Map Placeholder - Add Google Maps or Leaflet</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on all products. Items must be unused and in original packaging. Contact our support team to initiate a return.',
    open: false
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-7 business days. Express shipping options are available at checkout for faster delivery.',
    open: false
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.',
    open: false
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to monitor your delivery in real-time.',
    open: false
  },
  {
    question: 'Are your products eco-friendly?',
    answer: 'Many of our products are made from sustainable materials. Look for the eco-friendly badge on product pages for more details.',
    open: false
  },
])

const toggleFaq = (idx) => {
  faqs.value[idx].open = !faqs.value[idx].open
}
</script>