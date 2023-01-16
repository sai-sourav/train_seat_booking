const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Seat = sequelize.define('seat', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  seatid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Seat;