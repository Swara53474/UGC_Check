const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const HEI = new mongoose.Schema({
  name: String,
  address: String,
  state:String,
  heiAdmin:String,
  courses:Array,
  intake:Array,
  documents:String,
});

module.exports = mongoose.model("hei", HEI);
