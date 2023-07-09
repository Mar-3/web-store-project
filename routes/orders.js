const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Order = require('../models/Order');
const User = require('../models/User');
const config = require('../config/database');
const users = require('../routes/users');


// new order
router.post('/new',
  passport.authenticate('jwt',
  {session:false}),
  async (req, res, next) => {
    console.log(req)
    console.log(req.body)
    console.log(req.products)
    let now = Date.now();
    let newOrder = Order({
        products: req.body.products,
        address: req.body.address,
        date: now,
        userId: req.body._userId
    });
    console.log('orders.js',newOrder);
    await Order.addOrder(newOrder)
    .then(res.json({ success: true, message: "New order sent successfully"}))
    .catch(err => res.json({ success: false, message: "Error in registering a new order: "+err}));
  }
)

module.exports = router;