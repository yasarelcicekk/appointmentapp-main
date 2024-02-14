const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

  
db.user = require("./usersModel");
db.appointment = require("./appointmentsModel")
db.doctor=require("./doctorsModel")
db.role = require("./roleModel");

db.ROLES = ["user", "admin"];

module.exports = db;