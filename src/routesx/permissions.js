const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const sequelize = require("../conection.js");
// create Permission model
const Permission = require("../models/permissions.js");
  // create some helper functions to work on the database
  const createPermission = async ({per_name,per_description}) => {
    return await Permission.create({per_name,per_description});
  };
  
  const getAllPermissions = async () => {
    return await Permission.findAll();
  };
  
  const getPermission = async obj => {
    return await Permission.findOne({
      where: obj,
    });
  };
  // get all Permissions
  router.get('/permissions', function(req, res) {
    getAllPermissions().then(permission => res.json(permission));
  });
  
  // register route
  router.post('/register/permission', function(req, res, next) {
    const {per_name,per_description} = req.body;
    createPermission({per_name,per_description}).then(permission =>
      res.json({ permission, msg: 'cuenta registrada satisfactoriamente' })
    );
  });
  module.exports = router;
