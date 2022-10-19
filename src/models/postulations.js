const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const postulations= sequelize.define('uwork_postulations', {
    id_speciality: {
        type: Sequelize.INTEGER,
    },
    id_customer: {
        type: Sequelize.INTEGER,
    },
    pos_name: {
        type: Sequelize.STRING,
    },
    pos_description: {
        type: Sequelize.STRING,
    },
    pos_url: {
        type: Sequelize.STRING,
    },
    pos_state: {
        type: Sequelize.INTEGER,
    },
  });
  module.exports=postulations;