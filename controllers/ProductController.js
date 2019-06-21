const Product = require('../database/collections/product');

function index(req, res) {
    Product.find({})
        .then(products => {
            if (products.length)
                return res.status(200).send({ products });
            else
                return res.status(204).send({ message: "No hay nada" })
        }).catch(error => res.status(500).send({ error }));
}

function show(req, res) {

}

function create(req, res) {
    var params = req.body;
    var product = new Product(params);
    product.save().then(() => {
        res.status(200).json({
            msn: "Producto Creado"
        })
    });
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