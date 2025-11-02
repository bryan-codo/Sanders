// composables/useAuth.ts
import { useState } from '#app'
import { useRouter } from 'vue-router'

interface User {
  id: string
  email: string
  name: string
}

export const useAuth = () => {
  const router = useRouter()
  const user = useState<User | null>('auth.user', () => null)
  const isAuthenticated = useState<boolean>('auth.isAuthenticated', () => false)
  const isChecking = useState<boolean>('auth.isChecking', () => true)

  // Load auth from localStorage on client
  const loadFromStorage = () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem('auth.user')
        if (stored) {
          user.value = JSON.parse(stored)
          isAuthenticated.value = true
        }
      } catch (error) {
        console.error('Failed to load auth from storage:', error)
      }
    }
  }

  // Save auth to localStorage
  const saveToStorage = () => {
    if (process.client) {
      try {
        if (user.value) {
          localStorage.setItem('auth.user', JSON.stringify(user.value))
        } else {
          localStorage.removeItem('auth.user')
        }
      } catch (error) {
        console.error('Failed to save auth to storage:', error)
      }
    }
  }

  // Check auth status on mount
  const checkAuth = async () => {
    try {
      isChecking.value = true
      const response = await $fetch<any>('/api/auth/me', {
        method: 'GET'
      })
      
      if (response?.user) {
        user.value = response.user
        isAuthenticated.value = true
        saveToStorage()
      } else {
        user.value = null
        isAuthenticated.value = false
        localStorage.removeItem('auth.user')
      }
    } catch (error) {
      user.value = null
      isAuthenticated.value = false
      localStorage.removeItem('auth.user')
    } finally {
      isChecking.value = false
    }
  }

  // Initialize auth on app start
  const initAuth = async () => {
    // Load from storage first
    loadFromStorage()
    // Then verify with server
    await checkAuth()
  }

  // Login
  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<any>('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      if (response?.user) {
        user.value = response.user
        isAuthenticated.value = true
        saveToStorage()
        return true
      }
      return false
    } catch (error) {
      user.value = null
      isAuthenticated.value = false
      localStorage.removeItem('auth.user')
      throw error
    }
  }

  // Logout
  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST'
      })
    } finally {
      user.value = null
      isAuthenticated.value = false
      localStorage.removeItem('auth.user')
      router.push('/login')
    }
  }

  return {
    user,
    isAuthenticated,
    isChecking,
    checkAuth,
    initAuth,
    login,
    logout,
    loadFromStorage
  }
}