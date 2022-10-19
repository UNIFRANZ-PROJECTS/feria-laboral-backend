const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const users= sequelize.define('uwork_users', {
    id_rol: {
        type: Sequelize.INTEGER,
    },
    id_responsable: {
        type: Sequelize.INTEGER,
      },
    usr_name: {
        type: Sequelize.STRING,
    },
    usr_surname: {
        type: Sequelize.STRING,
    },
    usr_second_surname: {
        type: Sequelize.STRING,
    },
    usr_contact: {
        type: Sequelize.STRING,
    },
    usr_email: {
        type: Sequelize.STRING,
    },
    usr_password: {
        type: Sequelize.STRING,
    },
    usr_state: {
        type: Sequelize.INTEGER,
    },
  });
  module.exports=users;