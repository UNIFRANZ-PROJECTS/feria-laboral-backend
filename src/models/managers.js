const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const managers= sequelize.define('uwork_managers', {
    id_user: {
        type: Sequelize.INTEGER,
      },
    id_company:{
        type: Sequelize.INTEGER,
      },
    mng_name: {
        type: Sequelize.STRING,
      },
      mng_surname: {
        type: Sequelize.STRING,
      },
      mng_second_surname: {
        type: Sequelize.STRING,
      },
      mng_contact: {
        type: Sequelize.STRING,
      },
      mng_email: {
        type: Sequelize.STRING,
      },
      mng_password: {
        type: Sequelize.STRING,
      },
      mng_state: {
        type: Sequelize.INTEGER,
      },
  });
  module.exports=managers;