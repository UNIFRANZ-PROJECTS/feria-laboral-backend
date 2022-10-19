const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const interests= sequelize.define('uwork_interests', {
    id_customer: {
        type: Sequelize.INTEGER,
      },
      id_company: {
        type: Sequelize.INTEGER,
      },
      id_manager: {
        type: Sequelize.INTEGER,
      },
      int_state: {
        type: Sequelize.INTEGER,
      },
  });
  module.exports=interests;