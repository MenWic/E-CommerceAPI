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
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aprobado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Producto;