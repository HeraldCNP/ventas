const user = require('../database/collections/user'); //guarda todo lo que esta en la conexion
const User = user.model;
const USERSCHEMA = user.schema;
var valid = require("../utils/valid");
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

async function index(req, res) {
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
    var skip = 0;
    if (params.skip != null) {
        skip = parseInt(params.skip);
    }

    await User.find({}).limit(limit).sort({ _id: order }).skip(skip).exec((err, docs) => {
        res.status(200).json(docs);
    });
}

function show(req, res) {

}

async function create(req, res) {
    let datos = req.body;
    datos['password'] = sha1(datos['password']);
    datos['registerDate'] = Date.now();
    datos['roles'] = ["buyer"];

    if (!valid.checkParams(USERSCHEMA, datos)) {
        res.status(300).json({
            msn: "Parametros Incorrectos"
        });
        return;
    }

    if (!valid.checkEmail(datos.email)) {
        res.status(300).json({
            msn: "Email Invalido"
        });
        return;
    }
    let user = new User(datos);
    let result = await user.save();
    res.status(200).json(result);
    // res.status(200).json(result);
}

async function modify(req, res) {
    let datos = req.body;
    var id = req.query.id;
    // console.log(id);
    if (id == null) {
        res.status(300).json({
            msn: "Falta el id del usuario"
        });
        return;
    }
    console.log(datos.password);
    if (datos.email != null && !valid.checkEmail(datos.email)) {
        res.status(300).json({
            msn: "Email Invalido"
        });
        return;
    }
    if (datos.password != null) {
        datos['password'] = sha1(datos['password']);
    }
    var result = await User.findOneAndUpdate({ _id: id }, datos);
    res.status(200).json(result);

}

async function update(req, res) {
    let datos = req.body;
    var id = req.query.id;
    if (id == null) {
        res.status(300).json({
            msn: "Falta el id del usuario"
        });
        return;
    }
    datos['password'] = sha1(datos['password']);
    datos['registerDate'] = Date.now();


    if (!valid.checkParams(USERSCHEMA, datos)) {
        res.status(300).json({
            msn: "Parametros Incorrectos"
        });
        return;
    }

    if (!valid.checkEmail(datos.email)) {
        res.status(300).json({
            msn: "Email Invalido"
        });
        return;
    }
    delete datos.registerDate;
    var result = await User.findOneAndUpdate({ _id: id }, datos);
    res.status(200).json(result);
}

async function remove(req, res) {
    var id = req.query.id;
    // console.log(id);
    if (id == null) {
        res.status(300).json({
            msn: "Falta el id del usuario"
        });
        return;
    }
    var result = await User.remove({ _id: id });
    res.status(200).json(result);
}

// async function login(req, res, next) {
//     var datos = req.body;
//     if (!valid.checkParams({ "email": String, "password": String }, datos)) {
//         res.status(300).json({
//             "msn": "Error parametros incorrectos"
//         });
//         return;
//     }
//     var hashpassword = sha1(datos.password);
//     var docs = await User.find({ email: datos.email, password: hashpassword });
//     if (docs.length == 0) {
//         res.status(300).json({
//             "msn": "Error Usuario no Registrado"
//         });
//         return;
//     }
//     if (docs.length == 1) {
//         jwt.sign({ name: datos.email, password: hashpassword }, "MiClave", (err, token) => {
//             if (err) {
//                 res.status(300).json({
//                     "msn": "Error dentro del servidor"
//                 });
//                 return;
//             }
//             res.status(200).json({ "token": token });
//         });
//         return;
//     }

// }


function login(req, res) {
    User.find({
        email: req.body['email']
    }).exec().then(doc => {
        if (doc.length > 0) {
            let us = doc[0];
            if (us['password'] == sha1(req.body['password'])) {
                const token = jwt.sign({
                    email: us.email
                }, process.env.JWT_KEY || 'myPass', {
                    expiresIn: "2h"
                });
                res.status(200).json({
                    token: token,
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

async function verifyToken(req, res, next) {
    var token = req.headers["authorization"];
    if (token == null) {
        res.status(300).json({
            "msn": "Error no tienes acceso"
        });
        return;
    }
    jwt.verify(token, "myPass", async(err, auth) => {
        if (err) {
            res.status(300).json({
                "msn": "Token invalido"
            });
            return;
        }
        var users = await User.find({ email: auth.email });
        // console.log(users);

        var roles = users[0].roles;
        console.log(roles[0]);
        if (roles == null) {
            res.status(300).json({
                "msn": "No cuenta con permisos"
            });
            return;
        }

        for (var i = 0; i < roles.length; i++) {
            if (roles[0] == "buyer" && req["method"] == "GET") {
                next();
                return;
            }
            if (roles[0] == "seller" && req["method"] == "GET") {
                next();
                return;
            }


        }
        res.status(200).json({ msn: "El usuario no cuenta con el permiso para este servicio" });

    });
}
module.exports = {
    index,
    show,
    create,
    update,
    remove,
    modify,
    login,
    verifyToken
}