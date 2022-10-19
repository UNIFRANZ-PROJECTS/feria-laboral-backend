const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const covenantCategories = sequelize.define('pass_covenant_categories', {
    cat_agr_name: {
      type: Sequelize.STRING,
    },
    cat_agr_description: {
      type: Sequelize.STRING ,
    },
    cat_agr_state: {
      type: Sequelize.INTEGER,
    },
  });
  module.exports=covenantCategories;
  