<template>
  <div class="flex flex-col min-h-screen bg-black text-white">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-black border-b border-gray-900 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex-shrink-0">
            <h1 class="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-gray-300 transition transform hover:scale-105">Sanders</h1>
          </NuxtLink>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-8 lg:gap-12">
            <NuxtLink to="/shop" class="text-sm lg:text-base font-medium hover:text-gray-300 transition relative group">
              Shop
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink>
            <NuxtLink to="/about" class="text-sm lg:text-base font-medium hover:text-gray-300 transition relative group">
              About
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink>
            <NuxtLink to="/contact" class="text-sm lg:text-base font-medium hover:text-gray-300 transition relative group">
              Contact
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink>
          </nav>

          <!-- Right Section -->
          <div class="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <!-- Search Button -->
            <button class="text-base hover:text-gray-300 transition transform hover:scale-110" title="Search">
              🔍
            </button>

            <!-- Cart Button with Badge -->
            <NuxtLink 
              to="/cart" 
              class="text-base hover:text-gray-300 transition transform hover:scale-110 relative"
              title="Shopping Cart"
            >
              🛒
              <ClientOnly>
                <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {{ cartCount }}
                </span>
              </ClientOnly>
            </NuxtLink>

            <!-- Account Button -->
            <NuxtLink 
              to="/account" 
              class="text-base hover:text-gray-300 transition transform hover:scale-110"
              title="Account"
            >
              👤
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div class="confirmation-content">
        <div class="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p class="thank-you">Thank you for your purchase</p>

        <div class="order-details" v-if="order">
          <div class="detail-section">
            <h2>Order ID</h2>
            <p class="order-id">{{ orderId }}</p>
          </div>

          <div class="detail-section">
            <h2>Order Status</h2>
            <p class="status" :class="order.status">{{ order.status }}</p>
          </div>

          <div class="detail-section">
            <h2>Total Price</h2>
            <p class="price">${{ order.totalPrice }}</p>
          </div>

          <div class="detail-section">
            <h2>Items Ordered</h2>
            <ul class="items-list" v-if="order.products">
              <li v-for="product in order.products" :key="product._id">
                {{ product.name }} - ${{ product.price }}
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h2>Order Date</h2>
            <p>{{ formatDate(order.createdAt) }}</p>
          </div>
        </div>

        <div class="loading" v-else>
          <p>Loading order details...</p>
        </div>

        <div class="actions">
          <button class="btn btn-primary" @click="navigateTo('/')">
            Continue Shopping
          </button>
          <button class="btn btn-secondary" @click="printOrder">
            Print Receipt
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white text-black border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="font-bold mb-4">Shop</h3>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/shop" class="hover:underline">All Products</NuxtLink></li>
              <li><a href="#" class="hover:underline">New Arrivals</a></li>
              <li><a href="#" class="hover:underline">Best Sellers</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold mb-4">Company</h3>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/about" class="hover:underline">About Us</NuxtLink></li>
              <li><a href="#" class="hover:underline">Careers</a></li>
              <li><a href="#" class="hover:underline">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold mb-4">Support</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:underline">Help Center</a></li>
              <li><NuxtLink to="/contact" class="hover:underline">Contact Us</NuxtLink></li>
              <li><a href="#" class="hover:underline">Shipping</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:underline">Privacy</a></li>
              <li><a href="#" class="hover:underline">Terms</a></li>
              <li><a href="#" class="hover:underline">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-8 flex items-center justify-between">
          <p class="text-sm text-gray-600">© 2025 Sanders Store. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="text-gray-600 hover:text-black">Twitter</a>
            <a href="#" class="text-gray-600 hover:text-black">Instagram</a>
            <a href="#" class="text-gray-600 hover:text-black">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, navigateTo } from '#app'
import { useCart } from '~/composables/useCart'

definePageMeta({
  layout: false
})

interface Product {
  _id: string
  name: string
  price: number
}

interface Order {
  _id: string
  userId: string
  products: Product[]
  totalPrice: number
  status: string
  createdAt: string
  updatedAt: string
}

const route = useRoute()
const order = ref<Order | null>(null)
const orderId = ref('')
const { getItemCount } = useCart()

const cartCount = computed(() => getItemCount())

onMounted(async () => {
  orderId.value = route.params.id as string
  
  if (orderId.value) {
    try {
      console.log('Fetching order:', orderId.value)
      const response = await fetch(`/api/orders/${orderId.value}`)
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Order data:', data)
        order.value = data
      } else {
        const error = await response.text()
        console.error('Failed to fetch order:', response.status, error)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    }
  }
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const printOrder = () => {
  window.print()
}
</script>

<style scoped>
.confirmation-content {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 60px 40px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin: 0 auto 30px;
  animation: scaleIn 0.6s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

h1 {
  font-size: 32px;
  color: white;
  margin: 0 0 10px;
}

.thank-you {
  color: #9ca3af;
  font-size: 16px;
  margin-bottom: 40px;
}

.order-details {
  text-align: left;
  background: rgba(255, 255, 255, 0.08);
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.detail-section h2 {
  font-size: 14px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 8px;
  font-weight: 600;
}

.detail-section p {
  margin: 0;
  font-size: 16px;
  color: white;
}

.order-id {
  font-family: monospace;
  font-size: 14px;
  word-break: break-all;
  color: #60a5fa;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
}

.status {
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
}

.status.pending {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.status.completed {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.status.shipped {
  background: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
}

.items-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.items-list li {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  color: #d1d5db;
}

.items-list li:last-child {
  border-bottom: none;
}

.loading {
  padding: 40px 0;
  color: #9ca3af;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: white;
  color: black;
}

.btn-primary:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

@media print {
  header, footer {
    display: none;
  }

  .confirmation-content {
    background: white;
    color: black;
    border: none;
  }

  .actions {
    display: none;
  }

  h1, .detail-section p, .order-id {
    color: black;
  }
}

@media (max-width: 600px) {
  .confirmation-content {
    padding: 40px 20px;
  }

  h1 {
    font-size: 24px;
  }

  .success-icon {
    width: 60px;
    height: 60px;
    font-size: 36px;
  }

  .order-details {
    padding: 20px;
  }
}
</style>