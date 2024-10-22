const productControllers = require('../controllers/products');
const express = require('express');
const route = express.Router();

route
  .get('/', productControllers.getAllProducts)
  .post('/', productControllers.addProduct);

route.get('/:id', productControllers.getProduct);

module.exports = route;
