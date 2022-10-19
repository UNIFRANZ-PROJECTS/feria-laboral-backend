const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Site = sequelize.define('pass_sites', {
    location_id: {
        type: Sequelize.STRING,
    },
    sts_name: {
        type: Sequelize.STRING,
    },
    sts_description: {
        type: Sequelize.STRING,
    },
  });
  module.exports=Site;