// plugins/init.client.ts
export default defineNuxtPlugin(async () => {
  const { loadFromStorage: loadAuth } = useAuth()
  const { loadFromStorage: loadCart } = useCart()

  // Load persisted data on app start
  loadAuth()
  loadCart()
})