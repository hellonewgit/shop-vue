<script setup>
import ProductList from './components/ProductList.vue'
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <h1>Vue Shop</h1>
      </div>
    </header>
    <ProductList />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: #4f46e5;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header h1 {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
