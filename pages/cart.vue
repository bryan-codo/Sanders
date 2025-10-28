<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <p class="text-gray-600 mb-4">Your cart is empty.</p>
      <NuxtLink to="/products" class="text-blue-600 hover:text-blue-800">Continue shopping</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4 border-b pb-4 mb-4">
          <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded" />
          <div class="flex-1">
            <h3 class="font-bold">{{ item.name }}</h3>
            <p class="text-gray-600">${{ item.price }}</p>
            <div class="flex items-center gap-2 mt-2">
              <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
            </div>
          </div>
          <button @click="cartStore.removeItem(item.id)" class="text-red-600 hover:text-red-800">Remove</button>
        </div>
      </div>

      <div class="bg-gray-100 p-6 rounded-lg h-fit">
        <h2 class="font-bold text-lg mb-4">Order Summary</h2>
        <p class="flex justify-between mb-2">Subtotal: <span>${{ cartStore.total }}</span></p>
        <p class="flex justify-between mb-4">Shipping: <span>Free</span></p>
        <hr class="mb-4" />
        <p class="flex justify-between font-bold text-lg mb-6">Total: <span>${{ cartStore.total }}</span></p>
        <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

definePageMeta({
  layout: 'default',
});

const cartStore = useCartStore();
</script>