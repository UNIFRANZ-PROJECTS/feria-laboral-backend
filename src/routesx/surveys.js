const express = require('express');
const router = express.Router();
const passport = require('passport');
const Survey = require("../models/surveys.js");
const Question = require("../models/questions.js");
const TypeQuestion = require("../models/typeQuestions.js");
  const SurveyQuestions = require("../models/surveyQuestions.js");

const upload = require('../libs/storage')

Question.belongsTo(TypeQuestion, {foreignKey: 'type_question_id'});
SurveyQuestions.belongsTo(Survey, {foreignKey: 'survey_id'});
SurveyQuestions.belongsTo(Question, {foreignKey: 'question_id'});
  // create some helper functions to work on the database
  const getAllSurveys = async (obj) => {
    return await Survey.findAll({
      where:obj,
    });
  };
  const getAllTypeQuestions = async () => {
    return await TypeQuestion.findAll();
  };
  const getAllQuestions= async obj => {
    return await Question.findAll({
        where:obj,
        include: [
          {
              model: TypeQuestion
          },
      ],
    });
  };
  const getQuestion= async obj => {
    return await Question.findOne({
        where:obj,
        include: [
          {
              model: TypeQuestion,
          },
      ],
    });
  };
  const createQuestion = async ({type_question_id,qst_question,qst_description}) => {
    return await Question.create({type_question_id,qst_question,qst_description});
  };
  const createSurvey = async ({srv_name,srv_description}) => {
    return await Survey.create({srv_name,srv_description});
  };
  const createSurveyQuestions = async ({survey_id,question_id}) => {
    return await SurveyQuestions.create({survey_id,question_id});
  };

router.post('/guardar/imagen', upload.single('souvenirs'),function (req, res, next) {
    res.send({message: 'Imagen Guardado',data:req.file})
});
// get all Permissions
router.get('/surveys',passport.authenticate('jwt', { session: false }), function(req, res) {//lista de encuestas
    getAllSurveys({'srv_state':'1'}).then(result => res.json(result))
})
router.get('/typequestions', function(req, res) {//lista de encuestas
  getAllTypeQuestions().then(result => res.json(result))
})
router.get('/questions',passport.authenticate('jwt', { session: false }), function(req, res) {
    getAllQuestions().then(result => res.json(result))
})
router.post('/register/questionswithsurvey', function(req, res) {
    console.log(req.body)
    const { type_question_id,qst_question,qst_description,survey_id} = req.body;
    createQuestion({type_question_id,qst_question,qst_description})
    .then(Question =>{
          const question_id=Question.id
          createSurveyQuestions({survey_id,question_id})
          .then((resultSurvey) => {
                getQuestion({ id: resultSurvey.question_id })
                .then((resultQuestion) => {
                      res.json({message: 'Pregunta registrada',resultSurvey,resultQuestion})
                })
          })
    }
    )
})
router.post('/register/survey', function(req, res){
  const { srv_name,srv_description} = req.body;
  createSurvey({srv_name,srv_description})
  .then((Survey) => {
    res.json({message: 'Encuesta registrada',Survey})
  })
})

module.exports = router;