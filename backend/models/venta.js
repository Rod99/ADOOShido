const { Schema, model } = require('mongoose');

let ventaSchema = new Schema({
    prodID: String,
    cantidad: Number,
    fecha: String,
    ingreso: Number
});

module.exports = model('Venta', ventaSchema);
