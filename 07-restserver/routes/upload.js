const { Router } = require('express');
const { check }= require('express-validator');
const { cargarArchivo } = require('../controllers/upload');


const router = Router();


router.post('/', cargarArchivo);

module.exports = router;