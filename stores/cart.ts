import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface ProductInput {
  id: number
  name: string
  price: number
  image: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    total: 0,
  }),

  getters: {
    cartCount(): number {
      return this.items.length
    },
  },

  actions: {
    addItem(product: ProductInput) {
      const existing = this.items.find((item) => item.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ 
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1 
        })
      }

      this.calculateTotal()
    },

    removeItem(id: number) {
      this.items = this.items.filter((item) => item.id !== id)
      this.calculateTotal()
    },

    updateQuantity(id: number, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(id)
      } else {
        const item = this.items.find((item) => item.id === id)
        if (item) {
          item.quantity = quantity
          this.calculateTotal()
        }
      }
    },

    calculateTotal() {
      this.total = Number(
        this.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
      )
    },

    clearCart() {
      this.items = []
      this.total = 0
    },
  },
})