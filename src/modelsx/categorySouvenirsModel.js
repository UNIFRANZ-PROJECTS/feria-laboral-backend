const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const categorySouvenirsModel = sequelize.define('pass_categories', {

    cat_name: {
        type: Sequelize.STRING,
    },
    cat_description: {
        type: Sequelize.STRING,
      },
  });
  module.exports=categorySouvenirsModel;