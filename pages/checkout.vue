<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">Checkout</h1>
        <p class="text-base sm:text-lg text-gray-300">Complete your purchase</p>
      </div>
    </section>

    <!-- Checkout Section -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Order Summary -->
          <div>
            <h2 class="font-heading text-2xl sm:text-3xl font-bold text-black mb-8">Order Summary</h2>
            
            <div v-if="items.length === 0" class="text-gray-600">
              <p>Your cart is empty</p>
              <NuxtLink to="/shop" class="text-blue-600 hover:underline">Continue Shopping</NuxtLink>
            </div>

            <div v-else class="space-y-4">
              <div v-for="item in items" :key="item.id" class="flex justify-between items-start pb-4 border-b">
                <div class="flex-1">
                  <h3 class="font-semibold text-black">{{ item.name }}</h3>
                  <p class="text-gray-600 text-sm">Quantity: {{ item.quantity }}</p>
                </div>
                <p class="font-bold text-black">£{{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>

              <div class="pt-4 border-t-2">
                <div class="flex justify-between items-center text-2xl font-bold text-black">
                  <span>Total:</span>
                  <span>£{{ getTotal().toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Form -->
          <div>
            <h2 class="font-heading text-2xl sm:text-3xl font-bold text-black mb-8">Billing Information</h2>
            
            <form @submit.prevent="handleCheckout" class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-black mb-2">Full Name</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="John Doe"
                  class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black text-black bg-white"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-black mb-2">Email</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  placeholder="john@example.com"
                  class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black text-black bg-white"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-black mb-2">Address</label>
                <input 
                  v-model="form.address" 
                  type="text" 
                  placeholder="123 Main Street"
                  class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black text-black bg-white"
                  required
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-black mb-2">City</label>
                  <input 
                    v-model="form.city" 
                    type="text" 
                    placeholder="London"
                    class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black text-black bg-white"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-black mb-2">Postal Code</label>
                  <input 
                    v-model="form.postalCode" 
                    type="text" 
                    placeholder="SW1A 1AA"
                    class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black text-black bg-white"
                    required
                  />
                </div>
              </div>

              <div class="pt-6">
                <button 
                  type="submit"
                  :disabled="isLoading || items.length === 0"
                  class="w-full bg-black text-white py-4 rounded font-bold text-lg hover:bg-gray-800 transition disabled:bg-gray-400"
                >
                  {{ isLoading ? 'Processing...' : 'Complete Purchase' }}
                </button>
              </div>

              <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
              <p v-if="success" class="text-green-600 text-sm">{{ success }}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '~/composables/useCart'
import { useRouter } from 'vue-router'

const { items, getTotal, clearCart } = useCart()
const router = useRouter()
const isLoading = ref(false)
const error = ref('')
const success = ref('')

interface CheckoutForm {
  name: string
  email: string
  address: string
  city: string
  postalCode: string
}

const form = ref<CheckoutForm>({
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: ''
})

const handleCheckout = async () => {
  isLoading.value = true
  error.value = ''
  success.value = ''

  try {
    if (items.value.length === 0) {
      error.value = 'Your cart is empty'
      return
    }

    const response = await $fetch<any>('/api/orders', {
      method: 'POST',
      body: {
        items: items.value,
        totalPrice: getTotal(),
        billing: form.value
      }
    })

    // Get orderId from response
    const orderId = response?.orderId || response?.order?.id || 'unknown'

    success.value = 'Order created successfully!'
    
    // Clear cart
    clearCart()
    
    // Redirect to order confirmation
    setTimeout(() => {
      router.push(`/order-confirmation/${orderId}`)
    }, 1500)
  } catch (err: any) {
    error.value = err.data?.message || err.message || 'Failed to complete checkout'
    console.error('Checkout error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
input::placeholder {
  color: #999;
}
</style>