const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const covenants = sequelize.define('pass_covenants', {
    user_id: {
      type: Sequelize.INTEGER,
    },
    cat_agr_id: {
        type: Sequelize.INTEGER ,
    },
    agr_name: {
        type: Sequelize.STRING,
    },
    agr_description: {
        type: Sequelize.STRING,
    },
    agr_end_date: {
        type: Sequelize.STRING,
    },
    agr_state: {
        type: Sequelize.INTEGER,
    },
  });
  module.exports=covenants;