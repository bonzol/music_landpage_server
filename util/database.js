const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.USER_PASSWORD, {
  dialect: process.env.DIALECT,
  host: process.env.HOST
});

module.exports = sequelize;
