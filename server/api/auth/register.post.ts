// server/api/auth/register.post.ts
import { connectDB } from '~/server/db/connection'
import User from '~/server/db/models/User'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    const { email, name, password } = await readBody(event)

    if (!email || !name || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email, name, and password are required'
      })
    }

    // Check if OTP was verified
    const otpRecord = await mongoose.connection.collection('otps').findOne({ email })

    if (!otpRecord || !otpRecord.verified) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email not verified. Please verify OTP first.'
      })
    }

    // Check if user already exists
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
      email,
      name,
      password: hashedPassword
    })

    // Delete OTP record
    await mongoose.connection.collection('otps').deleteOne({ email })

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

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create account'
    })
  }
})