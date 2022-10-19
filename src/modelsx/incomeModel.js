const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const incomeModel = sequelize.define('pass_income_souvenirs', {

    user_id: {
        type: Sequelize.INTEGER,
    },
    souvenir_id: {
        type: Sequelize.INTEGER,
      },
    inc_concept: {
        type: Sequelize.STRING,
    },
    inc_quantity: {
        type: Sequelize.INTEGER,
    },

  });
  module.exports=incomeModel;