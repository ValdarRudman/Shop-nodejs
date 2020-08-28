const Sequelize = require('sequelize');

const sequelize = new Sequelize('shopNodejs', 'vrud', 'temppass', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;