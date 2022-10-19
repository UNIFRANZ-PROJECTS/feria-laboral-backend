const express = require('express');
const router = express.Router();
// create Permission model
const categorySouvenirsModel = require("../models/categorySouvenirsModel.js");
  // create some helper functions to work on the database

  const getAllCategories = async () => {
    return await categorySouvenirsModel.findAll();
  };
  const getCategories = async obj => {
    return await categorySouvenirsModel.findOne();
  };
  // get all Permissions
  router.get('/categories', function(req, res) {
    getAllCategories().then(result => res.json(result));
  });

  module.exports = router;