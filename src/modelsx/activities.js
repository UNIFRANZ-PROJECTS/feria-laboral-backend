const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Activitie = sequelize.define('pass_activities', {
    event_id: {
        type: Sequelize.STRING,
      },
    site_id: {
        type: Sequelize.STRING,
      },
    act_name: {
        type: Sequelize.STRING,
      },
    act_description: {
        type: Sequelize.STRING,
      },
    act_date: {
        type: Sequelize.STRING,
      },
    act_start_time: {
        type: Sequelize.STRING,
      },
    act_end_time: {
        type: Sequelize.STRING,
      },
    act_milie: {
        type: Sequelize.STRING,
      },
    act_cant_customer: {
        type: Sequelize.STRING,
      },
  });
  module.exports=Activitie;
  