const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  collegeName: String,
  principalName: String,
  mobile: String,
  //dob: Date,
  salt: String,
  //gender: String,
  password: String,
  verification:String,
  authLetter:String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
  },
});

module.exports = mongoose.model("user", UserSchema);
