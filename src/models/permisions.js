const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const permisions= sequelize.define('uwork_permisions', {
    per_name: {
        type: Sequelize.STRING,
    },
    per_description: {
        type: Sequelize.STRING,
    },
    per_state: {
        type: Sequelize.INTEGER,
    },
  });
  module.exports=permisions;