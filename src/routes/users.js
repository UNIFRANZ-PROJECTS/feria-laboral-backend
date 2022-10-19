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
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let users = getUser({ id: jwt_payload.id });
  
    if (users) {
      next(null, users);
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
const roles = require("../models/roles.js");

const users = require("../models/users.js");


users.belongsTo(roles, {foreignKey: 'id_rol'});
  // UserRole.belongsTo(Role, {foreignKey: 'rol_id'});

  // create some helper functions to work on the database
  const createUser = async ({id_rol,id_responsable,usr_name,usr_surname,usr_second_surname,usr_contact,usr_email,usr_password,usr_state}) => {
    return await users.create({id_rol,id_responsable,usr_name,usr_surname,usr_second_surname,usr_contact,usr_email,usr_password,usr_state});
  };
  
  const getAllUsers = async (obj) => {
    return await users.findAll({
      where: obj,
      include: [
        {
            model: roles,
            required: true
        },
      ]
    });
  };
  //get all roles
  const getUser = async obj => {
    return await users.findOne({
      where: obj,
      include: [
        {
            model: roles,
            required: true
        },
      ]
    });
  };
  
  // api basico
  router.get('/api/user/:Id', function(req, res) {
    getUser({ id: req.params.Id,usr_state:'1'})
    .then(user => res.json(user));
  });
  // todos los usuarios
  router.get('/api/users', async function(req, res) {
    let users = await getAllUsers()
    let dataUsers = []
    for (let i = 0; i < users.length; i++) {
      dataUsers[i]={
        nombres:users[i].usr_name,
        apellidoCompleto:users[i].usr_surname+' '+users[i].usr_second_surname,
        correo:users[i].usr_email,
        estado:users[i].usr_state,
        rol:users[i].uwork_role.rls_name
      }
    }
    res.json(dataUsers)
  });
  // login usuario
  router.post('/api/login/user', async function(req, res, next) {
    const { usr_email, usr_password } = req.body;
    if (usr_email && usr_password) {
      let user = await getUser({ usr_email: usr_email,usr_state:'1' });
      if (!user) {
        res.status(401).json({ message: 'Usuario no existe' });
      }
      if (user.usr_password === usr_password) {
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok user', payload: payload ,token:token});
      } else {
        res.json({ message: 'Contraseña incorrecta' });
      }
    }
  });
  //api registro de usuario
  router.post('/api/register/user', function(req, res, next) {
    const { id_rol,id_responsable,usr_name,usr_surname,usr_second_surname,usr_contact,usr_email,usr_password,usr_state} = req.body;
    let contra=usr_password
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(contra, salt, function(err, crypted) {
        console.log(id_rol)
        let usr_password=crypted
            createUser({id_rol,id_responsable,usr_name,usr_surname,usr_second_surname,usr_contact,usr_email,usr_password,usr_state})
            .then(user =>
              res.json({ user, msg: 'cuenta registrada satisfactoriamente' })
            );
      });
    })
  });

  module.exports = router,passport;
