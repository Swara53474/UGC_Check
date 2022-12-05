const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("country", CountrySchema);
