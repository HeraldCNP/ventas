const express = require('express');
const UserController = require('../controllers/UserController');
const Router = express.Router();




Router.get('/', UserController.index)
Router.post('/', UserController.create)
Router.post('/login', UserController.login)
Router.put('/', UserController.update)
Router.patch('/', UserController.modify)
Router.delete('/', UserController.remove)



module.exports = Router;