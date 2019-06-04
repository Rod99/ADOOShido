/**
* Documento con la configuracion de Express!
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
// Cargar archivo de rutas
var api = require('./routes/api');
var expressJwt = require('express-jwt');
const session = require('express-session');

// Pasa todo lo que recibe a un json
var config = require('./config.json');

// app.use(cors);

// Middlewares para parsear parametros de la URL
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());
// Cross Origin middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use(session({
    secret: 'smartchoicesys',
    resave: true,
    saveUninitialized: true
}));
app.use('/public', express.static(path.join(__dirname, '../public')));
// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
// app.use(expressJwt({
//     secret: config.secret,
//     getToken: function (req) {
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//             return req.headers.authorization.split(' ')[1];
//         } else if (req.query && req.query.token) {
//             return req.query.token;
//         }
//         return null;
//     }
// }).unless({ path: ['/login_admin', '/login', '/users/register' ] }));


// Rutas del API de Raiffeisen
app.use('/', api);

// Exportar
module.exports = app;
