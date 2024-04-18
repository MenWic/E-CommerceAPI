const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Tag = require('./Tag');
const Producto = require('./Producto');

const TagProducto = sequelize.define('TagProducto', {
});

//Relacion: * Tags perteneces a * Producto
Tag.belongsToMany(Producto, { through: TagProducto });
Producto.belongsToMany(Tag, { through: TagProducto });

module.exports = TagProducto;