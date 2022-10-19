const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const rolPermisions= sequelize.define('uwork_rol_permisions', {
    id_rol: {
        type: Sequelize.INTEGER,
    },
    id_permision: {
        type: Sequelize.INTEGER,
    },
  });
  module.exports=rolPermisions;