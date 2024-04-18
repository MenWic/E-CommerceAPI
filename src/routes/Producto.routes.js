const express = require('express');

const productoController = require("../controllers/Producto.controller");

const router = express.Router();

//Rutas funcionales
router.post('/crearProducto', productoController.crearProducto);
router.post('/eliminarProducto', productoController.eliminarProducto);
router.get('/productosDesaprobados', productoController.productosDesaprobados);
router.post('/aprobarProducto', productoController.aprobarProducto);

//router.post('/reportarProducto', productoController.reportarProducto);

module.exports = router; //exporar el routers