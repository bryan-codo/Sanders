// server/api/auth/send-otp.post.ts
import { connectDB } from '~/server/db/connection'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'

// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Email transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    const { email } = await readBody(event)

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email is required'
      })
    }

    // Check if user already exists
    const existingUser = await mongoose.connection.collection('users').findOne({ email })
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email already registered'
      })
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store OTP in database
    await mongoose.connection.collection('otps').updateOne(
      { email },
      {
        $set: {
          email,
          otp,
          expiresAt,
          createdAt: new Date()
        }
      },
      { upsert: true }
    )

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Sanders Registration',
      html: `
        <h2>Registration OTP</h2>
        <p>Your One-Time Password is:</p>
        <h1 style="color: #000; font-size: 36px; letter-spacing: 5px;">${otp}</h1>
        <p>This code expires in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    })

    return {
      success: true,
      message: 'OTP sent to email'
    }
  } catch (error: any) {
    console.error('Send OTP error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send OTP'
    })
  }
})