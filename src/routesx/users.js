const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
  
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
// create user model
//modelo
// const UserRole = require("../models/userRoles.js");
const Role = require("../models/roles.js");

const User = require("../models/users.js");


User.belongsTo(Role, {foreignKey: 'id_rol'});
  // UserRole.belongsTo(Role, {foreignKey: 'rol_id'});

  // create some helper functions to work on the database
  const createUser = async ({ 
    id_rol,
    id_responsable,
    id_facebook,
    usr_full_names,
    usr_surname,
    usr_second_surname,
    usr_name_fb,
    usr_picture,
    usr_gender,
    usr_mail,
    usr_phone,
    usr_birthday,
    usr_password,
    usr_state,
    usr_mail_validate
  }) => {
    return await User.create({
      id_rol,
      id_responsable,
      id_facebook,
      usr_full_names,
      usr_surname,
      usr_second_surname,
      usr_name_fb,
      usr_picture,
      usr_gender,
      usr_mail,
      usr_phone,
      usr_birthday,
      usr_password,
      usr_state,
      usr_mail_validate
    });
  };
  
  const getAllUsers = async (obj) => {
    return await User.findAll({
      where: obj,
      include: [
        {
            model: Role,
            required: true
        },
      ]
    });
  };
  //get all roles
  
  const getAllUserRole = async () => {
    return await UserRole.findAll({
      include: [
        {
            model: User,
            required: true
        },
        {
          model: Role,
          required: true
        }
      ]
    });
  };
  const getUser = async obj => {
    return await User.findOne({
      where: obj,
      include: [
        {
            model: Role,
            required: true
        },
      ]
    });
  };
  
  // set some basic routes
  router.get('/', function(req, res) {
    console.log('holaaa')
    res.json({ message: 'corriendo hola!' });
  });
  router.get('/user/:Id', function(req, res) {
    getUser({ id: req.params.Id,usr_state:'1'})
    .then(user => res.json(user));
  });
  // get all users
  router.get('/users', async function(req, res) {
    let users = await getAllUsers()
    let dataUsers = []
    for (let i = 0; i < users.length; i++) {
      dataUsers[i]={
        nombres:users[i].usr_full_names,
        apellidoCompleto:users[i].usr_surname+' '+users[i].usr_second_surname,
        correo:users[i].usr_mail,
        estado:users[i].usr_state,
        rol:users[i].pass_role.rls_name
      }
    }
    res.json(dataUsers)
  });
  //get all roles
  router.get('/user/roles', function(req, res) {
    getAllUserRole()
    .then(result => res.json(result));
  });
  










    // var start = Date.now();
    // bcrypt.genSalt(10, function(err, salt) {
    //   console.log('salt: ' + salt);
    //   console.log('salt cb end: ' + (Date.now() - start) + 'ms');
    //   bcrypt.hash('test', salt, function(err, crypted) {
    //     console.log('crypted: ' + crypted);
    //     console.log('crypted cb end: ' + (Date.now() - start) + 'ms');
    //     console.log('rounds used from hash:', bcrypt.getRounds(crypted));
    //     bcrypt.compare('test', crypted, function(err, res) {
    //       console.log('compared true: ' + res);
    //       console.log('compared true cb end: ' + (Date.now() - start) + 'ms');
    //     });
    //     bcrypt.compare('bacon', crypted, function(err, res) {
    //       console.log('compared false: ' + res);
    //       console.log('compared false cb end: ' + (Date.now() - start) + 'ms');
    //     });
    //   });
    // })
    // console.log('end: ' + (Date.now() - start) + 'ms');
    





  router.post('/register/user', function(req, res, next) {
    const { id_rol, id_responsable, id_facebook, usr_full_names, usr_surname,
      usr_second_surname, usr_name_fb, usr_picture, usr_gender, usr_mail, usr_phone, usr_birthday, usr_password, usr_state, usr_mail_validate
    } = req.body;
    let contra=usr_password
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(contra, salt, function(err, crypted) {
        console.log(id_rol)
        let usr_password=crypted
            createUser({
              id_rol,
              id_responsable,
              id_facebook,
              usr_full_names,
              usr_surname,
              usr_second_surname,
              usr_name_fb,
              usr_picture,
              usr_gender,
              usr_mail,
              usr_phone,
              usr_birthday,
              usr_password,
              usr_state,
              usr_mail_validate
            }).then(user =>
              res.json({ user, msg: 'cuenta registrada satisfactoriamente' })
            );
      });
    })
  });
  router.post('/login/users', async function(req, res, next) {
    const { usr_mail, usr_password } = req.body;
    if (usr_mail && usr_password) {
      let user = await getUser({ usr_mail: usr_mail,usr_state:'1' });
      if (!user) {
        res.status(401).json({ message: 'Usuario no existe' });
      }
      if (user.usr_password === usr_password) {
        // from now on we'll identify the user by the id and the id is the 
        // only personalized value that goes into our token
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok user', payload: payload ,token:token});
      } else {
        res.json({ message: 'Contraseña incorrecta' });
      }
    }
  });
      //login route code
      router.post('/login/user', async function(req, res, next) {
        const { usr_mail } = req.body;
        if (usr_mail) {
          let user = await getUser({ usr_mail: usr_mail,usr_state:'1' });
          if (!user) {
            res.json({ message: 'Usuario no existe' });
          }else{
            res.json({ message: 'Usuario existe' });
          }
        }
      });
  module.exports = router,passport;
