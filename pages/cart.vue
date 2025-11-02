<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">Shopping Cart</h1>
      </div>
    </section>

    <!-- Cart Items -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Empty Cart -->
        <div v-if="items.length === 0" class="text-center py-12">
          <p class="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <NuxtLink to="/shop" class="inline-block bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition">
            Continue Shopping
          </NuxtLink>
        </div>

        <!-- Cart with Items -->
        <div v-else>
          <!-- Cart Table -->
          <div class="overflow-x-auto mb-8">
            <table class="w-full">
              <thead>
                <tr class="border-b-2 border-black">
                  <th class="text-left py-4 font-bold text-black">Product</th>
                  <th class="text-center py-4 font-bold text-black">Quantity</th>
                  <th class="text-right py-4 font-bold text-black">Price</th>
                  <th class="text-right py-4 font-bold text-black">Total</th>
                  <th class="text-center py-4 font-bold text-black">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id" class="border-b border-gray-200">
                  <td class="py-6 text-black">
                    <div>
                      <p class="font-semibold text-lg">{{ item.name }}</p>
                      <p class="text-gray-600 text-sm">{{ item.description }}</p>
                    </div>
                  </td>
                  <td class="text-center py-6">
                    <input 
                      :value="item.quantity"
                      @change="(e: any) => updateQuantity(item.id, parseInt(e.target.value))"
                      type="number"
                      min="1"
                      class="w-16 px-2 py-1 border border-gray-300 rounded text-center text-black"
                    />
                  </td>
                  <td class="text-right py-6 text-black font-semibold">£{{ item.price.toFixed(2) }}</td>
                  <td class="text-right py-6 text-black font-bold">£{{ (item.price * item.quantity).toFixed(2) }}</td>
                  <td class="text-center py-6">
                    <button 
                      @click="removeFromCart(item.id)"
                      class="text-red-600 hover:text-red-800 font-semibold transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Cart Summary -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Summary Box -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="text-2xl font-bold text-black mb-6">Order Summary</h3>
              <div class="space-y-4">
                <div class="flex justify-between text-black">
                  <span>Subtotal:</span>
                  <span>£{{ getTotal().toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-black">
                  <span>Shipping:</span>
                  <span>£0.00</span>
                </div>
                <div class="flex justify-between text-black">
                  <span>Tax:</span>
                  <span>£0.00</span>
                </div>
                <div class="border-t-2 border-gray-300 pt-4 flex justify-between text-2xl font-bold text-black">
                  <span>Total:</span>
                  <span>£{{ getTotal().toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Checkout Box -->
            <div class="space-y-4">
              <NuxtLink 
                to="/checkout" 
                class="block text-center bg-black text-white px-8 py-4 rounded font-bold text-lg hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </NuxtLink>
              <NuxtLink 
                to="/shop" 
                class="block text-center border-2 border-black text-black px-8 py-4 rounded font-bold text-lg hover:bg-black hover:text-white transition"
              >
                Continue Shopping
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

const { items, removeFromCart, updateQuantity, getTotal } = useCart()
</script>