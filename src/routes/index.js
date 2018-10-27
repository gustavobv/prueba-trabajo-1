const express = require('express');
const router = express.Router();
const Trabajador = require('../models/Trabajador');

router.get('/', async (req, res) => {
    res.json(req.session['trabajador'] || {});
});
router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.json(req.session  || {});
});

module.exports = router;