const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const TypeEvent = sequelize.define('pass_types_events', {
    tevn_name: {
      type: Sequelize.STRING,
    },
    tevn_description: {
      type: Sequelize.STRING,
    },
    tevn_state: {
      type: Sequelize.STRING,
    },
  });
  module.exports=TypeEvent;