const product = require('../database/collections/product');
const Product = product.model;
const PRODUCTSCHEMA = product.schema;
var valid = require("../utils/valid");

function index(req, res) {
    Product.find().exec(async(err, docs) => {
        if (docs.length > 0) {
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

            await Product.find({}).limit(limit).sort({ _id: order }).skip(skip).exec((err, docs) => {
                res.status(200).json(docs);
            });
        } else {
            res.status(200).json({
                message: 'no existen productos en la bd'
            });
        }
    });


}

function show(req, res) {

}

async function create(req, res) {
    // var params = req.body;
    // var product = new Product(params);
    // var result = await product.save();
    // res.status(200).json(result);

    let datos = req.body;
    datos['date'] = Date.now();
    datos['status'] = "active";
    // console.log(PRODUCTSCHEMA["obj"]);
    // console.log(datos);
    if (!valid.checkParams(PRODUCTSCHEMA, datos)) {
        res.status(300).json({
            msn: "Parametros Incorrectos"
        });
        return;
    }

    // if (!valid.checkEmail(datos.email)) {
    //     res.status(300).json({
    //         msn: "Email Invalido"
    //     });
    //     return;
    // }

    let product = new Product(datos);
    let result = await product.save();
    res.status(200).json(result);
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

module.exports = {
    index,
    show,
    create,
    update,
    remove
}