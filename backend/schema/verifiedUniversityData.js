const mongoose = require("mongoose");

const verifiedUniversity = new mongoose.Schema({
  universityName:String,
  State:String,
});

module.exports = mongoose.model("verifiedUniversity", verifiedUniversity);
