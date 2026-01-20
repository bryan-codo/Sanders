// middleware/guest.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only run on client
  if (!import.meta.client) {
    return
  }

  const { isAuthenticated, isChecking, checkAuth } = useAuth()

  // If still checking auth, wait for it
  if (isChecking.value) {
    await checkAuth()
  }

  // If already authenticated, redirect to account
  if (isAuthenticated.value) {
    return navigateTo('/account')
  }
})