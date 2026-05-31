const Order = require('../../models/order');

let controller = {};
/**
 * Creates a new order
 * @param {*} req 
 * @param {*} res 
 * @returns created order or error message
 */
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

/**
 * Updates an order's status
 * @param {*} req 
 * @param {*} res 
 * @returns updated order or error message
 */
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

/**
 * Retrieves all orders
 * @param {*} req 
 * @param {*} res 
 * @returns list of orders or error message
 */
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