// server/api/auth/login.post.ts
import { connectDB } from '~/server/db/connection'
import User from '~/server/db/models/User'
import { generateJWT } from '~/server/utils/jwt'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    const { email, password } = await readBody(event)

    // Validate input
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required'
      })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }

    // Generate JWT token
    const token = generateJWT({
      id: user._id.toString(),
      email: user.email
    })

    // Set cookie
    setCookie(event, 'auth', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    return {
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name
      }
    }
  } catch (error: any) {
    console.error('Login error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Login failed'
    })
  }
})