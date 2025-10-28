<template>
  <div class="bg-white rounded-lg shadow hover:shadow-lg transition">
    <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover rounded-t-lg" />
    <div class="p-4">
      <NuxtLink :to="`/products/${product.id}`" class="font-bold text-lg hover:text-blue-600">
        {{ product.name }}
      </NuxtLink>
      <p class="text-blue-600 font-bold text-lg my-2">${{ product.price }}</p>
      <button
        @click="addToCart"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold transition"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();

const addToCart = () => {
  cartStore.addItem(props.product);
};
</script>