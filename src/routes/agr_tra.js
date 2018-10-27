const express = require('express');
const router = express.Router();
const Trabajador = require('../models/Trabajador');


router.get('/', async (req, res) => {
  const trabajadores = await Trabajador.find({});
  res.json(trabajadores);
});

router.get('/:id', async (req, res) => {
  const trabajador = await Trabajador.findById(req.params.id);
  res.json(trabajador);
});

router.post('/', async (req, res) => {
  const trabajador = new Trabajador(req.body);
  await trabajador.save();
  res.json({
    status: 'Trabajador saved'
  });
});

router.put('/:id', async (req, res) => {
  await Trabajador.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Trabajador Updated'
  });
});

router.delete('/:trabajadorId', async (req, res) => {
  await Trabajador.findByIdAndRemove(req.params.trabajadorId);
  res.json({
    status: 'Trabajador deleted'
  });
});

module.exports = router;