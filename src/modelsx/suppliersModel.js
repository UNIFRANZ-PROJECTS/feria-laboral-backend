const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const souvenirsModel = sequelize.define('pass_suppliers', {

    prv_abbreviation: {
        type: Sequelize.STRING,
    },
    prv_name: {
        type: Sequelize.STRING,
      },
    prv_direction: {
        type: Sequelize.STRING,
    },
    prv_ref: {
        type: Sequelize.INTEGER,
    }
  });
  module.exports=souvenirsModel;