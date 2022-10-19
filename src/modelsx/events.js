const Sequelize = require('sequelize');
const sequelize = require("../conection.js");
const Event = sequelize.define('pass_events', {
    user_id: {
        type: Sequelize.STRING,
    },
    survey_id: {
        type: Sequelize.STRING,
    },
    event_type_id: {
        type: Sequelize.STRING,
    },
    evn_name: {
        type: Sequelize.STRING,
    },
    evn_description: {
        type: Sequelize.STRING,
    },
    evn_miles: {
        type: Sequelize.STRING,
    },
    evn_start_day: {
        type: Sequelize.STRING,
    },
    evn_end_day: {
        type: Sequelize.STRING,
    },
    evn_cost: {
        type: Sequelize.STRING,
    },
    evn_img: {
        type: Sequelize.STRING,
    },
    evn_color: {
        type: Sequelize.STRING,
    },
  });
  module.exports=Event;
  