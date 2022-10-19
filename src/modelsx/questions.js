const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Question = sequelize.define('pass_questions', {
    type_question_id: {
        type: Sequelize.STRING,
    },
    qst_question: {
        type: Sequelize.STRING,
    },
    qst_description: {
        type: Sequelize.STRING,
    },
  });
  module.exports=Question;