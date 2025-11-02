import mongoose from 'mongoose'

let isConnected = false

export async function connectDB() {
  if (isConnected) {
    console.log('Already connected to MongoDB')
    return
  }
  
  try {
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env.local')
    }
    
    await mongoose.connect(mongoUri)
    isConnected = true
    console.log('✅ MongoDB Connected Successfully!')
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error)
    throw error
  }
}