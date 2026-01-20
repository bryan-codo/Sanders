<template>
  <div class="w-full min-h-screen bg-black flex flex-col">
    <!-- Login Form - Centered -->
    <main class="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
      <div class="w-full max-w-md">
        <!-- Premium Card with Gradient Background -->
        <div class="relative">
          <!-- Decorative blur effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
          
          <!-- Main Card -->
          <div class="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 sm:p-12 shadow-2xl border border-gray-100">
            <!-- Header -->
            <div class="text-center mb-8">
              <h1 class="font-heading text-4xl font-bold text-black mb-2">Welcome Back</h1>
              <p class="text-gray-600">Sign in to your Sanders account</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
              <!-- Email Input -->
              <div>
                <label class="block text-sm font-semibold text-black mb-3">Email Address</label>
                <div class="relative group">
                  <input 
                    v-model="form.email"
                    type="email" 
                    placeholder="your@email.com"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition bg-white text-black placeholder-gray-400"
                    required
                  />
                  <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition -z-10"></div>
                </div>
              </div>

              <!-- Password Input -->
              <div>
                <label class="block text-sm font-semibold text-black mb-3">Password</label>
                <div class="relative group">
                  <input 
                    v-model="form.password"
                    type="password" 
                    placeholder="••••••••"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition bg-white text-black placeholder-gray-400"
                    required
                  />
                  <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition -z-10"></div>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
                <p class="font-semibold">Login Failed</p>
                <p class="text-sm">{{ error }}</p>
              </div>

              <!-- Loading State -->
              <div v-if="loading" class="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded">
                <p class="font-semibold">Logging in...</p>
              </div>

              <!-- Remember Me & Forgot Password -->
              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center cursor-pointer">
                  <input type="checkbox" class="w-4 h-4 rounded border-gray-300">
                  <span class="ml-2 text-gray-600">Remember me</span>
                </label>
                <a href="#" class="text-black font-semibold hover:underline">Forgot password?</a>
              </div>

              <!-- Login Button -->
              <button 
                type="submit"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 rounded-lg font-bold text-lg hover:from-gray-800 hover:to-black transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {{ loading ? 'Signing in...' : 'Sign In' }}
              </button>
            </form>

            <!-- Divider -->
            <div class="my-8 flex items-center">
              <div class="flex-1 border-t border-gray-200"></div>
              <span class="px-4 text-gray-500 text-sm font-medium">NEW HERE?</span>
              <div class="flex-1 border-t border-gray-200"></div>
            </div>

            <!-- Sign Up Link -->
            <p class="text-center text-gray-600">
              Don't have an account? 
              <NuxtLink to="/register" class="text-black font-bold hover:text-gray-700 transition">Create one</NuxtLink>
            </p>

            <!-- Footer Text -->
            <p class="text-center text-xs text-gray-500 mt-6">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guests'  // 👈 This uses middleware/guest.ts
})
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { login, isAuthenticated } = useAuth()
const loading = ref(false)
const error = ref('')

interface LoginForm {
  email: string
  password: string
}

const form = ref<LoginForm>({
  email: '',
  password: ''
})

// If already logged in, redirect to home
onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/')
  }
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await login(form.value.email, form.value.password)
    router.push('/')
  } catch (err: any) {
    error.value = err.data?.message || 'Login failed. Please try again.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>