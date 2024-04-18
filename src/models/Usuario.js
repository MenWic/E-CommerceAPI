const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Producto = require('./Producto');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aprobado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

//Relacion: 1 Usuario tiene * Productos
Usuario.hasMany(Producto, {
    foreignKey: {
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    hooks: true
});
Producto.belongsTo(Usuario);

module.exports = Usuario;