const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const SurveyQuestions = sequelize.define('pass_survey_questions', {
    survey_id: {
        type: Sequelize.STRING,
    },
    question_id: {
        type: Sequelize.STRING,
    },
  });
  module.exports=SurveyQuestions;