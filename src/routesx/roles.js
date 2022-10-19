const express = require('express');
const router = express.Router();
// create Permission model
const Rol = require("../models/roles.js");
  // create some helper functions to work on the database
  const createRol = async ({rls_name,rls_description}) => {
    return await Rol.create({rls_name,rls_description});
  };
  
  const getAllRoles = async () => {
    return await Rol.findAll();
  };
  
  const getRol = async obj => {
    return await Rol.findOne({
      where: obj,
    });
  };
  // get all Permissions
  router.get('/roles', function(req, res) {
    getAllRoles().then(rol => res.json(rol));
  });
  
  // register route
  router.post('/register/rol', function(req, res, next) {
    const {rls_name,rls_description} = req.body;
    createRol({rls_name,rls_description}).then(rol =>
      res.json({ rol, msg: 'cuenta registrada satisfactoriamente' })
    );
  });
  module.exports = router;
