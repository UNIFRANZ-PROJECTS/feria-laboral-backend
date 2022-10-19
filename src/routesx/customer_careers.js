const express = require('express');
const router = express.Router();
// create Permission model
const CustomerCareer = require("../models/customerCareers.js");
  // create some helper functions to work on the database
  const createCustomerCareer = async ({customer_id,career_id}) => {
    return await CustomerCareer.create({customer_id,career_id});
  };
  router.post('/register/customer/career', function(req, res, next) {
    const {customer_id,career_id} = req.body;
    createCustomerCareer ({customer_id,career_id}).then(result =>
      res.json({ result, msg: 'correcto' })
    );
  });
  module.exports = router;
