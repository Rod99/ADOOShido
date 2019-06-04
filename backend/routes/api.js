'use strict';
var config = require('../config.json');
const express = require('express');

//Importar los controllers que sean necesarios aqui:
const adminController = require('../controllers/administradorController');
const productoController = require('../controllers/productoController');
const ventasController = require('../controllers/ventasController');
const dashboardController = require('../controllers/dashboardController');




const api = express.Router();
//

// Métodos CRUD
    // métodos post
        api.post('/admin/singup', adminController.signup); // sirve
        api.post('/productos/registrar', productoController.saveProducto); // sirve


    // métodos get
        api.get('/login', adminController.login); // sirve
        api.get('/productos', productoController.getProductos); // sirve
        api.get('/ventas', ventasController.getVentas); // sirve
        api.get('/producto?/:id', productoController.getProducto); // sirve
        // api.get('/estadisticas', dashboardController.mostrar); //
    // métodos put
        api.put('/producto/compra?/:id', productoController.comprarProducto); // sirve
        api.put('/producto/edita?/:id', productoController.updateProducto); // sirve
    // métodos delete
        api.delete('/producto/borra?/:id', productoController.deleteProducto); // sirve

module.exports = api;
