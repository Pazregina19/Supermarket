var mongoose = require("mongoose");
const Supermarket = require('../models/supermarket');

let supermarketController = {};

// LIST
supermarketController.list = (req, res) => {
  const search = req.query.search || "";

  Supermarket.find({
    name: { $regex: search, $options: "i" }
  })
    .sort({ createdAt: -1 })
    .then((supermarkets) => {
      res.render("supermarkets/list", {
        title: "Supermarkets list",
        supermarkets
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error loading supermarkets");
    });
};

// CREATE FORM
supermarketController.create = (req, res) => {
  res.render('supermarkets/create', {
    title: 'Create Supermarket'
  });
};

// SAVE
supermarketController.save = async (req, res) => {
  try {
    const {
      name,
      description,
      street,
      city,
      postalCode,
      schedule,
      method,
      cost
    } = req.body;

    const supermarket = new Supermarket({
      name,
      description,

      location: {
        street,
        city,
        postalCode
      },

      schedule,

      deliveryMethod: {
        method
      },

      deliveryCost: Number(cost),

      owner: (req.user || req.session.user)._id
    });

    await supermarket.save();

    console.log("Supermarket created!");

    res.redirect('/supermarkets');
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating supermarket");
  }
};

// APPROVE
supermarketController.approve = async (req, res) => {
  await Supermarket.findByIdAndUpdate(req.params.id, {
    approved: true
  });

  res.redirect('/supermarkets');
};

// MIDDLEWARE getById
supermarketController.getById = async (req, res, next, id) => {
  try {
    const supermarket = await Supermarket.findById(id);
    if (!supermarket) return res.status(404).send("Supermarket not found");
    req.supermarket = supermarket;
    next();
  } catch (err) {
    next(err);
  }
};

// DETAIL PAGE
supermarketController.getOne = async (req, res) => {
  try {
    const supermarket = await Supermarket.findById(req.params.id);

    if (!supermarket) {
      return res.status(404).send("Supermarket not found");
    }

    res.render('supermarkets/detail', {
      title: supermarket.name,
      supermarket
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading supermarket");
  }
};

module.exports = supermarketController;
