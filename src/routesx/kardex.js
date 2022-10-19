const express = require('express');
const router = express.Router();
// create Permission model
const kardexModel = require("../models/kardexModel.js");
const SouvenirsModel = require("../models/souvenirsModel.js");
const incomeModel = require("../models/incomeModel.js");
const departureModel = require("../models/departureModel.js");

  // create some helper functions to work on the database
kardexModel.belongsTo(SouvenirsModel, {foreignKey: 'id'});
kardexModel.belongsTo(incomeModel, {foreignKey: 'entry_souvenir_id'});
kardexModel.belongsTo(departureModel, {foreignKey: 'egress_souvenir_id'});



  const getAllKardex = async () => {
    return await kardexModel.findAll({
       include: [
            {
                model: SouvenirsModel,
                required: false
            },
            {
                model: incomeModel,
                required: false
            },
            {
                model: departureModel,
                required: false
            },

        ],
    });
  };

  router.get('/kardex', function(req, res) {
    getAllKardex().then(result => res.json(result));
  });





  module.exports = router;