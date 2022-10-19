const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Channels = sequelize.define('pass_channels', {
    id_user: {
        type: Sequelize.INTEGER,
      },
    chn_name: {
      type: Sequelize.STRING,
    },
    chn_description: {
        type: Sequelize.STRING,
    },
    chn_image: {
        type: Sequelize.STRING,
    },
    chn_color: {
        type: Sequelize.STRING,
    },
  });
  module.exports=Channels;