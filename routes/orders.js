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
    let now = Date.now();
    let newOrder = Order({
        products: req.body.products,
        address: req.body.address,
        date: now,
        userId: req.body.userId
    });
    console.log('req body ', req.body
    )
    console.log('orders.js',newOrder);
    await Order.addOrder(newOrder)
    .then(res.json({ success: true, message: "New order sent successfully"}))
    .catch(err => res.json({ success: false, message: "Error in registering a new order: "+err}));
  }
)

// Get orders from user
router.post('/getOrders',
  passport.authenticate('jwt', {session:false}),
    async (req, res, next) => {
      console.log('request body: ',req.body);
      await Order.getOrders(req.body.userId, (err, orders) => {
        res.json({
          orders:orders
        })
      })
    })

module.exports = router;