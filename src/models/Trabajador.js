const mongoose = require('mongoose');
const { Schema } = mongoose;

const Trabajador = new Schema({
    nombre: String,
    edad: Number,
    rut: Number,
    dv: String,
    lv: Boolean,// 0 no puede ingresar, 1 puede ingresar
    curso:[],
    licencia:[],
    capacitacion:[]
});

module.exports = mongoose.model('Trabajador',Trabajador);