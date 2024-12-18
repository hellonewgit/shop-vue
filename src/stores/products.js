import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
    sortType: 'default'
  }),
  
  getters: {
    sortedProducts: (state) => {
      switch (state.sortType) {
        case 'price-asc':
          return [...state.products].sort((a, b) => a.price - b.price)
        case 'price-desc':
          return [...state.products].sort((a, b) => b.price - a.price)
        default:
          return state.products
      }
    },
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        this.products = response.data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    
    setSortType(type) {
      this.sortType = type
    },
    
    addToCart(product) {
      const existingItem = this.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
    },
    
    removeFromCart(productId) {
      const index = this.cart.findIndex(item => item.id === productId)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    }
  }
})
