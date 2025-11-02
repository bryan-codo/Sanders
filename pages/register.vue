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
              <h1 class="font-heading text-4xl font-bold text-black mb-2">Create Account</h1>
              <p class="text-gray-600">Join Sanders Store today</p>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-6">
              <!-- Full Name Input -->
              <div>
                <label class="block text-sm font-semibold text-black mb-3">Full Name</label>
                <div class="relative group">
                  <input 
                    v-model="form.name"
                    type="text" 
                    placeholder="John Doe"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition bg-white text-black placeholder-gray-400"
                    required
                  />
                  <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition -z-10"></div>
                </div>
              </div>

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

              <!-- Confirm Password Input -->
              <div>
                <label class="block text-sm font-semibold text-black mb-3">Confirm Password</label>
                <div class="relative group">
                  <input 
                    v-model="form.confirmPassword"
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
                <p class="font-semibold">Sign Up Failed</p>
                <p class="text-sm">{{ error }}</p>
              </div>

              <!-- Loading State -->
              <div v-if="loading" class="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded">
                <p class="font-semibold">Creating account...</p>
              </div>

              <!-- Terms Agreement -->
              <label class="flex items-start cursor-pointer">
                <input type="checkbox" class="w-4 h-4 rounded border-gray-300 mt-1" required>
                <span class="ml-2 text-gray-600 text-sm">I agree to the <a href="#" class="text-black font-semibold hover:underline">Terms of Service</a> and <a href="#" class="text-black font-semibold hover:underline">Privacy Policy</a></span>
              </label>

              <!-- Register Button -->
              <button 
                type="submit"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 rounded-lg font-bold text-lg hover:from-gray-800 hover:to-black transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {{ loading ? 'Creating Account...' : 'Create Account' }}
              </button>
            </form>

            <!-- Divider -->
            <div class="my-8 flex items-center">
              <div class="flex-1 border-t border-gray-200"></div>
              <span class="px-4 text-gray-500 text-sm font-medium">ALREADY HAVE AN ACCOUNT?</span>
              <div class="flex-1 border-t border-gray-200"></div>
            </div>

            <!-- Login Link -->
            <p class="text-center text-gray-600">
              Already signed up? 
              <NuxtLink to="/login" class="text-black font-bold hover:text-gray-700 transition">Sign in here</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const error = ref('')

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const form = ref<RegisterForm>({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = async () => {
  loading.value = true
  error.value = ''

  try {
    // Validate passwords match
    if (form.value.password !== form.value.confirmPassword) {
      error.value = 'Passwords do not match'
      return
    }

    // Validate password length
    if (form.value.password.length < 6) {
      error.value = 'Password must be at least 6 characters'
      return
    }

    const response = await $fetch<any>('/api/auth/register', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password
      }
    })

    // Redirect to login after successful registration
    router.push('/login')
  } catch (err: any) {
    error.value = err.data?.message || 'Registration failed. Please try again.'
    console.error('Register error:', err)
  } finally {
    loading.value = false
  }
}
</script>