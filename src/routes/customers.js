const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
const upload = require('./../libs/storage')
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
  const customers = require("../models/customers.js");
  const carrers = require("../models/carrers.js");
  customers.belongsTo(carrers, {foreignKey: 'id_carrer'});
  const createCustomer = async ({id_carrer,sede,cus_code,cus_name,cus_surname,cus_second_surname,cus_description,cus_img,cus_password,cus_email,cus_number_phone,cus_date_birth,cus_state}) => {
    return await customers.create({id_carrer,sede,cus_code,cus_name,cus_surname,cus_second_surname,cus_description,cus_img,cus_password,cus_email,cus_number_phone,cus_date_birth,cus_state});
  };
  const getAllCustomers = async () => {
    return await customers.findAll();
  };
  const getCustomer = async obj => {
    return await customers.findOne({
      where: obj,
      include: [
        {
            model: carrers,
            required: true
        },
      ]  
    });
  };
router.put('/api/update/customer/:Id', function(req, res, next){
  customers.update({
      sede:req.body.sede,
      cus_code:req.body.cus_code,
      cus_name:req.body.cus_name,
      cus_surname:req.body.cus_surname,
      cus_second_surname:req.body.cus_second_surname,
      cus_description:req.body.cus_description,
      cus_img:req.body.cus_img,
      cus_password:req.body.cus_password,
      cus_email:req.body.cus_email,
      cus_number_phone:req.body.cus_number_phone,
      cus_date_birth:req.body.cus_date_birth,
      cus_state:req.body.cus_stat
    },
    {where: {id: req.params.Id}}
    ).then(result => {
        getCustomer({ cus_state:1,id: req.params.Id})
        .then(result => res.json(result));
    });
})
  router.post('/api/guardar/imagen', upload.single('imagen'),function (req, res, next) {
    res.send({message:req.file.location})
  });
  router.post('/api/register/customer', function(req, res, next) {
    const {id_carrer,sede,cus_code,cus_name,cus_surname,cus_second_surname,cus_description,cus_img,cus_password,cus_email,cus_number_phone,cus_date_birth,cus_state} = req.body;
    createCustomer({id_carrer,sede,cus_code,cus_name,cus_surname,cus_second_surname,cus_description,cus_img,cus_password,cus_email,cus_number_phone,cus_date_birth,cus_state})
    .then(customer =>{
      let payload = { id:customer.id};
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ token: token,customer, msg: 'cuenta registrada satisfactoriamente mente' })
    }
    );
  });
  router.get('/api/customers', function(req, res) {
    getAllCustomers().then(customer => res.json(customer));
  });
  router.get('/api/customer/:Id', function(req, res) {
    getCustomer({ id: req.params.Id})
    .then(user => res.json(user));
  });
  router.post('/api/login/customers', async function(req, res, next) {
    const { cus_code, cus_password } = req.body;
    if (cus_code && cus_password) {
      let customer = await getCustomer({ cus_code: cus_code });
      if (!customer) {
        res.json({ message: 'Usuario no existe' });
      }
      if (customer.cus_password === cus_password) {
        let payload = { id: customer.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok customer', token: token });
      } else {
        res.json({ message: 'Contraseña incorrecta' });
      }
    }
  });
  module.exports = router;