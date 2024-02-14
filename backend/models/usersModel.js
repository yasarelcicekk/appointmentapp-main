const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    
    email: String,
    password: String,
    name: String,
    lastName: String,
    age: Number,
    phoneNumber:String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;