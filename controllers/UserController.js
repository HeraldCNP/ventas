const User = require('../database/collections/user'); //guarda todo lo que esta en la conexion

function index(req, res) {
    User.find({})
        .then(products => {
            if (products.length)
                return res.status(200).send({ products });
            else
                return res.status(204).send({ message: "No hay nada" })
        }).catch(error => res.status(500).send({ error }));
}

function show(req, res) {

}

async function create(req, res) {
    var params = req.body;
    var product = new Product(params);
    var result = await product.save();
    res.status(200).json(result);
}

function update(req, res) {

}

function remove(req, res) {

}

module.exports = {
    index,
    show,
    create,
    update,
    remove
}