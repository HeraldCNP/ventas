 const express = require('express');
 const ProductController = require('../controllers/ProductController');
 const Router = express.Router();




 Router.get('/', ProductController.index) //api.com/product/
 Router.post('/', ProductController.create) //api.com/product/
 Router.patch('/', ProductController.modify)
 Router.get('/:key/:value', ProductController.find, ProductController.show) //api.com/product/category/Hogar
 Router.put('/', ProductController.update)
 Router.delete('/', ProductController.remove) //api.com/product/

 module.exports = Router;