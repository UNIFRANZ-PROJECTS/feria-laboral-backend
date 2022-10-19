const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const customers= sequelize.define('uwork_customers', {
    id_carrer:{
      type: Sequelize.INTEGER,
    },
    sede: {
        type: Sequelize.STRING,
      },
    cus_code:{
      type: Sequelize.STRING,
    },
    cus_name: {
        type: Sequelize.STRING,
      },
      cus_surname: {
        type: Sequelize.STRING,
      },
      cus_second_surname: {
        type: Sequelize.STRING,
      },
      cus_description: {
        type: Sequelize.STRING,
      },
      cus_img: {
        type: Sequelize.STRING,
      },
      cus_password: {
        type: Sequelize.STRING,
      },
      cus_email: {
        type: Sequelize.STRING,
      },
      cus_number_phone: {
        type: Sequelize.STRING,
      },
      cus_date_birth: {
        type: Sequelize.STRING,
      },
      cus_state: {
        type: Sequelize.INTEGER,
      },
  });
  module.exports=customers;