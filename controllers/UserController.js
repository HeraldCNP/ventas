const User = require('../database/collections/user'); //guarda todo lo que esta en la conexion
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

function index(req, res) {
    // User.find().exec((err, docs) => {
    //     if (docs.length > 0) {
    //         res.status(200).json(docs);
    //     } else {
    //         res.status(200).json({
    //             message: 'no existen usuarios en la bd'
    //         });
    //     }
    // });

    var params = req.query;
    var limit = 100;
    if (params.limit != null) {
        limit = parseInt(params.limit);
    }

    var order = -1;
    if (params.order != null) {
        if (params.order == 'desc') {
            order = -1;
        } else if (params.order == "asc") {
            order = 1;
        }
    }
    var skip = 10;
    if (params.skip != null) {
        skip = parseInt(params.skip);
    }
    0
    User.find({}).limit(limit).sort({ _id: order }).skip(skip).exec((err, docs) => {
        res.status(200).json(docs);
    });
}

function show(req, res) {

}

async function create(req, res) {
    let datos = req.body;
    datos['password'] = sha1(datos['password']);
    let user = new User(datos);
    let result = await user.save();
    res.status(200).json(result);
    // res.status(200).json(result);
}

function modify(req, res) {
    if (req.query.id == null) {
        res.status(300).json({
            msn: "No existe el id"
        });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    User.findOneAndUpdate({ _id: id }, params, (err, docs) => {
        res.status(200).json(docs);
    });
}

function update(req, res) {

}

async function remove(req, res) {
    if (req.query.id == null) {
        res.status(300).json({
            msn: "Error no existe el id"
        });
        return
    }
    var r = await User.remove({ _id: req.query.id });
    res.staus(300).json(r);
}

function login(req, res) {
    User.find({
        email: req.body['email']
    }).exec().then(doc => {
        if (doc.length > 0) {
            let us = doc[0];
            if (us['password'] == sha1(req.body['password'])) {
                const token = jwt.sign({
                    email: us.email
                }, process.env.JWT_KEY || 'miCLave', {
                    expiresIn: "2h"
                });
                res.status(200).json({
                    message: token,
                    permiso: 'si'
                });
            } else {
                console.log("password");
                res.json({
                    message: 'password incorrecto',
                    permiso: 'no'
                });
            }
        } else {
            console.log("email");
            res.json({
                message: 'email no existe',
                permiso: 'no'
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: err
        });
    });
}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    login
}
