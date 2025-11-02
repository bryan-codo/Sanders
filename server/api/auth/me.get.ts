// server/api/auth/me.get.ts
import { connectDB } from '~/server/db/connection'
import User from '~/server/db/models/User'
import { verifyJWT } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Get token from cookie
    const token = getCookie(event, 'auth')

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authenticated'
      })
    }

    // Verify token
    const decoded: any = verifyJWT(token)

    if (!decoded || !decoded.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      })
    }

    // Find user
    const user = await User.findById(decoded.id)

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found'
      })
    }

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name
      }
    }
  } catch (error: any) {
    console.error('Auth check error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }
})