<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.title">
    </div>
    <div class="product-info">
      <h2 class="product-title">{{ product.title }}</h2>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-footer">
        <span class="product-price">${{ product.price.toFixed(2) }}</span>
        <button @click="addToCart" class="add-to-cart">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/products'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const store = useProductStore()

const addToCart = () => {
  store.addToCart(props.product)
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  position: relative;
  padding-top: 100%;
  background: #f8f8f8;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.product-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8em;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #4f46e5;
}

.add-to-cart {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart:hover {
  background: #4338ca;
}

@media (max-width: 768px) {
  .product-title {
    font-size: 1rem;
  }

  .product-description {
    font-size: 0.8rem;
  }

  .product-price {
    font-size: 1rem;
  }

  .add-to-cart {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
