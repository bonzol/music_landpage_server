const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Album = sequelize.define('album', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Album;