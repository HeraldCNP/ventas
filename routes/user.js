const express = require('express');
const UserController = require('../controllers/UserController');
const Router = express.Router();




Router.get('/', UserController.index)
Router.post('/', UserController.create)
Router.post('/login', UserController.login)
Router.get('/:key/:value')
Router.put('/:key/:value')
Router.delete('/:key/:value')



module.exports = Router;