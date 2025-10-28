<template>
  <div class="w-full">
    <!-- Hero Section - Premium Luxury -->
    <section class="bg-black relative overflow-hidden py-20 sm:py-32 md:py-40 px-4 sm:px-6">
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-gray-900 rounded-full blur-3xl opacity-30 -mr-48"></div>
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-gray-900 rounded-full blur-3xl opacity-20 -ml-32"></div>
      
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <p class="text-gray-400 text-sm sm:text-base tracking-widest uppercase mb-4 font-semibold">Curated Luxury</p>
        <h1 class="font-heading text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Exclusive. 
          <br />
          <span class="text-gray-300">Refined.</span>
          <br />
          Extraordinary.
        </h1>
        <p class="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover our handpicked collection of premium goods. Each piece represents excellence, craftsmanship, and timeless elegance.
        </p>
        <NuxtLink to="/shop" class="inline-block bg-white text-black px-8 sm:px-10 py-3 sm:py-4 font-semibold rounded text-base sm:text-lg hover:bg-gray-200 transition transform hover:scale-105">
          Explore Collection
        </NuxtLink>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-gray-950 py-12 sm:py-16 px-4 sm:px-6 border-y border-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div class="text-center">
            <p class="text-3xl sm:text-4xl font-bold text-white mb-2">15+</p>
            <p class="text-gray-400 text-sm">Years Refined</p>
          </div>
          <div class="text-center">
            <p class="text-3xl sm:text-4xl font-bold text-white mb-2">50K+</p>
            <p class="text-gray-400 text-sm">Satisfied Clients</p>
          </div>
          <div class="text-center">
            <p class="text-3xl sm:text-4xl font-bold text-white mb-2">100+</p>
            <p class="text-gray-400 text-sm">Luxury Items</p>
          </div>
          <div class="text-center">
            <p class="text-3xl sm:text-4xl font-bold text-white mb-2">4.9★</p>
            <p class="text-gray-400 text-sm">Client Reviews</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-heading text-4xl sm:text-5xl font-bold text-black text-center mb-4 sm:mb-6">Why Sanders</h2>
        <p class="text-gray-600 text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          We believe luxury is more than just a price tag. It's about quality, authenticity, and the care we put into every detail.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          <!-- Features Loop -->
          <div 
            v-for="(feature, idx) in features" 
            :key="idx"
            :ref="(el) => { if (el) featureRefs[idx] = el }"
            :class="['flex gap-6 transition-all duration-700', visibleFeatures[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
          >
            <div class="flex-shrink-0 w-16 h-16 bg-black rounded-lg flex items-center justify-center text-white text-2xl flex-none">
              {{ feature.icon }}
            </div>
            <div class="flex-1">
              <h3 class="font-heading text-xl sm:text-2xl font-bold text-black mb-3">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products - Luxury Spotlight -->
    <section class="bg-gray-50 py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12 sm:mb-16">
          <p class="text-gray-500 text-sm tracking-widest uppercase mb-3">Exclusive Showcase</p>
          <h2 class="font-heading text-4xl sm:text-5xl font-bold text-black mb-4">Featured Luxury Items</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Explore our curated selection of the season's most exclusive pieces</p>
        </div>

        <!-- Carousel Container -->
        <div class="relative overflow-hidden -mx-4 sm:-mx-6">
          <div class="flex gap-3 sm:gap-6 overflow-x-auto pb-4 scroll-smooth px-4 sm:px-6" ref="carousel">
            <div v-for="product in products" :key="product.id" class="flex-shrink-0 w-5/6 sm:w-1/2 lg:w-1/4 group">
              <!-- Product Card -->
              <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition transform hover:scale-105 cursor-pointer flex flex-col h-full relative">
                <!-- Image Container -->
                <div class="relative w-full h-48 sm:h-56 bg-gray-300 overflow-hidden flex-shrink-0">
                  <img 
                    v-if="product.image" 
                    :src="product.image" 
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-xs sm:text-sm">
                    <span>Product Image</span>
                  </div>
                  <div class="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded text-xs font-semibold">
                    EXCLUSIVE
                  </div>
                </div>

                <!-- Product Info -->
                <div class="p-3 sm:p-4 flex flex-col flex-grow">
                  <h3 class="font-heading font-bold text-black text-sm sm:text-base line-clamp-2 mb-2">{{ product.name }}</h3>
                  <p class="text-xl sm:text-2xl font-bold text-black mb-3">£{{ product.price }}</p>
                  <button class="mt-auto w-full bg-black text-white py-2 rounded text-xs sm:text-sm font-semibold hover:bg-gray-800 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Navigation -->
        <div class="flex gap-2 sm:gap-3 justify-center mt-6 sm:mt-8">
          <button 
            @click="scrollCarousel('left')"
            class="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition text-base sm:text-lg"
          >
            ←
          </button>
          <button 
            @click="scrollCarousel('right')"
            class="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition text-base sm:text-lg"
          >
            →
          </button>
        </div>

        <!-- View All Button -->
        <div class="text-center mt-8 sm:mt-12">
          <NuxtLink to="/shop" class="inline-block border-2 border-black text-black px-8 py-3 rounded font-semibold hover:bg-black hover:text-white transition">
            View All Collections
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="bg-black py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-heading text-4xl sm:text-5xl font-bold text-white text-center mb-4">What Our Clients Say</h2>
        <p class="text-gray-400 text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          Join thousands of satisfied customers who have experienced luxury redefined
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="bg-gray-900 p-6 sm:p-8 rounded-lg border border-gray-800">
            <div class="flex gap-1 mb-4">
              <span v-for="i in 5" :key="i" class="text-yellow-500">★</span>
            </div>
            <p class="text-gray-300 mb-6 text-sm sm:text-base">{{ testimonial.text }}</p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                {{ testimonial.initials }}
              </div>
              <div>
                <p class="font-semibold text-white text-sm sm:text-base">{{ testimonial.name }}</p>
                <p class="text-gray-500 text-xs sm:text-sm">{{ testimonial.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-heading text-4xl sm:text-5xl font-bold text-black mb-6">Elevate Your Lifestyle</h2>
        <p class="text-lg text-gray-600 mb-8">
          Experience the difference that true luxury can make. Explore our exclusive collection today.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/shop" class="inline-block bg-black text-white px-10 py-4 rounded font-semibold hover:bg-gray-800 transition">
            Shop Now
          </NuxtLink>
          <NuxtLink to="/about" class="inline-block border-2 border-black text-black px-10 py-4 rounded font-semibold hover:bg-black hover:text-white transition">
            Learn About Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const carousel = ref(null)
let autoScrollInterval = null
const scrollAmount = 350

// Scroll reveal
const featureRefs = ref([])
const visibleFeatures = ref([false, false, false, false])

const features = ref([
  { icon: '✓', title: 'Premium Selection', description: 'Handpicked items from the world\'s finest manufacturers. We only stock products that meet our exacting standards.' },
  { icon: '◆', title: 'Authentic Luxury', description: 'Every product is 100% authentic and verified. We guarantee the integrity of every item in our collection.' },
  { icon: '★', title: 'Expert Curation', description: 'Our team of luxury experts carefully curates each collection to bring you the finest available options.' },
  { icon: '✦', title: 'White Glove Service', description: 'Personalized support from order to delivery. We ensure a seamless experience at every touchpoint.' },
])

// Sample products
const products = ref([
  { id: 1, name: 'Premium Collection', price: 299.99, image: '/images/picture-1.jpg' },
  { id: 2, name: 'Luxury Series', price: 399.99, image: '/images/picture-2.jpg' },
  { id: 3, name: 'Elite Edition', price: 349.99, image: '/images/picture-3.jpg' },
  { id: 4, name: 'Exclusive Line', price: 449.99, image: '/images/picture-4.jpg' },
  { id: 5, name: 'Heritage Plus', price: 499.99, image: '/images/picture-5.jpg' },
  { id: 6, name: 'Signature Luxury', price: 379.99, image: '/images/picture-6.jpg' },
  { id: 7, name: 'Premium Select', price: 419.99, image: '/images/picture-7.jpg' },
  { id: 8, name: 'Ultimate Class', price: 539.99, image: '/images/picture-8.jpg' },
])

const testimonials = ref([
  { 
    id: 1, 
    name: 'Alexandra Mitchell', 
    title: 'Luxury Enthusiast', 
    initials: 'AM',
    text: 'Sanders has completely redefined my understanding of premium quality. Every product is a masterpiece.' 
  },
  { 
    id: 2, 
    name: 'James Richardson', 
    title: 'Collector', 
    initials: 'JR',
    text: 'The curation at Sanders is unmatched. I\'ve found pieces here that I couldn\'t find anywhere else.' 
  },
  { 
    id: 3, 
    name: 'Victoria Chen', 
    title: 'Design Curator', 
    initials: 'VC',
    text: 'Exceptional service combined with genuine luxury. This is what true elegance looks like.' 
  },
])

const scrollCarousel = (direction) => {
  if (!carousel.value) return
  if (direction === 'left') {
    carousel.value.scrollLeft -= scrollAmount
  } else {
    carousel.value.scrollLeft += scrollAmount
  }
}

const startAutoScroll = () => {
  if (autoScrollInterval) return
  autoScrollInterval = setInterval(() => {
    if (carousel.value) {
      carousel.value.scrollLeft += scrollAmount
      // Loop back to start when reaching end
      if (carousel.value.scrollLeft >= carousel.value.scrollWidth - carousel.value.clientWidth) {
        carousel.value.scrollLeft = 0
      }
    }
  }, 4000)
}

const stopAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
    autoScrollInterval = null
  }
}

// Scroll reveal observer
const setupScrollObservers = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = featureRefs.value.indexOf(entry.target)
        if (index !== -1 && entry.isIntersecting) {
          visibleFeatures.value[index] = true
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  featureRefs.value.forEach((el) => {
    if (el) observer.observe(el)
  })
}

onMounted(() => {
  startAutoScroll()
  setTimeout(() => setupScrollObservers(), 100)
})

onUnmounted(() => {
  stopAutoScroll()
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
}
</style>