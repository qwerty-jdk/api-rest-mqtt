const express = require('express');
const bodyParser = require('body-parser');
const lightRouter = require('./routers/light');
const tempRouter = require('./routers/temp');
const doorRouter = require('./routers/door');
const hbs = require('express-handlebars');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    exname: '.hbs'
}));
app.set('view engine', '.hbs');

//Se habilitan rutas para la administración de sensore (get, post, put delete)
app.use('/api', lightRouter);
app.use('/api', tempRouter);
app.use('/api', doorRouter);

//Se habilita ruta para iniciar sesión y obtener token para realizar pruebas
app.get('/login', (req,res) => {
    res.render('login', {title: 'Cliente API REST'});
});

module.exports = app;
/*const sensorAPI = require('./routers/sensor');
app.use('/api', sensorAPI);
app.get('/', (req,res) => {
    res.render('product');
});*/