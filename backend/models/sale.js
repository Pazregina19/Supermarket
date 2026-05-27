const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  customerEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Email inválido"]
  },

  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],

  total: {
    type: Number,
    default: 0
  },

  supermarket: {
    type: Schema.Types.ObjectId,
    ref: 'Supermarket'
  }

}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);

