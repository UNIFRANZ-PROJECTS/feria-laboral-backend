const express = require('express');
const router = express.Router();
//modelo Career


const specialityCarrers = require("../models/specialityCarrers.js");
const carrers = require("../models/carrers.js");
const postulations = require("../models/postulations.js");
const specialties = require("../models/specialties.js");
const customers = require("../models/customers.js");
const upload = require('./../libs/storage')
postulations.belongsTo(specialties, {foreignKey: 'id_speciality'});
postulations.belongsTo(customers, {foreignKey: 'id_customer'});
specialityCarrers.belongsTo(specialties, {foreignKey: 'id_speciality'});
specialityCarrers.belongsTo(carrers, {foreignKey: 'id_carrer'});
//funcion 
const getAllCarrers= async obj => {
      return await carrers.findAll({
      where: obj,
    });
  };
const getAllSpecialityCarrers = async obj => {
    return await specialityCarrers.findAll({
      where: obj,
      include: [
          {
              model: specialties,
              required: true
          },
          {
              model: carrers,
              required: true
          },
        ]  
    });
  };
const getAllSpecialityCarrer = async obj1 => {
return await specialityCarrers.findAll({
    include: [
        {
            model: specialties,
            required: true
        },
        {
            model: carrers,
            required: true,
            where:obj1
        },
    ]  
});
};
const getAllPostulations = async obj => {
  return await postulations.findAll({
    where: obj,
    include: [
        {
            model: specialties,
            required: true
        },
        {
            model: customers,
            required: true
        },
      ]  
  });
};
const getPostulationCustomer = async (obj) => {
    return await postulations.findAll({
        where: obj,
        include: [
            {
                model: specialties,
                required: true
            },
          ]  
      });
  };

const createPostulation = async ({id_speciality,id_customer,pos_name,pos_description,pos_url,pos_state}) => {
return await postulations.create({id_speciality,id_customer,pos_name,pos_description,pos_url,pos_state});
};
router.put('/apiupdate/postulation/customer/:Id', function(req, res, next){
    postulations.update({
        id_speciality: req.body.id_speciality,
        id_customer: req.body.id_customer,
        pos_name: req.body.pos_name,
        pos_description: req.body.pos_description,
        pos_url: req.body.pos_url,
        pos_state: req.body.pos_state
    },
    {where: {id: req.params.Id}}
    ).then(result => {
        res.json({result,msg: 'postulación cambiado'})
    });
})
router.get('/api/postulation/customer/:Id',async function(req, res) {
    data= await getPostulationCustomer({ pos_state:1,id_customer: req.params.Id})
    res.json(data)
});

router.post('/api/register/postulation/customer', function(req, res, next) {
    const {id_speciality,id_customer,pos_name,pos_description,pos_url,pos_state} = req.body;
    createPostulation({id_speciality,id_customer,pos_name,pos_description,pos_url,pos_state})
    .then(response =>{
      res.json({response, msg: 'postulacion realizada' })
    }
    );
  });
router.get('/api/postulations', function(req, res) {
    getAllPostulations().then(result => res.json(result));
});

router.post('/api/guardar/video', upload.single('video'),function (req, res, next) {
    res.send({message:req.file.location})
  });


router.get('/api/carrers', function(req, res) {
    getAllCarrers().then(result => res.json(result));
});

router.get('/api/specialities', function(req, res) {
    getAllSpecialityCarrers().then(result => res.json(result));
});
router.get('/api/specialities/:Id', function(req, res) {
    getAllSpecialityCarrers({id_carrer:req.params.Id})
    .then(result => res.json(result));
});
router.get('/api/speciality/carrer/:Id', function(req, res) {
    getAllSpecialityCarrer({id:req.params.Id}).then(result => res.json(result));
});
module.exports = router;