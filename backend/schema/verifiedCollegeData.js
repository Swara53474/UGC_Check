const mongoose = require("mongoose");

const verifiedCollege = new mongoose.Schema({
  collegeName:String,
  State:String,
});

module.exports = mongoose.model("verifiedCollege", verifiedCollege);
