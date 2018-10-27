const express = require('express');
const router = express.Router();
const Trabajador = require('../models/Trabajador');

function validar_rut(rut) {
    if (rut.length > 7) {
        var v_r = {'rut':'','dv':''};
        v_r.rut = rut.slice(0,-1);
        if (!isNaN(v_r.rut)) {
            //v_r.rut = parseInt(v_r.rut);
    //console.log('validar rut--->',rut)
            v_r.dv = rut.slice(rut.length-1);
    //console.log('resultardo rut:[',v_r.rut,']  dv:[',v_r.dv,']')
        }else{
            v_r = false;
        }//if
    }
    return v_r || false;
}

router.post('/', async (req, res) => {
    var Vrut = validar_rut(req.body.id)
    if (Vrut){//hay rut
        var Vclave = Vrut.rut.substr(0, 4);
        if (Vclave == req.body.clave) {//clave ok
            const trabajador = await Trabajador.findOne({rut:Vrut.rut,dv:Vrut.dv,lv:1});
            req.session.trabajador = trabajador;
            res.json(trabajador || {});
        }else{
            res.json({});
        }//if
    }else{
        res.json({});
    }//if
});

module.exports = router;