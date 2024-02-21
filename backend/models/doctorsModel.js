const mongoose = require("mongoose");

const Doctor = mongoose.model(
  "Doctor",
  new mongoose.Schema({
    doctorName: String,
    doctorLastname: String,
    doctorSpecialty: String,
    doctorImage:String,
    doctorLanguages:String
  })
);

module.exports = Doctor;