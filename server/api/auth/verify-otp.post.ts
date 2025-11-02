// server/api/auth/verify-otp.post.ts
import { connectDB } from '~/server/db/connection'
import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    const { email, otp } = await readBody(event)

    if (!email || !otp) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and OTP are required'
      })
    }

    // Find OTP record
    const otpRecord = await mongoose.connection.collection('otps').findOne({ email })

    if (!otpRecord) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No OTP found. Request a new one.'
      })
    }

    // Check if OTP is expired
    if (new Date() > new Date(otpRecord.expiresAt)) {
      await mongoose.connection.collection('otps').deleteOne({ email })
      throw createError({
        statusCode: 400,
        statusMessage: 'OTP expired. Request a new one.'
      })
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid OTP'
      })
    }

    // Mark OTP as verified
    await mongoose.connection.collection('otps').updateOne(
      { email },
      { $set: { verified: true } }
    )

    return {
      success: true,
      message: 'OTP verified'
    }
  } catch (error: any) {
    console.error('Verify OTP error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to verify OTP'
    })
  }
})