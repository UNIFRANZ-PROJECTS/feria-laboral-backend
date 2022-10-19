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
// initialize passport with express
router.use(passport.initialize());
// parse application/json
router.use(bodyParser.json());
//parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));
  // create customer model
  const Customer = require("../models/customers.js");
  // create some helper functions to work on the database
  const createCustomer = async ({ cus_code,campus_id,cus_full_names,cus_surnames,cus_identity_card,cus_date_of_birth,cus_gender,cus_mail,cus_phone,cus_password,cus_img,cus_miles}) => {
    return await Customer.create({ cus_code,campus_id,cus_full_names,cus_surnames,cus_identity_card,cus_date_of_birth,cus_gender,cus_mail,cus_phone,cus_password,cus_img,cus_miles});
  };
  const getAllCustomers = async () => {
    return await Customer.findAll();
  };
  const getCustomer = async obj => {
    return await Customer.findOne({
      where: obj,
    });
  };
  // get all users
  router.get('/customers', function(req, res) {
    getAllCustomers().then(customer => res.json(customer));
  });
  // register route
  router.post('/register/customer', function(req, res, next) {
    console.log('data')
    console.log(req.body)
    console.log('fin')
    const { cus_code,campus_id,cus_full_names,cus_surnames,cus_identity_card,cus_date_of_birth,cus_gender,cus_mail,cus_phone,cus_password,cus_img,cus_miles} = req.body;
    createCustomer({ cus_code,campus_id,cus_full_names,cus_surnames,cus_identity_card,cus_date_of_birth,cus_gender,cus_mail,cus_phone,cus_password,cus_img,cus_miles})
    .then(customer =>{
      let payload = { id:customer.id};
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ token: token,customer, msg: 'cuenta registrada satisfactoriamente mente' })

    }
    );
  });
  router.get('/customer/:Id', function(req, res) {
    getCustomer({ id: req.params.Id})
    .then(user => res.json(user));
  });


  //login route code and password
  router.post('/login/customers', async function(req, res, next) {
    const { cus_code, cus_password } = req.body;
    if (cus_code && cus_password) {
      let customer = await getCustomer({ cus_code: cus_code });
      if (!customer) {
        res.status(401).json({ message: 'Usuario no existe' });
      }
      if (customer.cus_password === cus_password) {
        // from now on we'll identify the user by the id and the id is the 
        // only personalized value that goes into our token
        let payload = { id: customer.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok customer', token: token });
      } else {
        res.json({ message: 'Contraseña incorrecta' });
      }
    }
  });
    //login route code
    router.post('/login/customer', async function(req, res, next) {
      const { cus_code } = req.body;
      if (cus_code) {
        let customer = await getCustomer({ cus_code: cus_code });
        if (!customer) {
          res.json({ message: 'Usuario no existe' });
        }else{
          res.json({ message: 'Usuario existe' });
        }
      }
    });
  // protected route
  router.get('/protected', passport.authenticate('jwt', { session: false }), 
  function(req, res) {
    res.json('Success! You can now see this without a token.');
  });
  module.exports = router;