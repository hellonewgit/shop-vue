<template>
  <div class="container mx-auto px-4 py-8">
    <div class="sort-container">
      <label class="text-gray-700 mr-2">Sort by:</label>
      <select 
        v-model="sortType"
        @change="updateSort"
        class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>

    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <div v-else class="products-grid">
      <ProductItem 
        v-for="product in sortedProducts" 
        :key="product.id" 
        :product="product"
      />
    </div>

    <div v-if="store.cart.length > 0" class="cart">
      <h3>Cart Total: ${{ cartTotal.toFixed(2) }}</h3>
      <div class="cart-items">
        <div v-for="item in store.cart" :key="item.id" class="cart-item">
          <span class="cart-item-title">{{ item.title }}</span>
          <div class="cart-item-details">
            <span>${{ item.price.toFixed(2) }} × {{ item.quantity }}</span>
            <button @click="store.removeFromCart(item.id)" class="remove-button">×</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '../stores/products'
import ProductItem from './ProductItem.vue'

const store = useProductStore()
const sortType = ref('default')
const loading = ref(true)

onMounted(async () => {
  await store.fetchProducts()
  loading.value = false
})

const updateSort = () => {
  store.setSortType(sortType.value)
}

const sortedProducts = computed(() => store.sortedProducts)
const cartTotal = computed(() => store.cartTotal)
</script>

<style scoped>
.sort-container {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.cart {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  font-size: 0.9rem;
}

.cart h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
  color: #4f46e5;
}

.cart-items {
  max-height: 200px;
  overflow-y: auto;
}

.cart-item {
  padding: 0.4rem 0;
  border-bottom: 1px solid #eee;
}

.cart-item-title {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.2rem;
}

.cart-item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
}

.remove-button {
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0 0.3rem;
  font-size: 1.2rem;
  line-height: 1;
}

.remove-button:hover {
  color: #ff0000;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .cart {
    width: calc(100% - 2rem);
    max-width: 300px;
  }
}
</style>
