const Sequelize = require("sequelize");

const sequelize = new Sequelize('logs', 'root', 'Monuking@12', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;