    const mongoose = require('mongoose');

    const deliverySchema = new mongoose.Schema({
    sale:    { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
    courier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    supermarket: { type: mongoose.Schema.Types.ObjectId, ref: 'Supermarket', required: true },
    address: { type: String, required: true },
    status: {
        type: String,
        enum: ['available', 'accepted', 'in_transit', 'delivered'],
        default: 'available'
    },
    acceptedAt:  { type: Date },
    deliveredAt: { type: Date }
    }, { timestamps: true });

    module.exports = mongoose.model('Delivery', deliverySchema);