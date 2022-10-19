const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Career = sequelize.define('pass_careers', {
    faculty_id: {
        type: Sequelize.STRING,
      },
    car_name: {
      type: Sequelize.STRING,
    },
    car_abbreviation: {
        type: Sequelize.STRING,
      },
  });
  module.exports=Career;