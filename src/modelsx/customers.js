const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Customer = sequelize.define('pass_customers', {
    cus_code: {
      type: Sequelize.STRING,
    },
    campus_id: {
      type: Sequelize.INTEGER ,
    },
    cus_full_names: {
      type: Sequelize.STRING,
    },
    cus_surnames: {
      type: Sequelize.STRING,
    },
    cus_identity_card: {
      type: Sequelize.INTEGER ,
    },
    cus_date_of_birth: {
      type: Sequelize.STRING,
    },
    cus_gender: {
      type: Sequelize.STRING,
    },
    cus_mail: {
      type: Sequelize.STRING,
    },
    cus_phone: {
      type: Sequelize.INTEGER ,
    },
    cus_password: {
      type: Sequelize.STRING,
    },
    cus_img: {
      type: Sequelize.STRING,
    },
    cus_miles: {
      type: Sequelize.STRING,
    },
  });
  module.exports=Customer;
  