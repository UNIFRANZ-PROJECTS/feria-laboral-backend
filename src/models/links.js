const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const links= sequelize.define('uwork_links', {
    id_customer: {
        type: Sequelize.INTEGER,
      },
      lnk_url: {
        type: Sequelize.STRING,
      },
      lnk_description: {
        type: Sequelize.STRING,
      },
      lnk_state: {
        type: Sequelize.INTEGER,
      },
  });
  module.exports=links;