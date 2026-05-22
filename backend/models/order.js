const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  supermarket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supermarket',
    required: true
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number
    }
  ],

  total: {
    type: Number,
    required: true
  },

  deliveryMethod: {
  type: String,
  enum: ['pickup', 'courier'],
  required: true
},

  deliveryCost: {
    type: Number,
    default: 0
  },
  
  courier: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
},

  status: {
  type: String,
  enum: ['pending', 'confirmed', 'in process', 'in delivering', 'delivered', 'canceled'],
  default: 'pending'
}

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);