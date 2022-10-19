const express = require('express');
const router = express.Router();
const passport = require('passport');
const app = express();
//modelo Career
const covenantCategories = require("../models/covenant_categories.js");
const covenants = require("../models/covenants.js");
const covenantCategoryCampus = require("../models/covenant_category_campus.js");
const Campus = require("../models/campus.js");
const covenantCampus = require("../models/covenant_campus.js");

covenantCategoryCampus.belongsTo(covenantCategories, {foreignKey: 'cat_agr_id'});
covenantCategoryCampus.belongsTo(Campus, {foreignKey: 'hdq_id'});

covenantCampus.belongsTo(Campus, {foreignKey: 'campus_id'});
covenantCampus.belongsTo(covenants, {foreignKey: 'covenant_id'});

const getAllCovenantCategoriesCampus = async (obj) => {
    return await covenantCategoryCampus.findAll(
        {where:obj,
            include: [
                {
                    model: covenantCategories,
                    required: true
                },
                {
                    model: Campus,
                    required: true
                },
            ],}
    );
  };

  const getAllCovenantCampus = async (obj) => {
    return await covenantCampus.findAll(
        {where:obj,
            include: [
                {
                    model: Campus,
                    required: true
                },
                {
                    model: covenants,
                    required: true
                },
            ],}
    );
  };
//funcion 
const getAllCovenantCategories = async () => {
  return await covenantCategories.findAll();
};
const getAllCovenants = async () => {
    return await covenants.findAll();
  };

router.get('/allcategorycovenant/campus',passport.authenticate('jwt', { session: false }), function(req, res) {
    getAllCovenantCategoriesCampus().then(result => res.json(result));
});
router.get('/allcovenants/campus',passport.authenticate('jwt', { session: false }), function(req, res) {
    getAllCovenantCampus().then(result => res.json(result));
});

router.get('/covenant/categories',passport.authenticate('jwt', { session: false }), function(req, res) {
    getAllCovenantCategories().then(result => res.json(result));
});
router.get('/covenants',passport.authenticate('jwt', { session: false }), function(req, res) {
    getAllCovenants().then(result => res.json(result));
});
module.exports = router;