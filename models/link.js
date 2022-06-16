const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Link = sequelize.define("link", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  link: Sequelize.STRING,
  company: Sequelize.STRING,
  title: Sequelize.STRING,
});

module.exports = Link;
