const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/all', (req, res, next) => {
  Product.getProducts((err, products) => {
  res.json(products);
  });
});

module.exports = router;