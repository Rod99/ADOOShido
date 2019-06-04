const { Schema, model } = require('mongoose');

const prodSchema = new Schema({
    nombre: String,
    marca: String,
    precio: Number,
    existencias: Number,
    ventas: { type: Number, default: 0 }
});

module.exports = model('Producto', prodSchema);
