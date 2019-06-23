const express = require('express');
const UserController = require('../controllers/UserController');
const Router = express.Router();


/* GET home page. */
Router.get('/', function(req, res, next) {
    res.status(200).json({
        msn: "Bienvenido a la API de USUARIOS"
    });
});

//Router.get('/', UserController.index) //api.com/product/
Router.post('/', UserController.create) //api.com/product/
Router.get('/:key/:value') //api.com/product/
Router.put('/:key/:value') //api.com/product/
Router.delete('/:key/:value') //api.com/product/



module.exports = Router;