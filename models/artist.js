const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Artist = sequelize.define("artist", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  artistname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  lang: {
    type: Sequelize.STRING,
    defaultValue: 'heb'
  }
});

module.exports = Artist;
