const mongoose = require("mongoose");

const Appointment = mongoose.model(
  "Appointment",
  new mongoose.Schema({
   
    userID: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    ,
    DoctorID: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "doctors"
        }
      ,

      date:Date
  })
);

module.exports = Appointment;