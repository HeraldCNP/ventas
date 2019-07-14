const mongoose = require("../connect");

const ProductSchema = new mongoose.Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Users"
    // },

    name: {
        type: String,
        unique: true,
        //required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Articulos', 'Viviendas', 'Vehiculos', 'Propiedades', 'Electronica', 'Telefonos', 'Hogar', 'Deportes', 'Moda', 'Niños', 'Musica', 'Animales', 'Herramientas', 'Trabajo', 'Servicios']
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
        type: Date
    },
    status: {
        type: String
    }
});


const Product = mongoose.model('Product', ProductSchema);

module.exports = { model: Product, schema: ProductSchema };