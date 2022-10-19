const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const specialityCustomers= sequelize.define('uwork_speciality_customers', {
    id_speciality: {
        type: Sequelize.INTEGER,
    },
    id_customer: {
        type: Sequelize.INTEGER,
    },
  });
  module.exports=specialityCustomers;