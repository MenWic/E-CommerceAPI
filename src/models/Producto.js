const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    /* imagen: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true //probar
    }, */
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    estado: { /* Determinar estado de Producto o Servicio */
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: { /* Tag para clasificacion */
        type: DataTypes.STRING,
        allowNull: false,
    },
    aprobado: {
        type: DataTypes.BOOLEAN, //String = Desaprobado (Solicitud), Aprobado (Producto en Venta), Vendido (Producto Vendido)
        allowNull: false
    },
    vendido: {
        type: DataTypes.BOOLEAN, //String = Desaprobado (Solicitud), Aprobado (Producto en Venta), Vendido (Producto Vendido)
        allowNull: false
    },

   /*  disponible: {
        type: DataTypes.STRING, //String = Desaprobado (Solicitud), Aprobado (Producto en Venta), Vendido (Producto Vendido)
        allowNull: false
    } */
});

module.exports = Producto;