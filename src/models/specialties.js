const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const specialties= sequelize.define('uwork_specialties', {
    id_user: {
        type: Sequelize.INTEGER,
    },
    spe_name: {
        type: Sequelize.STRING,
    },
    spe_description: {
        type: Sequelize.STRING,
    },
    spe_state: {
        type: Sequelize.INTEGER,
    },
  });
  module.exports=specialties;