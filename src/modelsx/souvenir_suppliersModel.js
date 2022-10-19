const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const souvenir_supliersModel = sequelize.define('pass_entry_souvenirsuppliers', {

    supplier_id: {
        type: Sequelize.INTEGER,
    },
    entry_souvenir_id: {
        type: Sequelize.INTEGER,
      },

  });
  module.exports=souvenir_supliersModel;