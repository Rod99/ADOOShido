const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    nombre: String,
    clave: String
});

module.exports = model('Administrador', adminSchema);
