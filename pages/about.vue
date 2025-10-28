<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="bg-black text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">Our Story</h1>
            <p class="text-lg text-gray-400 mb-6">
              Founded with a passion for quality and innovation, Sanders Store brings premium products to customers worldwide. We believe in creating products that make a difference.
            </p>
            <p class="text-base text-gray-400 mb-8">
              Our commitment to excellence, sustainability, and customer satisfaction drives everything we do. Every product is carefully crafted to meet the highest standards.
            </p>
            <div class="flex gap-4">
              <div>
                <p class="text-3xl font-bold">10K+</p>
                <p class="text-gray-400 text-sm">Happy Customers</p>
              </div>
              <div>
                <p class="text-3xl font-bold">50+</p>
                <p class="text-gray-400 text-sm">Premium Products</p>
              </div>
              <div>
                <p class="text-3xl font-bold">15</p>
                <p class="text-gray-400 text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 h-64 sm:h-80 md:h-96 rounded-lg flex items-center justify-center text-gray-600">
            <span class="text-center">Brand Story Image</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-black text-center mb-12 sm:mb-16">Our Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-8 rounded-lg">
            <div class="text-4xl mb-4">✨</div>
            <h3 class="font-heading text-2xl font-bold text-black mb-4">Quality First</h3>
            <p class="text-gray-600">We never compromise on quality. Every product undergoes rigorous testing to ensure excellence.</p>
          </div>
          <div class="bg-gray-50 p-8 rounded-lg">
            <div class="text-4xl mb-4">🌍</div>
            <h3 class="font-heading text-2xl font-bold text-black mb-4">Sustainability</h3>
            <p class="text-gray-600">We're committed to sustainable practices and eco-friendly production methods.</p>
          </div>
          <div class="bg-gray-50 p-8 rounded-lg">
            <div class="text-4xl mb-4">💚</div>
            <h3 class="font-heading text-2xl font-bold text-black mb-4">Customer Care</h3>
            <p class="text-gray-600">Your satisfaction is our priority. We provide exceptional support every step of the way.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="bg-gray-50 py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-black text-center mb-12 sm:mb-16">Our Team</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div class="text-center">
            <div class="bg-gray-300 w-24 h-24 mx-auto rounded-full mb-4 flex items-center justify-center text-gray-600">
              Photo
            </div>
            <h3 class="font-heading text-lg font-bold text-black">John Sanders</h3>
            <p class="text-gray-600 text-sm">Founder & CEO</p>
          </div>
          <div class="text-center">
            <div class="bg-gray-300 w-24 h-24 mx-auto rounded-full mb-4 flex items-center justify-center text-gray-600">
              Photo
            </div>
            <h3 class="font-heading text-lg font-bold text-black">Sarah Lee</h3>
            <p class="text-gray-600 text-sm">Head of Design</p>
          </div>
          <div class="text-center">
            <div class="bg-gray-300 w-24 h-24 mx-auto rounded-full mb-4 flex items-center justify-center text-gray-600">
              Photo
            </div>
            <h3 class="font-heading text-lg font-bold text-black">Michael Chen</h3>
            <p class="text-gray-600 text-sm">Operations Lead</p>
          </div>
          <div class="text-center">
            <div class="bg-gray-300 w-24 h-24 mx-auto rounded-full mb-4 flex items-center justify-center text-gray-600">
              Photo
            </div>
            <h3 class="font-heading text-lg font-bold text-black">Emma Davis</h3>
            <p class="text-gray-600 text-sm">Customer Success</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-black py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-3xl mx-auto text-center text-white">
        <h2 class="font-heading text-3xl sm:text-4xl font-bold mb-6">Join Our Community</h2>
        <p class="text-gray-400 mb-8">Be part of something special. Explore our collection and experience the Sanders difference.</p>
        <NuxtLink to="/shop" class="inline-block bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition">
          Shop Now
        </NuxtLink>
      </div>
    </section>
  </div>
</template>