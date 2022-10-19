const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const carrerHeadquarters = sequelize.define('uwork_carrer_headquarters', {
    id_carrer: {
        type: Sequelize.INTEGER,
      },
    id_campus: {
        type: Sequelize.INTEGER,
      },
  });
  module.exports=carrerHeadquarters;
  