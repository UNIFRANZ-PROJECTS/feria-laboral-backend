const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const UserRol = sequelize.define('pass_user_roles', {
    rol_id: {
      type: Sequelize.STRING,
      },
    user_id: {
      type: Sequelize.STRING,
    },
    responsable_id: {
        type: Sequelize.STRING,
      },
  });
  module.exports=UserRol;