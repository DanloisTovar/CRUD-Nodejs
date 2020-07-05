const express = require('express');
const paht = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//Configuracion:
app.set('port', process.env.PORT || 3000);
app.set('views', paht.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middelwares:
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//conexion a la base de datos:
mongoose
  .connect('mongodb://localhost/crud-mongo')
  .then((db) => console.log('Base de datos Crud-Mongo conectada!!'))
  .catch((err) => console.log(err));

//Rutas:
const indexRoutes = require('./routes/routes');
app.use('/', indexRoutes);

//Inicio de servidor:
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo por el puerto: ${app.get('port')}!!`);
});
