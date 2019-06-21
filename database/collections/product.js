const mongoose = require("../connect");

const ProductSchema = new mongoose.Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Users"
    // },

    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Hogar', 'Entretenimiento', 'Comercio', 'Electronica']
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 10
    },
    date: {
        type: date,
        default: Date.now()
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;