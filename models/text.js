const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Text = sequelize.define('text', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  paragraph: Sequelize.STRING,
  placement: Sequelize.ENUM('start', 'middle', 'end')
});

module.exports = Text;