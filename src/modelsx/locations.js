const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Locations = sequelize.define('pass_locations', {
    lct_latitude: {
        type: Sequelize.STRING,
      },
    lct_length: {
      type: Sequelize.STRING,
    }
  });
  module.exports=Locations;