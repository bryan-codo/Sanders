<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">My Account</h1>
        <p class="text-base sm:text-lg text-gray-300">Manage your profile</p>
      </div>
    </section>

    <!-- Account Section -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <!-- User Info -->
          <div class="mb-8">
            <h2 class="font-heading text-2xl sm:text-3xl font-bold text-black mb-6">Profile Information</h2>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center py-4 border-b border-gray-200">
                <span class="text-gray-600 font-semibold">Name:</span>
                <span class="text-black font-semibold">{{ user?.name || 'N/A' }}</span>
              </div>

              <div class="flex justify-between items-center py-4 border-b border-gray-200">
                <span class="text-gray-600 font-semibold">Email:</span>
                <span class="text-black font-semibold">{{ user?.email || 'N/A' }}</span>
              </div>

              <div class="flex justify-between items-center py-4">
                <span class="text-gray-600 font-semibold">Account Status:</span>
                <span class="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">Active</span>
              </div>
            </div>
          </div>

          <!-- Logout Button -->
          <div class="pt-8 border-t border-gray-200">
            <button
              @click="handleLogout"
              :disabled="isLoggingOut"
              class="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold text-lg transition disabled:bg-red-400"
            >
              {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
            </button>
          </div>

          <!-- Error Message -->
          <p v-if="error" class="text-red-600 text-sm mt-4">{{ error }}</p>
        </div>

        <!-- Additional Info -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 class="font-bold text-black text-lg mb-4">📦 Orders</h3>
            <p class="text-gray-600">View and track your orders</p>
            <NuxtLink to="/orders" class="text-blue-600 hover:underline mt-4 inline-block">View Orders →</NuxtLink>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 class="font-bold text-black text-lg mb-4">⚙️ Settings</h3>
            <p class="text-gray-600">Manage your account settings</p>
            <NuxtLink to="/settings" class="text-blue-600 hover:underline mt-4 inline-block">Go to Settings →</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { user, isAuthenticated, logout, isChecking } = useAuth()
const isLoggingOut = ref(false)
const error = ref('')

onMounted(async () => {
  // Wait for auth check to complete
  while (isChecking.value) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated.value) {
    router.push('/login')
  }
})

const handleLogout = async () => {
  try {
    isLoggingOut.value = true
    error.value = ''
    await logout()
  } catch (err: any) {
    error.value = err.message || 'Logout failed'
    isLoggingOut.value = false
  }
}
</script>