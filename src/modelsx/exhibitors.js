const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Exhibitors = sequelize.define('pass_exhibitors', {
    activity_id: {
        type: Sequelize.STRING,
    },
    exh_full_names: {
        type: Sequelize.STRING,
    },
    exh_surnames: {
        type: Sequelize.STRING,
      },
    exh_mail: {
        type: Sequelize.STRING,
    },
    exh_phone: {
        type: Sequelize.STRING,
    },
    exh_description: {
        type: Sequelize.STRING,
    },
  });
  module.exports=Exhibitors;