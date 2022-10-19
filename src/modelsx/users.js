const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const User = sequelize.define('pass_users', {
    id_rol: {
      type: Sequelize.INTEGER,
    },
    id_responsable: {
      type: Sequelize.INTEGER,
    },
    id_facebook: {
      type: Sequelize.INTEGER,
    },  
    usr_full_names: {
      type: Sequelize.STRING,
    },
    usr_surname: {
      type: Sequelize.STRING,
    },
    usr_second_surname: {
      type: Sequelize.STRING,
    },
    usr_name_fb: {
      type: Sequelize.STRING,
    },
    usr_picture: {
      type: Sequelize.STRING,
    },
    usr_gender: {
      type: Sequelize.STRING,
    },
    usr_mail: {
      type: Sequelize.STRING,
    },
    usr_phone: {
      type: Sequelize.INTEGER,
    },
    usr_birthday: {
      type: Sequelize.DATEONLY,
    },
    usr_password: {
      type: Sequelize.STRING,
    },
    usr_state: {
      type: Sequelize.INTEGER,
    },
    usr_mail_validate: {
      type: Sequelize.DATE,
    },
  });
  module.exports=User;