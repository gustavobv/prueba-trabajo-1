const express = require('express');
const router = express.Router();
const Trabajador = require('../models/Trabajador');

router.put('/', async (req, res) => {
    if (req.session.trabajador) {
        await Trabajador.findById(req.body.id_trabajador, function (err, trab) {
          //if (err) ..
            for(var i in req.body.listas) trab[i] = req.body.listas[i];
            trab.save();
        });
        res.json({
            estado: 'guardado!'
        });
    }else{
        res.json('-_-')
    }//if
});

module.exports = router;