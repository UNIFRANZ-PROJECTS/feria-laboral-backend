const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const sequelize = require("../conection.js");
// create Permission model
const RolPermission = require("../models/rolPermissions.js");
  // create some helper functions to work on the database
  const createRolPermission = async ({rol_id,permission_id}) => {
    return await RolPermission.create({rol_id,permission_id});
  };
  const getRol = async obj => {
    return await RolPermission.findOne({
      where: obj,
    });
  };
  router.post('/register/rol/permission', function(req, res, next) {
    const {rol_id,permission_id} = req.body;
    createRolPermission ({rol_id,permission_id}).then(rolPermission =>
      res.json({ rolPermission, msg: 'cuenta registrada satisfactoriamente' })
    );
  });
  module.exports = router;
