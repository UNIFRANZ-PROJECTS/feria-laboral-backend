const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getCustomer({ id: jwt_payload.id });
  
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
passport.use(strategy);
router.use(passport.initialize());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
  const managers = require("../models/managers.js");
  const companies = require("../models/companies.js");

  managers.belongsTo(companies, {foreignKey: 'id_company'});
  const createManager = async ({id_user,id_company,mng_name,mng_surname,mng_second_surname,mng_contact,mng_email,mng_password,mng_state}) => {
    return await managers.create({id_user,id_company,mng_name,mng_surname,mng_second_surname,mng_contact,mng_email,mng_password,mng_state});
  };
  const getAllManagers = async obj => {
    return await managers.findAll({
      where: obj,
      include: [
        {
            model: companies,
            required: true
        },
      ]
    });
  };
  const getManager = async obj => {
    return await managers.findOne({
      where: obj,
      include: [
        {
            model: companies,
            required: true
        },
      ]
    });
  };
  router.post('/api/register/manager', function(req, res, next) {
    const {id_user,id_company,mng_name,mng_surname,mng_second_surname,mng_contact,mng_email,mng_password,mng_state} = req.body;
    createManager({id_user,id_company,mng_name,mng_surname,mng_second_surname,mng_contact,mng_email,mng_password,mng_state})
    .then(result =>{
      res.json({result, msg: 'cuenta registrada satisfactoriamente mente' })
    }
    );
  });
  router.get('/api/managers', function(req, res) {
    getAllManagers().then(result => res.json(result));
  });
  router.get('/api/manager/:Id', function(req, res) {
    getManager({ id: req.params.Id})
    .then(result => res.json(result));
  });
  router.post('/api/login/managers', async function(req, res, next) {
    const { mng_email, mng_password } = req.body;
    if (mng_email && mng_password) {
      let manager = await getManager({ mng_email: mng_email });
      if (!manager) {
        res.status(401).json({ message: 'manager no existe' });
      }
      if (manager.mng_password === mng_password) {
        let payload = { id: manager.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok manager', token: token });
      } else {
        res.json({ message: 'Contraseña incorrecta' });
      }
    }
  });
  module.exports = router;