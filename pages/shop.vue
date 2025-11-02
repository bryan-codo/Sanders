<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">Shop Our Collection</h1>
        <p class="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover our complete range of premium products carefully curated for quality and style.
        </p>
      </div>
    </section>

    <!-- Filter & Sort -->
    <section class="bg-white py-8 px-4 sm:px-6 border-b border-gray-200">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p class="text-gray-600 text-sm sm:text-base">Showing <span class="font-semibold">{{ filteredProducts.length }}</span> products</p>
          </div>
          <select class="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-black">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div v-for="product in filteredProducts" :key="product.id" class="group cursor-pointer">
            <!-- Product Image -->
            <div class="relative bg-gray-100 rounded-lg overflow-hidden mb-4 h-64 sm:h-72">
              <img 
                v-if="product.image" 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <span>Product Image</span>
              </div>
              <button 
                type="button"
                class="absolute top-4 right-4 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition transform hover:scale-110"
                title="Add to wishlist"
              >
                ♥
              </button>
            </div>

            <!-- Product Info -->
            <div>
              <h3 class="font-heading text-lg sm:text-xl font-semibold text-black mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
              <div class="flex items-center justify-between">
                <p class="text-2xl font-bold text-black">£{{ product.price.toFixed(2) }}</p>
                <button 
                  @click="handleAddToCart(product)"
                  class="bg-black text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Notification -->
    <div 
      v-if="showNotification"
      class="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in"
    >
      ✓ {{ notification }}
    </div>

    <!-- Newsletter Section -->
    <section class="bg-black py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">Stay Updated</h2>
        <p class="text-gray-400 mb-8">Subscribe to get special offers and updates on new products.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="px-4 py-3 rounded text-black bg-white border border-gray-300 focus:outline-none focus:border-black w-full sm:w-64 placeholder-gray-500"
          />
          <button class="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCart } from '~/composables/useCart'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
}

const { addToCart } = useCart()
const { isAuthenticated, initAuth, isChecking } = useAuth()
const router = useRouter()
const showNotification = ref(false)
const notification = ref('')

const filteredProducts = ref<Product[]>([
  { id: 1, name: 'Premium Essentials', price: 99.99, description: 'High-quality everyday products', image: '/images/picture-1.jpg' },
  { id: 2, name: 'Luxury Collection', price: 199.99, description: 'Exclusive premium items', image: '/images/picture-2.jpg' },
  { id: 3, name: 'Classic Series', price: 79.99, description: 'Timeless design classics', image: '/images/picture-3.jpg' },
  { id: 4, name: 'Modern Lifestyle', price: 149.99, description: 'Contemporary essentials', image: '/images/picture-4.jpg' },
  { id: 5, name: 'Elite Selection', price: 249.99, description: 'Premium curated picks', image: '/images/picture-5.jpg' },
  { id: 6, name: 'Standard Plus', price: 119.99, description: 'Quality meets value', image: '/images/picture-6.jpg' },
  { id: 7, name: 'Signature Range', price: 139.99, description: 'Our signature items', image: '/images/picture-7.jpg' },
  { id: 8, name: 'Starter Pack', price: 89.99, description: 'Perfect for beginners', image: '/images/picture-8.jpg' },
])

// Initialize auth on component mount
onMounted(async () => {
  await initAuth()
})

const handleAddToCart = (product: Product) => {
  // Check if user is authenticated
  if (!isAuthenticated.value) {
    notification.value = 'Please login to add items to cart'
    showNotification.value = true
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return
  }

  // Add to cart
  addToCart(product)
  notification.value = `${product.name} added to cart!`
  showNotification.value = true
  
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>