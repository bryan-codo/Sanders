// server/api/orders/user.get.ts
import { connectDB } from '~/server/db/connection'
import { verifyJWT } from '~/server/utils/jwt'
import mongoose from 'mongoose'
import { parseCookies } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Get token from cookie
    const cookies = parseCookies(event)
    const token = cookies.auth

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

    // Fetch user's orders
    const orders = await mongoose.connection
      .collection('orders')
      .find({
        userId: decoded.id
      })
      .sort({ createdAt: -1 })
      .toArray()

    return {
      orders
    }
  } catch (error: any) {
    console.error('Error fetching user orders:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch orders'
    })
  }
})