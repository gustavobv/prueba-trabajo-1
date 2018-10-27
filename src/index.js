const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
mongoose.connect('mongodb://localhost/tarea-database')
    .then(db => console.log('db :D!'))
    .catch(err =>console.error(err));
const db = mongoose.connection
//settings
app.set('port',process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
    secret: 'trabajdor secreto',
    resave: false,
    maxAge: 7*24*60*60*1000,
    saveUninitialized: true,
    trabajador: null,
    store: new MongoStore({mongooseConnection:db})
}))
app.use('/api/agr_tra',require('./routes/agr_tra'));

app.use('/api/index',require('./routes/index'));
app.use('/api/login',require('./routes/Trabajador_login'));
app.use('/api/agregar',require('./routes/Trabajador_agregar'));
app.use('/api/consultar',require('./routes/consultar'));
//app.use('/api/listas_agregar',require('./routes/listas_agregar'));
app.use('/api/listas_modificar',require('./routes/listas_modificar'));

//staticfiles
app.use(express.static(__dirname+'/public'));
//server
app.listen(app.get('port'),() =>{
    console.log('server '+app.get('port')+'!');
});
