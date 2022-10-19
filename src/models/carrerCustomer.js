const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const carrerCustomers = sequelize.define('uwork_carrer_customers', {
    id_customer: {
        type: Sequelize.INTEGER,
      },
    id_carrer: {
        type: Sequelize.INTEGER,
      },
  });
  module.exports=carrerCustomers;
  