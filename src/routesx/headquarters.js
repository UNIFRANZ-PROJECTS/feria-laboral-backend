const express = require('express');
const router = express.Router();
const passport = require('passport');
// create Permission model
const Campus = require("../models/campus.js");
  // create some helper functions to work on the database
  const createPermission = async ({location_id,hdq_name,hdq_phone_number,hdq_mail,hdq_url_image}) => {
    return await Campus.create({location_id,hdq_name,hdq_phone_number,hdq_mail,hdq_url_image});
  };
  
  const getAllHeadquarters = async () => {
    return await Campus.findAll();
  };
  
  const getPermission = async obj => {
    return await Campus.findOne({
      where: obj,
    });
  };
  // get all Permissions
  router.get('/headquarters', passport.authenticate('jwt', { session: false }), function(req, res) {
    getAllHeadquarters().then(result => res.json(result));
  });
  
  // register route
  router.post('/campus', function(req, res, next) {
    const {location_id,hdq_name,hdq_phone_number,hdq_mail,hdq_url_image} = req.body;
    createPermission({location_id,hdq_name,hdq_phone_number,hdq_mail,hdq_url_image}).then(result =>
      res.json({ result, msg: 'campus registrada satisfactoriamente' })
    );
  });
  module.exports = router;
