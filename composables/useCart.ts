// composables/useCart.ts
import { useState } from '#app'

interface Product {
  id: number | string
  name: string
  price: number
  image?: string
  description?: string
  quantity?: number
}

interface CartItem extends Product {
  quantity: number
}

export const useCart = () => {
  // Create state
  const items = useState<CartItem[]>('cart.items', () => [])
  const isInitialized = useState<boolean>('cart.initialized', () => false)

  // Load cart from localStorage on client
  const loadFromStorage = () => {
    if (process.client && !isInitialized.value) {
      try {
        const stored = localStorage.getItem('cart.items')
        if (stored) {
          items.value = JSON.parse(stored)
        }
        isInitialized.value = true
      } catch (error) {
        console.error('Failed to load cart from storage:', error)
        isInitialized.value = true
      }
    }
  }

  // Save cart to localStorage
  const saveToStorage = () => {
    if (process.client) {
      try {
        localStorage.setItem('cart.items', JSON.stringify(items.value))
      } catch (error) {
        console.error('Failed to save cart to storage:', error)
      }
    }
  }

  const addToCart = (product: Product): void => {
    const existing = items.value.find(i => i.id === product.id)
    
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
    saveToStorage()
  }

  const removeFromCart = (productId: number | string): void => {
    items.value = items.value.filter(i => i.id !== productId)
    saveToStorage()
  }

  const updateQuantity = (productId: number | string, quantity: number): void => {
    const item = items.value.find(i => i.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
      saveToStorage()
    }
  }

  const getTotal = (): number => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const clearCart = (): void => {
    items.value = []
    saveToStorage()
  }

  const getItemCount = (): number => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  }

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotal,
    clearCart,
    getItemCount,
    loadFromStorage
  }
}
