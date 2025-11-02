// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true },
//   modules: ['@nuxtjs/tailwindcss','@nuxt/eslint', '@nuxt/image', '@nuxt/ui']
// })

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    mongodbUri: process.env.MONGODB_URI
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    //'@nuxt/test-utils',
    // Handles Tailwind v4 automatically
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
  ],
  css: ['~/assets/css/main.css'], //This is important 
  ui: {
    prefix: 'Nuxt',
  }
})

// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true },

//   modules: [
//     '@nuxtjs/google-fonts',
//     '@nuxt/eslint',
//     '@nuxt/image',
//     '@nuxt/scripts',
//     '@nuxt/test-utils',
//     // Handles Tailwind v4 automatically
//     '@nuxt/ui',
//   ],

//   css: ['~/assets/css/main.css'], // This is important

//   googleFonts: {
//     families: {
//       'Outfit': [400, 500, 600, 700],
//       'DM Sans': [400, 500, 600, 700],
//       'Space Grotesk': [600, 700],
//     },
//   },

//   ui: {
//     prefix: 'Nuxt',
//   },

//   // Router configuration
//   router: {
//     options: {
//       hashMode: false, // Use history mode (not hash mode)
//     }
//   },

//   // SSR Configuration
//   ssr: true,

//   // Nitro Configuration for Vercel
//   nitro: {
//     prerender: {
//       crawlLinks: true,
//       routes: ['/sitemap.xml', '/rss.xml'],
//     }
//   },

//   // Build
//   build: {
//     transpile: ['@nuxtjs/google-fonts'],
//   },
// })