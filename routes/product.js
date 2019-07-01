 const express = require('express');
 const ProductController = require('../controllers/ProductController');
 const Router = express.Router();




 Router.get('/', ProductController.index) //api.com/product/
 Router.post('/', ProductController.create) //api.com/product/
 Router.get('/:key/:value') //api.com/product/
 Router.put('/:key/:value') //api.com/product/
 Router.delete('/product', ProductController.remove) //api.com/product/

 module.exports = Router;
