const Order = require('../models/order');
const Product = require('../models/product');

//Update Status

const validTransitions = {
  pending: ['confirmed', 'canceled'],
  confirmed: ['in process', 'canceled'],
  'in process': ['in delivering'],
  'in delivering': ['delivered'],
  delivered: [],
  canceled: []
};

let orderController = {};

/* CREATE ORDER */
/* CREATE ORDER */
orderController.create = async (req, res) => {
  try {
    let { customer, products, deliveryMethod, deliveryCost } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "Order must have products" });
    }

    let total = 0;
    let supermarketId = null;
    let productsArray = [];

    let foundProducts = [];

// Verify if the product exists and if it belong to the same SuperMarket
    for (let item of products) {
      const product = await Product.findById(item.product).populate('supermarket');

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (!supermarketId) {
        supermarketId = product.supermarket._id;
      } else if (supermarketId.toString() !== product.supermarket._id.toString()) {
        return res.status(400).json({
          error: "All products must belong to the same supermarket"
        });
      }

      const quantity = parseInt(item.quantity);

      if (product.stock < quantity) {
        return res.status(400).json({ error: "Not enough stock" });
      }

      total += product.price * quantity;

      productsArray.push({ product: product._id, quantity });

      //Save the product and tghe quantity to later lower the product's stock
      foundProducts.push({ product, quantity });
    }

    if (deliveryMethod === 'courier') {
      if (!deliveryCost || deliveryCost <= 0) {
        return res.status(400).json({
          error: "Courier delivery requires a delivery cost"
        });
      }
    }

    if (deliveryMethod === 'pickup') {
      deliveryCost = 0;
    }

    total += Number(deliveryCost || 0);

    const order = new Order({
      customer,
      supermarket: supermarketId,
      products: productsArray,
      total,
      deliveryMethod,
      deliveryCost
    });

    await order.save();

    //Decrement the product stock after each order
    for (let item of foundProducts) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    res.status(201).json(order);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating order" });
  }
};

/* LIST ALL ORDERS */
orderController.list = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('products.product')
      .populate('supermarket')
      .populate('customer')
      .populate('courier');

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

/* GET ONE ORDER */
orderController.getOne = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.product')
      .populate('supermarket')
      .populate('customer')
      .populate('courier');

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: "Error fetching order" });
  }
};

orderController.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const allowed = validTransitions[order.status];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        error: `Cannot change status from ${order.status} to ${status}`
      });
    }

    //Client has the option to cancel the order in 5 minutes after the purchase
    if (status === 'canceled' && order.status === 'confirmed') {
      const agora = new Date();
      const diferencaEmMinutos = (agora - order.confirmedAt) / 1000 / 60;

      if (diferencaEmMinutos > 5) {
        return res.status(400).json({
          error: "Não é possível cancelar. Já passaram mais de 5 minutos desde a confirmação."
        });
      }
    }

    // Safe the confirmation date after the order status is "confirmed"
    if (status === 'confirmed') {
      order.confirmedAt = new Date();
    }

    order.status = status;
    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: "Error updating status" });
  }
};

/* ASSIGN COURIER */
orderController.assignCourier = async (req, res) => {
  try {
    const { courierId } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.deliveryMethod !== 'courier') {
      return res.status(400).json({
        error: "This order does not require a courier"
      });
    }

    //
    if (order.status !== 'confirmed') {
      return res.status(400).json({
        error: "Order must be confirmed before assigning a courier"
      });
    }

    order.courier = courierId;
    order.status = 'in process';

    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: "Error assigning courier" });
  }
};

module.exports = orderController;