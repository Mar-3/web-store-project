const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Order = require('../models/Order');
const User = require('../models/User');
const config = require('../config/database');

// New order
router.post('/neworder', async (req, res) => {
  let newOrder = new Order({
    products: req.body.products,
    address: req.body.address,
    date: req.body.date,
    userId: req.body.userId
  });
  Order.addOrder(newOrder)
  .then(res.json({
    success: true,
    message: "New order sent."
  }))
  .catch(err => {
    res.json({
      success: false,
      message: "Error in sending a new order."
    });
  })
});

// Get orders from user
// TODO probably not working like this, need to check
router.get('/orders', passport.authenticate('jwt', {session:false}), (req, res) => {
  res.json({
    orders: req.orders
  })
});

module.exports = router;