<template>
  <div class="flex flex-col min-h-screen bg-black text-white">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-black border-b border-gray-900 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex-shrink-0">
            <h1 class="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-gray-300 transition transform hover:scale-105">Sanders</h1>
          </NuxtLink>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-8 lg:gap-12">
            <NuxtLink to="/shop" class="text-sm lg:text-base font-medium hover:text-gray-300 transition relative group">
              Shop
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink>
            <NuxtLink to="/about" class="text-sm lg:text-base font-medium hover:text-gray-300 transition relative group">
              About
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink>
            <NuxtLink to="/contact" class="text-sm lg:text-base font-medium hover:text-gray-300 transition relative group">
              Contact
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </NuxtLink>
          </nav>

          <!-- Right Section -->
          <div class="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <button class="text-base hover:text-gray-300 transition transform hover:scale-110">🔍</button>
            <button class="text-base hover:text-gray-300 transition transform hover:scale-110">🛒</button>
            <button class="text-base hover:text-gray-300 transition transform hover:scale-110">👤</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content (page-specific content goes here) -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white text-black border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="font-bold mb-4">Shop</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:underline">All Products</a></li>
              <li><a href="#" class="hover:underline">New Arrivals</a></li>
              <li><a href="#" class="hover:underline">Best Sellers</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold mb-4">Company</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:underline">About Us</a></li>
              <li><a href="#" class="hover:underline">Careers</a></li>
              <li><a href="#" class="hover:underline">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold mb-4">Support</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:underline">Help Center</a></li>
              <li><a href="#" class="hover:underline">Contact Us</a></li>
              <li><a href="#" class="hover:underline">Shipping</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:underline">Privacy</a></li>
              <li><a href="#" class="hover:underline">Terms</a></li>
              <li><a href="#" class="hover:underline">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-8 flex items-center justify-between">
          <p class="text-sm text-gray-600">© 2025 Sanders Store. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="text-gray-600 hover:text-black">Twitter</a>
            <a href="#" class="text-gray-600 hover:text-black">Instagram</a>
            <a href="#" class="text-gray-600 hover:text-black">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>