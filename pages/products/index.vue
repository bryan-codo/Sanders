<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">All Products</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, image: 'https://via.placeholder.com/300x300?text=Headphones' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://via.placeholder.com/300x300?text=Watch' },
  { id: 3, name: 'USB-C Cable', price: 19.99, image: 'https://via.placeholder.com/300x300?text=Cable' },
  { id: 4, name: 'Phone Case', price: 29.99, image: 'https://via.placeholder.com/300x300?text=Phone+Case' },
  { id: 5, name: 'Screen Protector', price: 9.99, image: 'https://via.placeholder.com/300x300?text=Protector' },
  { id: 6, name: 'Portable Charger', price: 49.99, image: 'https://via.placeholder.com/300x300?text=Charger' },
];
</script>