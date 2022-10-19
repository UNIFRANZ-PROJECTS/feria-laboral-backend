const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const headquarters= sequelize.define('uwork_headquarters', {
    id_user: {
        type: Sequelize.INTEGER,
      },
    hdq_name: {
        type: Sequelize.STRING,
      },
      hdq_contact: {
        type: Sequelize.STRING,
      },
      hdq_email: {
        type: Sequelize.STRING,
      },
      hdq_state: {
        type: Sequelize.INTEGER,
      },
  });
  module.exports=headquarters;