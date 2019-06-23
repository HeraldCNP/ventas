 const express = require('express');
 const ProductCtrl = require('../controllers/ProductController');
 const Router = express.Router();




 Router.get('/', ProductCtrl.index) //api.com/product/
 Router.post('/', ProductCtrl.create) //api.com/product/
 Router.get('/:key/:value') //api.com/product/
 Router.put('/:key/:value') //api.com/product/
 Router.delete('/:key/:value') //api.com/product/

 module.exports = Router;