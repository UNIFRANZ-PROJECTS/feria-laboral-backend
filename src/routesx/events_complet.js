const express = require('express');
const router = express.Router();
const passport = require('passport');
// create Permission model
const Site = require("../models/sites.js");
  const User = require("../models/users.js");
  const Survey = require("../models/surveys.js");
  const Customer = require("../models/customers.js");
  const TypeEvent = require("../models/typeEvents.js");
  const Campus = require("../models/campus.js");
const Event = require("../models/events.js");

 
  Event.belongsTo(User, {foreignKey: 'user_id'});
  Event.belongsTo(Survey, {foreignKey: 'survey_id'});
  Event.belongsTo(TypeEvent, {foreignKey: 'event_type_id'});
  Event.belongsTo(Campus, {foreignKey: 'campus_id'});
  // create some helper functions to work on the database
  const getCustomer = async (obj) => {
    return await Customer.findOne({
      where:obj,
    });
  };
  const getAllEvents = async (obj) => {
    return await Event.findAll({
      where:obj,
        include: [
            {
                model: Survey,
                required: true
            },
            {
                model: TypeEvent,
                required: true
            },
            {
                model: Campus,
                required: true
            },
        ],
        order :[
          ['evn_start_day', 'ASC']
        ]
         
      })
  };
  const createEvent = async ({user_id,survey_id,event_type_id,campus_id,evn_name,evn_description,evn_miles,evn_start_day,evn_end_day,evn_cost,evn_img,evn_color,evn_state}) => {
    return await Event.create({user_id,survey_id,event_type_id,campus_id,evn_name,evn_description,evn_miles,evn_start_day,evn_end_day,evn_cost,evn_img,evn_color,evn_state});
  };
  const getAllTypesEvents = async obj => {
    return await TypeEvent.findAll({
      where: obj,
    });
  };
  // get all Permissions+
  router.get('/event/customers/:Id', passport.authenticate('jwt', { session: false }), async function(req, res, next){
    doSomething()
    async function doSomething() {
      let customer = await getCustomer({ id: req.params.Id })
      console.log(customer.campus_id)
      let event = await getAllEvents({ campus_id: customer.campus_id })
      res.json(event)
    }
  });
  router.get('/eventss',async function(req,res) {
    // const sms = require('sms-service');
    // const smsService = new sms.SMSService();
    
    // // for (let index = 0; index < 50; index++) {
    // //   smsService.sendSMS('+59160505288','PASAPORTE UNIFRANZ: Hola KEvin (Ø_ø) つ •‿•)つ');
    // //   smsService.sendSMS('+59178873827','PASAPORTE UNIFRANZ: Hola Daniela (Ø_ø) つ •‿•)つ');
    // //   smsService.sendSMS('+59170513447','PASAPORTE UNIFRANZ: Hola David SE donde vives (Ø_ø) つ •‿•)つ');
    // //   smsService.sendSMS('+59168048580','PASAPORTE UNIFRANZ: Hola Gerson noSE donde vives (Ø_ø) つ •‿•)つ');
    // //   smsService.sendSMS('+59173735766','PASAPORTE UNIFRANZ: Hola Moi (Ø_ø) つ •‿•)つ');
    // // }
    // smsService.sendSMS('+59160505288','PASAPORTE UNIFRANZ: Hola KEvin (Ø_ø) つ •‿•)つ');
    // smsService.sendSMS('+59178873827','PASAPORTE UNIFRANZ: Hola Daniela (Ø_ø) つ •‿•)つ');
    // // smsService.sendSMS('+59170513447','PASAPORTE UNIFRANZ: Hola David SE donde vives (Ø_ø) つ •‿•)つ');
    // smsService.sendSMS('+59168048580','PASAPORTE UNIFRANZ: anda al banco つ •‿•)つ');
    // smsService.sendSMS('+59173735766','PASAPORTE UNIFRANZ: Hola Moi (Ø_ø) つ •‿•)つ');
    // // smsService.sendSMS('+59167312446','^^Hola Inge');
    // // smsService.sendSMS('+56974583859','^^Hola Sebastian');
    // // sms.account(12345678,null);
    // // sms.send("Hello world!");
    // // sms.on('sms:error', function(e) {
    // //   console.log(e.code + ": " + e.msg);
    // // });
     
    // // sms.on('sms:success', function(data) {
    // //   console.log("Success! :D");
    // // });
        getAllEvents()
    .then(result => res.json(result));
  });
  router.get('/types/events',passport.authenticate('jwt', { session: false }), function(req,res) {
    getAllTypesEvents({tevn_state:'1'})
    .then(result => res.json(result));
  });
  router.post('/register/event', function(req, res){
    const {site_id,user_id,survey_id,event_type_id,campus_id,evn_name,evn_description,evn_miles,evn_start_day,evn_end_day,evn_cost,evn_img,evn_color,evn_state} = req.body;
    createEvent({site_id,user_id,survey_id,event_type_id,campus_id,evn_name,evn_description,evn_miles,evn_start_day,evn_end_day,evn_cost,evn_img,evn_color,evn_state})
    .then((Event) => {
      res.json({message: 'Encuesta registrada',Event})
    })
  })
  
  module.exports = router;
