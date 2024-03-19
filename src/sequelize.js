const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce_ts2', 'admin', 'admin',
{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;