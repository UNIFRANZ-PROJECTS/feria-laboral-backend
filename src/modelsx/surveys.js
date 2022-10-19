const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Survey = sequelize.define('pass_surveys', {
    srv_name: {
      type: Sequelize.STRING,
    },
    srv_description: {
      type: Sequelize.STRING,
    },
    srv_state: {
      type: Sequelize.INTEGER,
    },
  });
  module.exports=Survey;