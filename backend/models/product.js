const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {

        type: String,

        required: true,

        trim: true,

        minlength: 2
    },

    description: {

        type: String,

        required: true,

        trim: true
    },

    category: {

        type: String,

        required: true
    },

    price: {

        type: Number,

        required: true,

        min: [0, 'Price cannot be negative']
    },

    stock: {

        type: Number,

        required: true,

        min: [0, 'Stock cannot be negative'],

        default: 0
    },

    image: {

        type: String,

        default: 'default.jpg'
    },

    supermarket: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Supermarket',

        required: true
    }

});

module.exports =mongoose.model('Product',productSchema);