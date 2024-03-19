const express = require('express');

const usuarioController = require("../controllers/Usuario.controller");

const router = express.Router();

router.post('/login', usuarioController.login);//definiendo rutas
router.post('/crearUsuario', usuarioController.crearUsuario);//definiendo rutas
router.post('/editarUsuario', usuarioController.editarUsuario)
router.get('/buscarUsuarioPorNombre', usuarioController.buscarUsuarioPorNombre)
module.exports = router;//exporar el routers