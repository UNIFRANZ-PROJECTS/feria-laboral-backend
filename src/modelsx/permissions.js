const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Permission = sequelize.define('pass_permissions', {
    per_name: {
        type: Sequelize.STRING,
      },
    per_description: {
      type: Sequelize.STRING,
    },
  });
  module.exports=Permission;