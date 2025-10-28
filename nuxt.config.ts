// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true },
//   modules: ['@nuxtjs/tailwindcss','@nuxt/eslint', '@nuxt/image', '@nuxt/ui']
// })

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    // Handles Tailwind v4 automatically
    '@nuxt/ui',
    '@nuxtjs/google-fonts'
  ],
  css: ['~/assets/css/main.css'], //This is important 
  ui: {
    prefix: 'Nuxt',
  }
})