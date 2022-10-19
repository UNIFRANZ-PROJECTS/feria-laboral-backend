const express = require('express');
const router = express.Router();
const passport = require('passport');
// create Permission model
const Activitie = require("../models/activities.js");
const Event = require("../models/events.js");

  Activitie.belongsTo(Event, {foreignKey: 'event_id'});
  // create some helper functions to work on the database
  const getAllActivitiesEvent= async obj => {
    return await Activitie.findAll({
        where:obj,
        include: [
          {
              model: Event,
              required: true
          },
      ],
    });
  };
  router.get('/activitiesEvent/:Id',passport.authenticate('jwt', { session: false }) ,async function(req, res, next){
    let Activitie = await getAllActivitiesEvent({event_id:req.params.Id });
    // console.log(Activitie.pass_event.id)
    let fecha1 = new Date(Activitie[0].pass_event.evn_start_day+'T04:00:00.000Z');
    let fecha2 = new Date(Activitie[0].pass_event.evn_end_day+'T04:00:00.000Z');
    function sumarDias(fecha, dias){
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    }
    let contador=0
    let SelectActivities=new Object();
    let Activitiesfech=[]
    let resta = fecha2.getTime() - fecha1.getTime()
    let diasTotales= Math.round(resta/ (1000*60*60*24))
    for (let i = 0; i < diasTotales+1; i++) {
      console.log(fecha1)
      Activitiesfech = await getAllActivitiesEvent({act_date: fecha1,event_id: req.params.Id});
      SelectActivities[i] = Activitiesfech;
      if (SelectActivities[i].length>0) {contador++}    
      fecha1=sumarDias(fecha1,+1)
    }
    res.json({SelectActivities,dias:diasTotales+1,contador});
  });


  const getAllActivities = async () => {
    return await Activitie.findAll();
  };
  // get all Permissions
  router.get('/activities', function(req, res) {
    getAllActivities().then(result => res.json(result));
  });
  module.exports = router;
