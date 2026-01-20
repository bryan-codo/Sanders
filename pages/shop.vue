<template>
  <div class="w-full bg-white min-h-screen">
    <!-- Smart Navbar -->
    <nav 
      :class="['fixed top-0 left-0 right-0 bg-white z-40 border-b border-gray-200 transition-transform duration-300', !navVisible && '-translate-y-full']"
    >
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="font-heading text-2xl font-bold tracking-tight text-black">Sanders</div>
          <div class="hidden md:flex gap-8 text-sm tracking-wide">
            <NuxtLink to="/shop" class="hover:opacity-60 transition text-black">Shop</NuxtLink>
            <NuxtLink to="/about" class="hover:opacity-60 transition text-black">About</NuxtLink>
            <NuxtLink to="/contact" class="hover:opacity-60 transition text-black">Contact</NuxtLink>
          </div>
          <div class="flex items-center gap-4">
            <button class="hover:opacity-60 transition text-black">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
            <button @click="cartOpen = true" class="hover:opacity-60 transition relative text-black">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span v-if="cart.length > 0" class="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {{ cart.length }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-16 px-6 bg-white">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="font-heading text-4xl md:text-6xl font-light mb-4 tracking-tight text-black">The Collection</h1>
        <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our complete range of premium products carefully curated for quality and style.
        </p>
      </div>
    </section>

    <!-- Filter Bar -->
    <section class="sticky top-16 bg-white border-b border-gray-200 z-30 px-6 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <p class="text-sm text-gray-600">{{ filteredProducts.length }} items</p>
        <button @click="filterOpen = true" class="flex items-center gap-2 text-sm hover:opacity-60 transition text-black">
          Filter & Sort
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="py-12 px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="product in filteredProducts" :key="product.id" class="group cursor-pointer bg-white">
            <div class="relative bg-gray-50 mb-4 overflow-hidden" style="aspect-ratio: 1/1;">
              <img 
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button class="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100 shadow-md">
                <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
              <div class="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-medium">New</div>
            </div>
            <div class="space-y-2">
              <h3 class="font-heading text-lg font-light tracking-tight text-black">{{ product.name }}</h3>
              <p class="text-sm text-gray-600 line-clamp-1">{{ product.description }}</p>
              <div class="flex items-center justify-between pt-2">
                <p class="text-lg font-medium text-black">£{{ product.price.toFixed(2) }}</p>
                <button 
                  @click="handleAddToCart(product)"
                  class="bg-black text-white px-5 py-2 text-sm font-medium hover:bg-gray-800 transition-colors rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Panel Overlay -->
    <div 
      v-if="filterOpen"
      @click="filterOpen = false"
      class="fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300"
    ></div>

    <!-- Filter Panel -->
    <div 
      :class="['fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl transition-transform duration-300', filterOpen ? 'translate-x-0' : 'translate-x-full']"
    >
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 class="font-heading text-xl font-light tracking-tight text-black">Filter & Sort</h2>
          <button @click="filterOpen = false" class="hover:opacity-60 transition text-black">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <!-- Sort By -->
          <div class="border-b border-gray-200 pb-4">
            <div class="flex justify-between items-center text-sm text-black">
              <span>Sort by</span>
              <span class="text-gray-400">Recommended</span>
            </div>
          </div>

          <!-- Category Filter -->
          <div class="border-b border-gray-200 pb-4">
            <button @click="expandedSections.category = !expandedSections.category" class="w-full flex justify-between items-center mb-3 text-black">
              <span>Category</span>
              <svg :class="['w-5 h-5 transition-transform', expandedSections.category && 'rotate-180']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="expandedSections.category" class="space-y-2 pl-2">
              <label v-for="cat in categories" :key="cat" class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black">
                <input type="checkbox" class="w-4 h-4 rounded border-gray-300">
                <span>{{ cat }}</span>
              </label>
            </div>
          </div>

          <!-- Color Filter -->
          <div class="border-b border-gray-200 pb-4">
            <button @click="expandedSections.color = !expandedSections.color" class="w-full flex justify-between items-center mb-3 text-black">
              <span>Color</span>
              <svg :class="['w-5 h-5 transition-transform', expandedSections.color && 'rotate-180']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="expandedSections.color" class="grid grid-cols-6 gap-2 pl-2">
              <div 
                v-for="color in colors" 
                :key="color.name"
                :class="['w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer hover:border-black transition-colors', color.class]"
                :title="color.name"
              ></div>
            </div>
          </div>

          <!-- Price Range -->
          <div class="pb-4">
            <button @click="expandedSections.price = !expandedSections.price" class="w-full flex justify-between items-center mb-3 text-black">
              <span>Price Range</span>
              <svg :class="['w-5 h-5 transition-transform', expandedSections.price && 'rotate-180']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="expandedSections.price" class="space-y-2 pl-2">
              <label v-for="range in priceRanges" :key="range" class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black">
                <input type="checkbox" class="w-4 h-4 rounded border-gray-300">
                <span>{{ range }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 space-y-3">
          <button class="w-full text-sm text-gray-600 hover:text-black transition">
            Reset all filters
          </button>
          <button @click="filterOpen = false" class="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors rounded">
            See the {{ filteredProducts.length }} product(s)
          </button>
        </div>
      </div>
    </div>

    <!-- Cart Panel Overlay -->
    <div 
      v-if="cartOpen"
      @click="cartOpen = false"
      class="fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300"
    ></div>

    <!-- Cart Panel -->
    <div 
      :class="['fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl transition-transform duration-300', cartOpen ? 'translate-x-0' : 'translate-x-full']"
    >
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 class="font-heading text-xl font-light tracking-tight text-black">Shopping Cart</h2>
          <button @click="cartOpen = false" class="hover:opacity-60 transition text-black">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="cart.length === 0" class="text-center text-gray-500 mt-20">
            Your cart is empty
          </div>
          <div v-else class="space-y-4">
            <div v-for="(item, index) in cart" :key="index" class="flex gap-4 border-b border-gray-100 pb-4">
              <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded" />
              <div class="flex-1">
                <h3 class="font-heading text-sm font-light text-black">{{ item.name }}</h3>
                <p class="text-sm text-gray-600">£{{ item.price.toFixed(2) }}</p>
              </div>
              <button @click="removeFromCart(index)" class="text-gray-400 hover:text-black transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="cart.length > 0" class="p-6 border-t border-gray-200 space-y-4">
          <div class="flex justify-between text-black">
            <span>Subtotal</span>
            <span class="font-semibold">£{{ cartTotal.toFixed(2) }}</span>
          </div>
          <button class="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors rounded">
            Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div 
      v-if="showNotification"
      class="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded shadow-lg z-50 animate-fade-in"
    >
      ✓ {{ notification }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
}

const { isAuthenticated } = useAuth()
const router = useRouter()

const navVisible = ref(true)
const filterOpen = ref(false)
const cartOpen = ref(false)
const showNotification = ref(false)
const notification = ref('')
const cart = ref<Product[]>([])

const expandedSections = ref({
  category: true,
  color: false,
  price: false
})

const filteredProducts = ref<Product[]>([
  { id: 1, name: 'Premium Essentials', price: 99.99, description: 'High-quality everyday products', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', category: 'Essentials' },
  { id: 2, name: 'Luxury Collection', price: 199.99, description: 'Exclusive premium items', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', category: 'Luxury' },
  { id: 3, name: 'Classic Series', price: 79.99, description: 'Timeless design classics', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500', category: 'Classic' },
  { id: 4, name: 'Modern Lifestyle', price: 149.99, description: 'Contemporary essentials', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', category: 'Modern' },
  { id: 5, name: 'Elite Selection', price: 249.99, description: 'Premium curated picks', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500', category: 'Luxury' },
  { id: 6, name: 'Standard Plus', price: 119.99, description: 'Quality meets value', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500', category: 'Essentials' }
])

const categories = ['Essentials', 'Luxury', 'Classic', 'Modern']
const priceRanges = ['Under £100', '£100 - £200', 'Over £200']
const colors = [
  { name: 'Black', class: 'bg-black' },
  { name: 'White', class: 'bg-white border-gray-400' },
  { name: 'Beige', class: 'bg-amber-100' },
  { name: 'Blue', class: 'bg-blue-500' },
  { name: 'Red', class: 'bg-red-500' },
  { name: 'Gold', class: 'bg-yellow-500' }
]

const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price, 0)
})

let lastScrollY = 0
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.pageYOffset
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navVisible.value = false
      } else {
        navVisible.value = true
      }
      
      lastScrollY = currentScrollY
      ticking = false
    })
    
    ticking = true
  }
}

const handleAddToCart = (product: Product) => {
  if (!isAuthenticated.value) {
    notification.value = 'Please login to add items to cart'
    showNotification.value = true
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return
  }

  cart.value.push(product)
  notification.value = `${product.name} added to cart!`
  showNotification.value = true
  
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

const removeFromCart = (index: number) => {
  cart.value.splice(index, 1)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
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

.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>