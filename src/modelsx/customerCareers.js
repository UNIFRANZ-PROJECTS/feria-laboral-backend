const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const CustomerCareer = sequelize.define('pass_customer_careers', {
    customer_id: {
      type: Sequelize.STRING,
      },
    career_id: {
      type: Sequelize.STRING,
    },
  });
  module.exports=CustomerCareer;