const Producto = require('../models/producto');
const Venta = require('../models/venta');

var meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

const controller = {
    /**
     * Metodo que guarda una Compañia en la BD
     * @param {*} req
     * @param {*} res
     */
    saveProducto: function (req, res) {
        console.log("Metodo saveProducto");

        let params = req.body;
        let producto = new Producto({
            nombre: params.nombre,
            marca: params.marca,
            precio: params.precio,
            existencias: params.existencias
        });

        producto.save((err, productoSaved) => {
            if (err)
                return res.status(500).send({ message: "Error al almacenar producto", err});
            if(!productoSaved)
                return res.status(404).send({ message: "No se ha podido almacenar el producto" });
            return res.status(200).send({company: productoSaved});
        });
    },
    /**
     * Metodo que consulta una Commpañia determinada usando su id
     * @param {*} req
     * @param {*} res
     */
    getProducto: function (req, res) {
        let productoId = req.params.id;
        console.log("Metodo getProducto: " + productoId);

        if(productoId === null)
            return res.status(404).send("El producto no existe\n");

        Producto.findById(productoId, (err, producto) => {
            if (err) {
                return res.status(500).send({error: 'Error al cargar los datos o El producto no existe'}, err);
            }
            if (producto) {
                return res.status(200).send(producto);
            }else
                return res.status(404).send("El producto no existe\n");
        });
    },
    /**
     * Metodo que obtiene todos las compañias registradas en la BD
     * @param {*} req
     * @param {*} res
     */
    getProductos: function (req, res) {
        console.log("Metodo productos");

        Producto.find({})
            .exec((err, productos) => {
                if (err)
                    return res.status(500).send({message:'error al devolver los datos', err});
                if(!productos)
                    return res.status(404).send({message: 'No hay productos para mostrar'});
                else
                    return res.status(200).json(productos);
            });
    },

    /**
     * Metodo que actualiza una compañia con los valores enviados como parametros
     * @param {*} req
     * @param {*} res
     //  */
    updateProducto: function (req, res) {
        console.log("Update Producto");
        let idprod = req.params.id;
        let data = {
            nombre: req.body.nombre,
            marca: req.body.marca,
            precio: req.body.precio,
            existencias: req.body.existencias
        };

        Producto.findByIdAndUpdate({ _id: idprod }, data, (err, lastprod) => {
            if(err)
                return res.status(500).send({message: 'Error al actualizar informacion', err});
            if(!lastprod)
                return res.status(404).send({message: 'El producto no existe'});
            return res.status(200).send({producto: lastprod});
        });
    },
    /**
     * Metodo que elimina una compañía de la base de datos por medio de su _id
     * se valida si ocurre un error del lado del srvidor (error 500) enviando un Json con la información del error y
     * si ocurre un error por parte del cliente al enviar un _id no registrado.
     * Si todo sale bien, se envía el estado 200 indicando que la operación fue exitosa y se manda un Json con los datos del registro
     * @param {*} req
     * @param {*} res
     */
    deleteProducto: function (req, res) {
        let productoId = req.params.id;
        Producto.findByIdAndRemove(productoId, (err, productoRemoved) => {
            if(err)
                return res.status(500).send({err, message: 'No se ha podido borrar el producto'});
            if(!productoRemoved)
                return res.status(404).send({err, message: 'No se puede eliminar el producto'});
            else {
                return res.status(200).send({
                    message: 'Se ha eliminado el registro',
                    company: productoRemoved
                });
            }
        });
    },

    comprarProducto: (req, res) => {
        let prodid = req.params.id;
        let cantidad = Number(req.body.cantidad);
        console.log("Comprar Producto " + prodid);
        Producto.findById(prodid, (err, producto) => {
            if (err) {
                return res.status(500).send({error: 'Error al cargar los datos o El producto no existe'}, err);
            }
            if (producto) {
                let existencias = producto.existencias;
                let ventas = producto.ventas;
                let ingreso = cantidad * producto.precio;

                if (cantidad > existencias)
                    return res.json({
                        ok: false,
                        message: `No hay suficiente cantidad de ${producto.nombre} disponible`
                    });

                Producto.findByIdAndUpdate({ _id: prodid }, {
                    existencias: existencias - cantidad,
                    ventas: ventas + cantidad
                }, (err, lastprod) => {
                    if(err)
                        return res.status(500).send({message: 'Error al actualizar informacion', err});
                    if(!lastprod)
                        return res.status(404).send({message: 'El producto no existe'});
                    //return res.status(200).send({producto: lastprod});
                });
                let hoy = new Date();
                let venta = new Venta({
                    prodID: prodid,
                    cantidad,
                    fecha: (hoy.getDate()-1) + "/" + meses[hoy.getMonth()] + "/" + hoy.getFullYear(),
                    ingreso
                });

                venta.save((err, ventaSaved) => {
                    if (err)
                        return res.status(500).send({ message: "Error al almacenar venta", err});
                    if(!ventaSaved)
                        return res.status(404).send({ message: "No se ha podido almacenar venta" });
                    return res.status(200).send({venta: ventaSaved});
                });
            }else
                return res.status(404).send("El producto no existe\n");
        });


    }
};

