const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const RolPermission = sequelize.define('pass_roles_permissions', {
    rol_id: {
      type: Sequelize.STRING,
      },
    permission_id: {
      type: Sequelize.STRING,
    },
  });
  module.exports=RolPermission;