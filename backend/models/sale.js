const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const SaleSchema =
new Schema({

    customer: {

        type:
        mongoose.Schema.Types.ObjectId,

        ref: 'User'

    },

    products: [

        {

            name: String,

            price: Number,

            quantity: Number,

            image: String

        }

    ],

    total: {

        type: Number,

        required: true

    },

    status: {

        type: String,

        default: 'pending'

    }

},
{
    timestamps: true
});

module.exports =
mongoose.model(
    'Sale',
    SaleSchema
);