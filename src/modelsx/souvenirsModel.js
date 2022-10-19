const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const souvenirsModel = sequelize.define('pass_souvenirs', {

    category_id: {
        type: Sequelize.INTEGER,
    },
    sov_detail: {
        type: Sequelize.STRING,
      },
    sov_stock_minq: {
        type: Sequelize.INTEGER,
    },
    sov_quantity: {
        type: Sequelize.INTEGER,
    },
    sov_miles: {
        type: Sequelize.INTEGER,
    },
    sov_picture: {
        type: Sequelize.STRING,
    },
    sov_state: {
        type: Sequelize.INTEGER,
    },

  });
  module.exports=souvenirsModel;