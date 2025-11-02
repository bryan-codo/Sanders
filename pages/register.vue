<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">Create Account</h1>
        <p class="text-base sm:text-lg text-gray-300">Join Sanders today</p>
      </div>
    </section>

    <!-- Registration Section -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-md mx-auto">
        <!-- Step 1: Email -->
        <div v-if="step === 1" class="space-y-6">
          <h2 class="font-heading text-2xl font-bold text-black">Enter Your Email</h2>
          <form @submit.prevent="sendOTP" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-black mb-2">Email Address</label>
              <input 
                v-model="form.email" 
                type="email" 
                placeholder="john@example.com"
                class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black text-black bg-white"
                required
              />
            </div>

            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {{ isLoading ? 'Sending...' : 'Send OTP' }}
            </button>

            <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
            
            <p class="text-center text-gray-600">
              Already have an account? 
              <NuxtLink to="/login" class="text-blue-600 hover:underline font-semibold">Login</NuxtLink>
            </p>
          </form>
        </div>

        <!-- Step 2: OTP Verification -->
        <div v-if="step === 2" class="space-y-6">
          <h2 class="font-heading text-2xl font-bold text-black">Verify OTP</h2>
          <p class="text-gray-600 text-sm">We sent a code to <strong>{{ form.email }}</strong></p>
          
          <form @submit.prevent="verifyOTP" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-black mb-2">Enter OTP Code</label>
              <input 
                v-model="form.otp" 
                type="text" 
                placeholder="000000"
                maxlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black text-black bg-white text-center text-2xl tracking-widest"
                required
              />
              <p class="text-gray-600 text-xs mt-2">Code expires in {{ otpTimer }}s</p>
            </div>

            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {{ isLoading ? 'Verifying...' : 'Verify OTP' }}
            </button>

            <button 
              type="button"
              @click="step = 1"
              class="w-full bg-gray-200 text-black py-3 rounded font-bold hover:bg-gray-300 transition"
            >
              Back
            </button>

            <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
          </form>
        </div>

        <!-- Step 3: Create Password -->
        <div v-if="step === 3" class="space-y-6">
          <h2 class="font-heading text-2xl font-bold text-black">Create Password</h2>
          
          <form @submit.prevent="createAccount" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-black mb-2">Full Name</label>
              <input 
                v-model="form.name" 
                type="text" 
                placeholder="John Doe"
                class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black text-black bg-white"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-black mb-2">Password</label>
              <input 
                v-model="form.password" 
                type="password" 
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black text-black bg-white"
                required
                minlength="6"
              />
              <p class="text-gray-600 text-xs mt-1">At least 6 characters</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-black mb-2">Confirm Password</label>
              <input 
                v-model="form.confirmPassword" 
                type="password" 
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black text-black bg-white"
                required
              />
            </div>

            <button 
              type="submit"
              :disabled="isLoading || form.password !== form.confirmPassword"
              class="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {{ isLoading ? 'Creating Account...' : 'Create Account' }}
            </button>

            <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
            <p v-if="success" class="text-green-600 text-sm">{{ success }}</p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const step = ref(1)
const isLoading = ref(false)
const error = ref('')
const success = ref('')
const otpTimer = ref(600)
let timerInterval: any = null

interface Form {
  email: string
  otp: string
  name: string
  password: string
  confirmPassword: string
}

const form = ref<Form>({
  email: '',
  otp: '',
  name: '',
  password: '',
  confirmPassword: ''
})

onMounted(() => {
  // Start timer when step 2 is reached
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

const sendOTP = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const response = await $fetch<any>('/api/auth/send-otp', {
      method: 'POST',
      body: { email: form.value.email }
    })

    if (response?.success) {
      step.value = 2
      otpTimer.value = 600
      startTimer()
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to send OTP'
  } finally {
    isLoading.value = false
  }
}

const verifyOTP = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const response = await $fetch<any>('/api/auth/verify-otp', {
      method: 'POST',
      body: { email: form.value.email, otp: form.value.otp }
    })

    if (response?.success) {
      step.value = 3
      if (timerInterval) clearInterval(timerInterval)
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Invalid OTP'
  } finally {
    isLoading.value = false
  }
}

const createAccount = async () => {
  try {
    if (form.value.password !== form.value.confirmPassword) {
      error.value = 'Passwords do not match'
      return
    }

    isLoading.value = true
    error.value = ''

    const response = await $fetch<any>('/api/auth/register', {
      method: 'POST',
      body: {
        email: form.value.email,
        name: form.value.name,
        password: form.value.password
      }
    })

    if (response?.success) {
      success.value = 'Account created! Redirecting to login...'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to create account'
  } finally {
    isLoading.value = false
  }
}

const startTimer = () => {
  timerInterval = setInterval(() => {
    otpTimer.value--
    if (otpTimer.value <= 0) {
      clearInterval(timerInterval)
      error.value = 'OTP expired. Please request a new one.'
      step.value = 1
    }
  }, 1000)
}
</script>