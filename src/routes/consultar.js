const express = require('express');
const router = express.Router();
const Trabajador = require('../models/Trabajador');

function validar_rut(rut) {
    if (rut.length > 7) {
        rut = rut.trim();
        rut = rut.replace('.','');
        rut = rut.replace('-','');
        rut = rut.replace('_','');
        var v_r = {'rut':'','dv':''};
    //console.log('validar rut--->',rut)
        v_r.rut = rut.slice(0,-1);
        if (!isNaN(v_r.rut)) {
            v_r.rut = parseInt(v_r.rut);
            v_r.dv = rut.substr(rut.length-1);
    //console.log('resultardo rut:[',v_r.rut,']  dv:[',v_r.dv,']')
        }else{
            v_r = false;
        }//if
    }
    return v_r || false;
}

router.get('/todo/:rut', async (req, res) => {
console.log('--->',req.session.trabajador)
    if (req.session.trabajador) {
        var Vrut = validar_rut(req.params.rut);
        if (Vrut){
            const trabajador = await Trabajador.findOne({rut:Vrut.rut,dv:Vrut.dv});
            res.json(trabajador || {});
        }else{
            res.json({});
        }
    }else{
        res.json('-_-')
    }//if
});

router.get('/listas/:rut', async (req, res) => {
    var Vrut = validar_rut(req.params.rut);
    if (Vrut){
        const trabajador = await Trabajador.findOne({rut:Vrut.rut,dv:Vrut.dv},{edad:0,nombre:0, _id: 0,lv: 0, __v:0});
        res.json(trabajador || {});
    }else{
        res.json({});
    }
    
});

module.exports = router;