const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Campus = sequelize.define('pass_headquarters', {
    location_id: {
        type: Sequelize.STRING,
      },
    hdq_name: {
      type: Sequelize.STRING,
    },
    hdq_phone_number: {
        type: Sequelize.STRING,
    },
    hdq_mail: {
        type: Sequelize.STRING,
    },
    hdq_url_image: {
        type: Sequelize.STRING,
    },
  });
  module.exports=Campus;