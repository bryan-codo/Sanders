<template>
  <div>
    <div v-if="!isLoggedIn">
      <h1 class="text-3xl font-bold mb-8">Login</h1>
      <form @submit.prevent="handleLogin" class="max-w-md mx-auto space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full border px-4 py-2 rounded focus:outline-none focus:border-blue-600"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border px-4 py-2 rounded focus:outline-none focus:border-blue-600"
          required
        />
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold">Login</button>
      </form>
    </div>

    <div v-else>
      <h1 class="text-3xl font-bold mb-8">My Account</h1>
      <div class="bg-gray-100 p-6 rounded-lg max-w-md">
        <h2 class="font-bold text-lg mb-4">Welcome back!</h2>
        <p class="mb-4">Email: {{ email }}</p>
        <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-bold">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

const isLoggedIn = ref(false);
const email = ref('');
const password = ref('');

const handleLogin = () => {
  if (email.value && password.value) {
    isLoggedIn.value = true;
  }
};

const handleLogout = () => {
  isLoggedIn.value = false;
  email.value = '';
  password.value = '';
};
</script>