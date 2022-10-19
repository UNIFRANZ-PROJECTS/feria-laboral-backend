const express = require('express');
const router = express.Router();
const upload = require('../libs/storage')

router.post('/guardar/archivo', upload.single('archivo'),function (req, res, next) {
        res.send({message: 'Archivo Guardado',urlimage:'https://pasaporteunifranz.s3.amazonaws.com/'+req.file.originalname,data:req.file})
  });
module.exports = router;