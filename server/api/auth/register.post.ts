import { connectDB } from '~/server/db/connection'
import User from '~/server/db/models/User'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    const { name, email, password } = await readBody(event)

    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name, email and password are required'
      })
    }

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email already registered'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    return {
      success: true,
      message: 'Account created successfully',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name
      }
    }
  } catch (error: any) {
    console.error('Register error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Registration failed'
    })
  }
})