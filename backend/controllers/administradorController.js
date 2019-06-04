const Administrador = require('../models/administrador');

module.exports = {

    login: async(req, res) => {
        let nombre = req.body.nombre;
        let clave = req.body.clave;

        let admin = await Administrador.findOne({ nombre });

        if (admin) {
            if (clave === admin.clave) {
                req.session.administrador = admin;
                return res.json({
                    ok: true,
                    administrador: admin
                });
            } else {
                return res.json({
                    ok: false,
                    message: 'Contraseña incorrecta'
                });
            }
        }

        return res.json({
            ok: false,
            message: 'No existe el usuario'
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/inventario');
    },
    signup: async(req, res) => {

        let admin = new Administrador({
            nombre: req.body.nombre,
            clave: req.body.clave
        });

        admin.save(async(err, adminDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                admin: adminDB
            });
        });
    }
};
