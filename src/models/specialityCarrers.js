const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const specialityCarrers= sequelize.define('uwork_speciality_carrers', {
    id_speciality: {
        type: Sequelize.INTEGER,
    },
    id_carrer: {
        type: Sequelize.INTEGER,
    },
  });
  module.exports=specialityCarrers;