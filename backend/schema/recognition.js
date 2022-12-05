const mongoose = require("mongoose");

const recognitionSchema = new mongoose.Schema({
    name:String,
    recognition:Array,
    state:String,
});

module.exports = mongoose.model("recognition", recognitionSchema);