const express = require('express');
const router = express.Router();

const headquarters = require("../models/headquarters.js");

const getAllHeadquarters = async obj => {
    return await headquarters.findAll({
      where: obj,
    });
};
router.get('/api/headquarters', function(req, res) {
    getAllHeadquarters({hdq_state:1}).then(result => res.json(result));
});

module.exports = router;