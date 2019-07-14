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



async function create(req, res) {


    let datos = req.body;
    datos['date'] = Date.now();
    datos['status'] = "active";
    // console.log(PRODUCTSCHEMA["obj"]);
    // console.log(datos);

    if (!datos.stock) {
        datos['stock'] = 1;
    }
    if (!valid.checkParams(PRODUCTSCHEMA, datos)) {
        res.status(300).json({
            msn: "Parametros Incorrectos"
        });
        return;
    }



    let product = new Product(datos);
    let result = await product.save();
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
    datos['status'] = "active";
    datos['date'] = Date.now();
    if (!datos.stock) {
        datos['stock'] = 1;
    }

    if (!valid.checkParams(PRODUCTSCHEMA, datos)) {
        res.status(300).json({
            msn: "Parametros Incorrectos"
        });
        return;
    }

    delete datos.status;
    var result = await Product.findOneAndUpdate({ _id: id }, datos);
    res.status(200).json(result);
}

async function modify(req, res) {
    let datos = req.body;
    var id = req.query.id;
    // console.log(id);
    if (id == null) {
        res.status(300).json({
            msn: "Falta el id del producto"
        });
        return;
    }
    console.log(datos.name);

    var result = await Product.findOneAndModify({ _id: id }, datos);
    res.status(200).json(result);

}

async function remove(req, res) {
    if (req.query.id == null) {
        res.status(300).json({
            msn: "Error no existe el id"
        });
        return;
    }
    var r = await Product.remove({ _id: req.query.id });
    res.status(300).json(r);
}

function show(req, res) {
    if (req.body.error) {
        return res.status(500).send({ error });
    }
    if (!req.body.products) {
        return res.status(404).send({ msg: "Not Found" });
    }
    let products = req.body.products;
    return res.status(200).send({ products });

}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value;
    Product.find(query).then(products => {
        if (!products.length) {
            return next();
        } else {
            req.body.products = products;
            return next();
        }
    }).catch(error => {
        req.body.error = error;
        next();
    })

}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    modify,
    find
}