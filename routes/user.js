const express = require('express');
const UserController = require('../controllers/UserController');
const Router = express.Router();




Router.get('/', UserController.index)
Router.post('/', UserController.create)
    // Router.patch('/user', UserController.modify)
Router.post('/login', UserController.login)

Router.get('/:key/:value')
Router.put('/:key/:value')
Router.delete('/user', UserController.remove)



module.exports = Router;