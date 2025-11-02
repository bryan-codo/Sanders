import { connectDB } from '~/server/db/connection'

export default defineEventHandler(async () => {
  try {
    await connectDB()
    return { 
      status: '✅ Success', 
      message: 'Connected to MongoDB!' 
    }
  } catch (error: any) {
    return { 
      status: '❌ Error', 
      message: error.message 
    }
  }
})