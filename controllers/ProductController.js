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

async function create(req, res) {
    var params = req.body;
    var product = new Product(params);
    var result = await product.save();
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
