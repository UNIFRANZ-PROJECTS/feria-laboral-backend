const express = require('express');
const aws = require('aws-sdk'),
      bodyParser = require('body-parser'),
      multer = require('multer'),
      multerS3 = require('multer-s3');
const app = express();
aws.config.update({
    secretAccessKey: 'CAkDpCk0tFyPMIL13sq6EZz2kbSFPKY39tGRk+b1',
    accessKeyId: 'AKIAIZMEWI4XXUGPWI3Q',
    region: 'us-east-2'
});
const s3 = new aws.S3();
app.use(bodyParser.json());
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'unifranzlaboral',
        acl: 'public-read',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.fieldname+ '-' + Date.now()+file.originalname); //use Date.now() for unique file keys
        }
    })
});
  module.exports = upload