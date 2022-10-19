const express = require('express');
const router = express.Router();

const customers = require("../models/customers.js");
const links = require("../models/links.js");
links.belongsTo(customers, {foreignKey: 'id_customer'});

const getLinksCustomer = async (obj) => {
    return await links.findAll({
        where: obj,
        include: [
            {
                model: customers,
                required: true
            },
          ]  
      });
};
const getAllLinks = async obj => {
    return await links.findAll({
      where: obj,
      include: [
          {
              model: customers,
              required: true
          },
        ]  
    });
};

const createLink = async ({id_customer,lnk_url,lnk_description,lnk_state}) => {
return await links.create({id_customer,lnk_url,lnk_description,lnk_state});
};

router.put('/api/update/link/:Id', async function(req, res, next){
    await links.update({
        id_customer:req.body.id_customer,
        lnk_url:req.body.lnk_url,
        lnk_description:req.body.lnk_description,
        lnk_state:req.body.lnk_state
    },
    {where: {id: req.params.Id}}
    ).then(result => {
        res.json({result,msg: 'enlace cambiado'})
    });
})

router.get('/api/link/customer/:Id',async function(req, res) {
    data= await getLinksCustomer({ lnk_state:1,id_customer: req.params.Id})
    res.json(data)
});
router.get('/api/link', function(req, res) {
    getAllLinks({lnk_state:1}).then(result => res.json(result));
});


router.post('/api/register/link/customer', function(req, res, next) {
    const {id_customer,lnk_url,lnk_description,lnk_state} = req.body;
    createLink({id_customer,lnk_url,lnk_description,lnk_state})
    .then(response =>{
      res.json({response, msg: 'enlace registrado' })
    }
    );
  });
module.exports = router;