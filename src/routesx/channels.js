const express = require('express');
const router = express.Router();
const passport = require('passport');
const Channels = require("../models/channels.js");
const getAllChannels = async () => {
  return await Channels.findAll();
};
router.get('/channels',passport.authenticate('jwt', { session: false }), function(req, res) {
    getAllChannels().then(result => res.json(result));
});
module.exports = router;
