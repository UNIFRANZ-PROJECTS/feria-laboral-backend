const express = require('express');
const router = express.Router();
//modelo Career
const Sites = require("../models/sites.js");
//modelo locations
const Locations = require("../models/locations.js");
//union de tablas
Sites.belongsTo(Locations, {foreignKey: 'location_id'});

//funcion obtener todos los sitios
  const getAllSites = async () => {
    return await Sites.findAll({
        include: [
            {
                model: Locations,
            },
        ],
    });
  };
//funcion registrar localidad
const createLocation = async ({lct_latitude,lct_length}) => {
    return await Locations.create({lct_latitude,lct_length});
  };
//funcion registrar sitio
const createSite = async ({location_id,sts_name,sts_description}) => {
    return await Sites.create({location_id,sts_name,sts_description});
  };
  //recuperar todos lo sitos
  router.get('/sites', function(req, res) {
    getAllSites().then(result => res.json(result));
  });
  //registrar sitio
  router.post('/register/sites', function(req, res, next) {
    console.log(req.body)
    const {lct_latitude,lct_length,sts_name,sts_description} = req.body;
    createLocation({lct_latitude,lct_length})
    .then(location =>{
      res.json({location:location.id,msg: 'localidad registrada' })
      const location_id=location.id
      crearSitio(location.id,sts_name,sts_description)
    }
    );
  });
  function crearSitio(location_id,sts_name,sts_description){
    createSite({location_id,sts_name,sts_description})
    .then((res) => {
        console.log('creado')
    })
  }
  module.exports = router;

