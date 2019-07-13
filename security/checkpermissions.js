const jwt = require('jsonwebtoken');
const user = require('../database/collections/user'); //guarda todo lo que esta en la conexion
const User = user.model;
var rols = {
    verifyToken: async function(req, res, next) {
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
}

module.exports = rols;