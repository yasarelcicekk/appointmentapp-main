const mongoose = require("mongoose");

const Appointment = mongoose.model(
  "Appointment",
  new mongoose.Schema({
   
    userID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    ],
    DoctorID: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doctors"
        }
      ],

      date:Date
  })
);

module.exports = Appointment;