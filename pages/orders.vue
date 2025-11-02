<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">My Orders</h1>
        <p class="text-base sm:text-lg text-gray-300">Track and manage your orders</p>
      </div>
    </section>

    <!-- Orders Section -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12">
          <p class="text-gray-600 text-lg">Loading your orders...</p>
        </div>

        <!-- No Orders -->
        <div v-else-if="orders.length === 0" class="text-center py-12">
          <p class="text-gray-600 text-lg mb-4">You don't have any orders yet</p>
          <NuxtLink to="/shop" class="text-blue-600 hover:underline font-semibold">Start Shopping →</NuxtLink>
        </div>

        <!-- Orders List -->
        <div v-else class="space-y-6">
          <div v-for="order in orders" :key="order._id" class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
            <!-- Order Header -->
            <div class="flex justify-between items-start mb-4 pb-4 border-b border-gray-200">
              <div>
                <h3 class="font-bold text-lg text-black">Order #{{ order._id.slice(-8) }}</h3>
                <p class="text-gray-600 text-sm">{{ formatDate(order.createdAt) }}</p>
              </div>
              <div class="text-right">
                <p class="status-badge" :class="`status-${order.status}`">{{ order.status }}</p>
              </div>
            </div>

            <!-- Order Items -->
            <div class="mb-4 pb-4 border-b border-gray-200">
              <h4 class="font-semibold text-black mb-3">Items</h4>
              <div class="space-y-2">
                <div v-for="product in order.products" :key="product._id" class="flex justify-between text-sm text-gray-700">
                  <span>{{ product.name }}</span>
                  <span class="font-semibold">${{ product.price }}</span>
                </div>
              </div>
            </div>

            <!-- Order Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p class="text-gray-600 text-sm mb-1">Total Price</p>
                <p class="font-bold text-black text-lg">${{ order.totalPrice }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm mb-1">Order ID</p>
                <p class="font-mono text-black text-sm break-all">{{ order._id }}</p>
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex justify-end">
              <NuxtLink 
                :to="`/order-confirmation/${order._id}`"
                class="text-blue-600 hover:text-blue-800 font-semibold transition"
              >
                View Details →
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {{ error }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

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
  status: 'pending' | 'completed' | 'shipped'
  createdAt: string
  updatedAt: string
}

const { user } = useAuth()
const orders = ref<Order[]>([])
const isLoading = ref(false)
const error = ref('')

// Use auth middleware to protect this page
definePageMeta({
  middleware: 'auth'
})

onMounted(async () => {
  await fetchOrders()
})

const fetchOrders = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const response = await $fetch<any>('/api/orders/user', {
      method: 'GET'
    })

    if (response?.orders) {
      orders.value = response.orders
    }
  } catch (err: any) {
    error.value = err.data?.message || err.message || 'Failed to load orders'
    console.error('Error fetching orders:', err)
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  display: inline-block;
}

.status-pending {
  background-color: rgba(251, 191, 36, 0.2);
  color: #b45309;
}

.status-completed {
  background-color: rgba(34, 197, 94, 0.2);
  color: #166534;
}

.status-shipped {
  background-color: rgba(59, 130, 246, 0.2);
  color: #1e40af;
}
</style>