const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const covenantCampus = sequelize.define('pass_covenant_headquarters', {
    campus_id: {
      type: Sequelize.INTEGER,
    },
    covenant_id: {
      type: Sequelize.INTEGER ,
    },
  });
  module.exports=covenantCampus;
  