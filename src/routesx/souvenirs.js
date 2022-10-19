const express = require('express');
const router = express.Router();
// create Permission model
const categorySouvenirsModel = require("../models/categorySouvenirsModel.js");
const SouvenirsModel = require("../models/souvenirsModel.js");
  // create some helper functions to work on the database
  SouvenirsModel.belongsTo(categorySouvenirsModel, {foreignKey: 'category_id'});



  const getAllSouvenirs = async () => {
    return await SouvenirsModel.findAll({
       include: [
            {
                model: categorySouvenirsModel,
                required: true
            },
        ],
    });
  };
  const getSouvenirs = async obj => {
    return await SouvenirsModel.findOne({
      where: obj,
      include: [
        {
            model: categorySouvenirsModel,
            required: true
        },
    ],
    });
  };
  // FUNCION PARA OBTENER TODOS LOS SOUVENIRS CON UN TIPO DE ESTADO --GET
  const getAllSouvenirsOn = async (obj) => {
    return await SouvenirsModel.findAll({
        where: obj,
               include: [
            {
                model: categorySouvenirsModel,
                required: true
            },
        ],
    });
};
  router.get('/souvenirs', function(req, res) {
    getAllSouvenirsOn({sov_state : '1'})
    .then(result => res.json(result));
  });

  const createSouvenir = async ({category_id,sov_detail,sov_stock_minq,sov_quantity,sov_miles,sov_picture,sov_state}) => {
    return await SouvenirsModel.create({category_id,sov_detail,sov_stock_minq,sov_quantity,sov_miles,sov_picture,sov_state});
  };
  //crear un nuevo producto
  router.post('/souvenirs', function(req, res, next) {
    const {category_id,sov_detail,sov_stock_minq,sov_quantity,sov_miles,sov_picture,sov_state} = req.body;
    createSouvenir({category_id,sov_detail,sov_stock_minq,sov_quantity,sov_miles,sov_picture,sov_state}).then(getAllSouvenirs =>
      res.json({ getAllSouvenirs, msg: 'Producto registrado satisfactoriamente' })
    );
  });
// Modificar un producto
router.put('/souvenirs/:Id', function(req, res, next){
    SouvenirsModel.update({
            category_id: req.body.category_id,
            sov_detail: req.body.sov_detail,
            sov_stock_minq: req.body.sov_stock_minq,
            sov_quantity: req.body.sov_quantity,
            sov_miles: req.body.sov_miles,
            sov_picture: req.body.sov_picture,
            sov_state: req.body.sov_state,
    },
    {where: {id: req.params.Id}}
    ).then(result => {
        getSouvenirs({id: req.params.Id}).then(result => res.json(result));
    });
})

// Eliminacion logica de un registro
router.put('/souvenirs/delete/:Id', function(req, res, next){
    SouvenirsModel.update({
        sov_state: "0"
    },
    {where: {id: req.params.Id}}).then(result => {
        getSouvenirs({id: req.params.Id}).then(result => res.json(result));
    })
})

  module.exports = router;