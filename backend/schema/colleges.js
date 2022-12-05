const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    name:String,
    State:String,
    approval:String,
});

module.exports = mongoose.model("college", collegeSchema);