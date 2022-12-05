const mongoose = require("mongoose");
const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: Array,
});

module.exports = mongoose.model("role", Role);
