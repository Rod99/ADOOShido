'use strict';
const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');
const api = require('./routes/api');
// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/smartchoice';
// Connect to mongodb
mongoose.connect(dbHost, (err, res) => {
//En caso de error de conexion
    if (err) {
        throw err;
    }else {
        console.log('Conexion a MongoDB correcta');
        //Get port from environment and store in Express
        const port = process.env.PORT || '3000';
        /**
        Vencimiento del token
         60 segundos
         60 minutos
         */
        process.env.CADUCIDAD_TOKEN = 60 * 60;
        app.set('port', port);
        //Create HTTP server
        const server = http.createServer(app);
        server.listen(port, () => console.log(`API running on localhost:${port}`));
    }
});
