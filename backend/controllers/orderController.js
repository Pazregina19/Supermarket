const Order = require('../models/order');
const Product = require('../models/product');

let orderController = {};

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

    for (let item of products) {
      const product = await Product.findById(item.product).populate('supermarket');

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // assures one supermarket per order
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

      productsArray.push({
        product: product._id,
        quantity
      });
    }

    // delivery rules
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

/* UPDATE STATUS */
const validTransitions = {
  pending: ['confirmed', 'canceled'],
  confirmed: ['in process', 'canceled'],
  'in process': ['in delivering'],
  'in delivering': ['delivered'],
  delivered: [],
  canceled: []
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

    order.courier = courierId;
    order.status = 'in delivering';

    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: "Error assigning courier" });
  }
};

module.exports = orderController;