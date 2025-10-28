// composables/useScrollReveal.ts
import { ref, onMounted, onUnmounted } from 'vue'

export const useScrollReveal = () => {
  const elementRef = ref(null)
  const isVisible = ref(false)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          // Optionally stop observing after it's been revealed
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -100px 0px', // Start animation 100px before element enters viewport
    }
  )

  onMounted(() => {
    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  return {
    elementRef,
    isVisible,
  }
}