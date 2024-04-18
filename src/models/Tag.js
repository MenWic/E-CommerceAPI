const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Tag = sequelize.define('Tag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});


module.exports = Tag;