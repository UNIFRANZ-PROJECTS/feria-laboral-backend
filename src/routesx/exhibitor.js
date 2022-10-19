const express = require('express');
const router = express.Router();
// create Permission model
const Activitie = require("../models/activities.js");
const Exhibitors = require("../models/exhibitors.js");
  // create some helper functions to work on the database
  Exhibitors.belongsTo(Activitie, {foreignKey: 'activity_id'});



  const getAllExhibitors = async () => {
    return await Exhibitors.findAll({
        include: [
            {
                model: Activitie,
                required: true
            },
        ],
    });
  };
  const getExhibitor = async obj => {
    return await Exhibitors.findOne({
      where: obj,
      include: [
        {
            model: Activitie,
            required: true
        },
    ],
    });
  };
  // get all Permissions
  router.get('/exhibitors', function(req, res) {
    getAllExhibitors().then(result => res.json(result));
  });
  router.post('/exhibitor', async function(req, res, next) {
    const {id } = req.body;
    if (id) {
      let user = await getExhibitor({ id: id });
      if (!user) {
        res.json({ message: 'Usuario no existe' });
      }else{
        res.json({ message: 'Usuario existe',user });
      }
    }
  });

  module.exports = router;
