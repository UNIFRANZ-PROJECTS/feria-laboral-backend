const express = require('express');
const router = express.Router();
const app = express();
//modelo Career
const Career = require("../models/careers.js");
//funcion 
const getAllCareers = async () => {
  return await Career.findAll();
};
  // get all Permissions
router.get('/careers', function(req, res) {
  getAllCareers().then(result => res.json(result));
});
module.exports = router;
