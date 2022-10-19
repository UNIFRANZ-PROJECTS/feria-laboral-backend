const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const carrers= sequelize.define('uwork_carrers', {
    id_user: {
        type: Sequelize.INTEGER,
      },
    carr_name: {
        type: Sequelize.STRING,
      },
      carr_description: {
        type: Sequelize.STRING,
      },
      carr_state: {
        type: Sequelize.INTEGER,
      },
  });
  module.exports=carrers;