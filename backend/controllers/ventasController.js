const Venta = require('../models/venta');


const controller = {

    /**
     * Metodo que obtiene todos las ventas registradas en la BD
     * @param {*} req
     * @param {*} res
     */
    getVentas: function (req, res) {
        console.log("Metodo getVentas");

        Venta.find({})
            .exec((err, ventas) => {
                if (err)
                    return res.status(500).send({message:'error al devolver los datos', err});
                if(!ventas)
                    return res.status(404).send({message: 'No hay productos para mostrar'});
                else
                    return res.status(200).json(ventas);
            });
    }
};

module.exports = controller;
