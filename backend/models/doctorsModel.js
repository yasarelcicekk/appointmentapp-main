const mongoose = require("mongoose");

const Doctor = mongoose.model(
  "Doctor",
  new mongoose.Schema({
    doctorName: String,
    doctorLastname: String,
    doctorSpecialty: String
  })
);

module.exports = Doctor;