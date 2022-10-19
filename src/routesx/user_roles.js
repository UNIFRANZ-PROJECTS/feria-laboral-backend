const express = require('express');
const router = express.Router();
// create Permission model
const UserRol = require("../models/userRoles.js");
  // create some helper functions to work on the database
  const createRolPermission = async ({rol_id,user_id,responsable_id}) => {
    return await UserRol.create({rol_id,user_id,responsable_id});
  };
  const getRol = async obj => {
    return await UserRol.findOne({
      where: obj,
    });
  };
  router.post('/register/user/rol', function(req, res, next) {
    const {rol_id,user_id,responsable_id} = req.body;
    createRolPermission ({rol_id,user_id,responsable_id}).then(userRol =>
      res.json({ userRol, msg: 'cuenta registrada satisfactoriamente' })
    );
  });
  module.exports = router;