module.exports = controller;


// module.exports = {
//     inventario: async(req, res) => {
//         Producto.find((err, productos) => {
//             let data;
//
//             if (err) {
//                 data = {
//                     ok: false,
//                     err,
//                     scripts: ['inventario.js']
//                 };
//             } else {
//                 data = {
//                     ok: true,
//                     productos,
//                     scripts: ['inventario.js']
//                 }
//             }
//
//             return res.render('inventario', data);
//         });
//     },
//
//     mostrarCompra: (req, res) => {
//         let prodid = req.params.id;
//
//         Producto.findById({ _id: prodid }, (err, producto) => {
//             if (err)
//                 return res.redirect('/inventario');
//             let existencias = producto.existencias;
//
//             if (existencias <= 0) return res.redirect('/inventario');
//
//             res.render('comprar-prod', {
//                 producto,
//                 scripts: ['comprar-producto.js']
//             });
//         });
//     },
//     comprar: (req, res) => {
//         let prodid = req.body.prodid;
//         let cantidad = Number(req.body.cantidad);
//
//         Producto.findById({ _id: prodid }, (err, producto) => {
//             if (err)
//                 return res.status(400).json({
//                     ok: false,
//                     err
//                 });
//             let existencias = producto.existencias;
//             let ventas = producto.ventas;
//             let ingreso = cantidad * producto.precio;
//
//             if (cantidad > existencias)
//                 return res.json({
//                     ok: false,
//                     message: `No hay suficiente cantidad de ${producto.nombre} en el inventario`
//                 });
//
//             Producto.findByIdAndUpdate({ _id: prodid }, {
//                 existencias: existencias - cantidad,
//                 ventas: ventas + cantidad
//             }, (err, prodUpdated) => {
//                 if (err)
//                     return res.status(400).json({
//                         ok: false,
//                         err
//                     });
//             });
//
//             let venta = new Venta({
//                 prodID: prodid,
//                 cantidad,
//                 fecha: req.body.fecha,
//                 hora: req.body.hora,
//                 cliente: req.body.nombrecliente,
//                 ingreso
//             });
//
//             venta.save((err, ventaDB) => {
//                 if (err)
//                     return res.status(400).json({
//                         ok: false,
//                         err
//                     });
//                 return res.json({
//                     ok: true,
//                     message: 'Compra exitosa'
//                 });
//             });
//         });
//     },
//
//     estadisticas: (req, res) => {
//         Producto.find((err, productos) => {
//             if (err)
//                 return res.render('estadisticas');
//
//             let bestsellers = productos.sort((a, b) => {
//                 return a.ventas - b.ventas;
//             }).reverse().slice(0, 5);
//             let bestearners = productos.sort((a, b) => {
//                 return a.ventas * a.precio - b.ventas * b.precio;
//             }).reverse().slice(0, 5);
//
//             return res.render('estadisticas', {
//                 bestsellers,
//                 bestearners,
//                 scripts: ['estadisticas.js']
//             });
//         });
//     }
// };
