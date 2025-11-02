import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [{
    id: mongoose.Schema.Types.Mixed,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Order', orderSchema)