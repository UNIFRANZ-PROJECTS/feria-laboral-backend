const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const covenantCategoryCampus = sequelize.define('pass_covenant_category_headquarters', {
    cat_agr_id: {
      type: Sequelize.INTEGER,
    },
    hdq_id: {
      type: Sequelize.INTEGER ,
    },
  });
  module.exports=covenantCategoryCampus;
  