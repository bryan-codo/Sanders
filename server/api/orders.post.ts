import { connectDB } from '~/server/db/connection'
import Order from '~/server/db/models/Order'
import { verifyJWT } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Get user from token
    const token = getCookie(event, 'auth')
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authenticated'
      })
    }

    const decoded: any = verifyJWT(token)
    const { items, totalPrice, billing } = await readBody(event)

    if (!items || !totalPrice) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Items and total price are required'
      })
    }

    // Create order
    const order = await Order.create({
      userId: decoded.id,
      products: items,
      totalPrice,
      billing,
      status: 'pending'
    })

    return {
      success: true,
      orderId: order._id.toString(),
      order: {
        id: order._id.toString(),
        totalPrice: order.totalPrice,
        items: order.products,
        status: order.status
      }
    }
  } catch (error: any) {
    console.error('Order creation error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to create order'
    })
  }
})