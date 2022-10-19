const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: 'u266992280_pasaporte',
    username: 'u266992280_pasaporte',
    password: 'Pasaporte123',
    dialect: 'mysql',
    host: '151.106.97.85',
    timezone: '-04:00',
  });
  module.exports=sequelize;
  