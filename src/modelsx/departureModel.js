const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const departureModel = sequelize.define('pass_departures_souvenirs', {

    souvenir_id: {
        type: Sequelize.INTEGER,
    },
    user_id: {
        type: Sequelize.INTEGER,
      },
    customer_id: {
        type: Sequelize.INTEGER,
    },
    dep_concept: {
        type: Sequelize.STRING,
    },
    esov_quantity: {
        type: Sequelize.INTEGER,
    },


  });
  module.exports=departureModel;