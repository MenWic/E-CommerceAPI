const express = require('express');

const usuarioController = require("../controllers/Usuario.controller");

const router = express.Router();

//Rutas funcionales
router.post('/login', usuarioController.login);
router.get('/usuariosAprobados', usuarioController.usuariosAprobados);
router.post('/eliminarUsuario', usuarioController.eliminarUsuario);
router.get('/usuariosDesaprobados', usuarioController.usuariosDesaprobados);
router.post('/aprobarUsuario', usuarioController.aprobarUsuario);
router.post('/crearUsuario', usuarioController.crearUsuario);

//PENDIENTES DE USAR AUN
router.post('/editarUsuario', usuarioController.editarUsuario);
//router.get('/buscarUsuarioPorNombre', usuarioController.buscarUsuarioPorNombre);
module.exports = router;//exporar el routers