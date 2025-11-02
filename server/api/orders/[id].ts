import { defineEventHandler, getRouterParam } from 'h3'
import mongoose from 'mongoose'
import { connectDB } from '~/server/db/connection'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Order ID is required' 
    })
  }

  try {
    // Connect to MongoDB
    await connectDB()
    
    // Fetch order from MongoDB using the order ID
    const order = await mongoose.connection.collection('orders').findOne({
      _id: new mongoose.Types.ObjectId(id)
    })

    if (!order) {
      throw createError({ 
        statusCode: 404, 
        statusMessage: 'Order not found' 
      })
    }

    return order
  } catch (error: any) {
    console.error('Error fetching order:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Failed to fetch order' 
    })
  }
})