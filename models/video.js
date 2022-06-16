const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Video = sequelize.define('video', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  source: Sequelize.STRING,
  title: Sequelize.STRING
});

module.exports = Video;