const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const kardexModel = sequelize.define('pass_kardexes', {

    souvenirs_id: {
        type: Sequelize.INTEGER,
    },
    entry_souvenir_id: {
        type: Sequelize.INTEGER,
      },
    egress_souvenir_id: {
        type: Sequelize.INTEGER,
    },
    kardex_balance: {
        type: Sequelize.INTEGER,
    },

  });
  module.exports=kardexModel;