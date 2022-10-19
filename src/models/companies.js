const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const companies= sequelize.define('uwork_companies', {
    id_user: {
        type: Sequelize.INTEGER,
      },
    cmp_name: {
        type: Sequelize.STRING,
      },
      cmp_description: {
        type: Sequelize.STRING,
      },
      cmp_contact: {
        type: Sequelize.STRING,
      },
      cmp_email: {
        type: Sequelize.STRING,
      },
      cmp_address: {
        type: Sequelize.STRING,
      },
      cmp_state: {
        type: Sequelize.INTEGER,
      },
  });
  module.exports=companies;