<template>
  <div>
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <img :src="product.image" :alt="product.name" class="w-full rounded-lg" />
      <div>
        <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
        <p class="text-2xl text-blue-600 font-bold mb-4">${{ product.price }}</p>
        <p class="text-gray-600 mb-6">{{ product.description }}</p>
        <button 
          @click="addToCart" 
          class="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-bold transition"
        >
          Add to Cart
        </button>
        <p v-if="addedToCart" class="text-green-600 mt-4 text-center font-semibold">✓ Added to cart!</p>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-gray-600">Product not found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart'

definePageMeta({
  layout: 'default',
})

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

const route = useRoute()
const { addToCart: addToCartComposable } = useCart()
const addedToCart = ref(false)

const productsData: Record<string, Product> = {
  '1': { id: 1, name: 'Wireless Headphones', price: 79.99, image: 'https://via.placeholder.com/500x500?text=Headphones', description: 'High-quality wireless headphones with noise cancellation' },
  '2': { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://via.placeholder.com/500x500?text=Watch', description: 'Feature-rich smartwatch with health tracking' },
  '3': { id: 3, name: 'USB-C Cable', price: 19.99, image: 'https://via.placeholder.com/500x500?text=Cable', description: 'Durable USB-C charging and data cable' },
  '4': { id: 4, name: 'Phone Case', price: 29.99, image: 'https://via.placeholder.com/500x500?text=Phone+Case', description: 'Protective phone case with premium design' },
  '5': { id: 5, name: 'Screen Protector', price: 9.99, image: 'https://via.placeholder.com/500x500?text=Protector', description: 'Tempered glass screen protector' },
  '6': { id: 6, name: 'Portable Charger', price: 49.99, image: 'https://via.placeholder.com/500x500?text=Charger', description: 'High-capacity portable charger with fast charging' },
}

const product = ref<Product | null>(productsData[route.params.id as string] || null)

const addToCart = () => {
  if (product.value) {
    addToCartComposable(product.value)
    addedToCart.value = true
    
    // Hide message after 2 seconds
    setTimeout(() => {
      addedToCart.value = false
    }, 2000)
  }
}
</script>