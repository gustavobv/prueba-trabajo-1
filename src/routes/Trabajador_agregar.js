const express = require('express');
const router = express.Router();
const Trabajador = require('../models/Trabajador');

function dv(T){
    var M=0,S=1;
    for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';
}
function validardv(rut,digv) {
    if ( digv == 'K' ) digv = 'k' ;
    return (dv(rut) == digv );
}

function validar_rut(rut) {
    if (rut.length > 7) {
        rut = rut.trim();
        rut = rut.replace(/\./g,'');
        rut = rut.replace('-','');
        rut = rut.replace('_','');
        var v_r = {'rut':'','dv':''};
    //console.log('validar rut--->',rut)
        v_r.rut = rut.slice(0,-1);
        if (!isNaN(v_r.rut) && rut.length > 7) {
            v_r.rut = parseInt(v_r.rut);
            v_r.dv = rut.substr(rut.length-1);
            if(! validardv(v_r.rut,v_r.dv)) v_r = false;
    //console.log('resultardo rut:[',v_r.rut,']  dv:[',v_r.dv,']')
        }else{
            v_r = false;
        }//if
    }
    return v_r || false;
}

router.post('/', async (req, res) => {
    if (req.session.trabajador) {
        var Vrut = validar_rut(req.body.rut);
        if (Vrut) {
            req.body.rut = Vrut.rut;
            req.body.dv = Vrut.dv;
            var trabajador = await Trabajador.findOne({rut:Vrut.rut,dv:Vrut.dv},{edad:0,nombre:0, _id: 0,lv: 0, __v:0});
            if (!trabajador) {
                trabajador = new Trabajador(req.body);
                await trabajador.save();
                res.json({
                    estado: 'Trabajador :'+Vrut.rut+'-'+Vrut.dv+' guardado!'
                });
            }else{
                res.json({
                    estado: 'Trabajador ya existe'
                });
            }//if
        }else{
            res.json({'estado':false});
        }//if
    }else{
        res.json('-_-')
    }//if
});

module.exports = router;