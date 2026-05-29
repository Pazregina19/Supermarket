const Order = require('../../models/order');

let controller = {};

// Create order
controller.create = async (req,res) => {

  try {

    const order =
    new Order({

      customer:
      req.user._id,

      supermarket:
      req.body.supermarket,

      products:
      req.body.products,

      total:
      req.body.total,

      deliveryMethod:
      req.body.deliveryMethod,

      deliveryCost:
      req.body.deliveryCost

    });

    await order.save();

    res.status(201)
    .json(order);

  }

  catch(err){

    res.status(500).json({

      error:
      'Server error'

    });

  }

};

// Update order status
controller.updateStatus = async (req, res) => {

  try {

    const allowedStatus = [

      'pending',
      'confirmed',
      'in process',
      'in delivering',
      'delivered',
      'canceled'

    ];

    if (
      !allowedStatus.includes(
        req.body.status
      )
    ) {

      return res.status(400).json({

        error: 'Invalid status'

      });

    }

    const order =
      await Order.findByIdAndUpdate(

        req.params.id,

        {
          status: req.body.status
        },

        {
          new: true
        }

      );

    if (!order) {

      return res.status(404).json({

        error: 'Order not found'

      });

    }

    res.json(order);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      error: 'Server error'

    });

  }

};

// Get all orders
controller.getAll = async (req,res) => {

  try {

    const orders =
    await Order.find()

      .populate('customer')
      .populate('supermarket')
      .populate('products.product');

    res.json(orders);

  }

  catch(err){

    console.log(err);

    res.status(500).json({
      error: 'Server error'
    });

  }

};

module.exports = controller;