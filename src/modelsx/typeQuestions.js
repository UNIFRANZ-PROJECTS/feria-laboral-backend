const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const TypeQuestion = sequelize.define('pass_types_questions', {
    tqst_name: {
        type: Sequelize.STRING,
    },
    tqst_description: {
        type: Sequelize.STRING,
    },
  });
  module.exports=TypeQuestion;