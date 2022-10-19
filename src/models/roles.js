const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const roles= sequelize.define('uwork_roles', {
    rls_name: {
        type: Sequelize.STRING,
    },
    rls_description: {
        type: Sequelize.STRING,
    },
    rls_state: {
        type: Sequelize.INTEGER,
    },
  });
  module.exports=roles;