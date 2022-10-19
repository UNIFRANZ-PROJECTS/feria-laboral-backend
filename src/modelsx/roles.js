const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Rol = sequelize.define('pass_roles', {
    rls_name: {
        type: Sequelize.STRING,
      },
    rls_description: {
      type: Sequelize.STRING,
    },
  });
  module.exports=Rol;