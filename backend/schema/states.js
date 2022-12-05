const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const StateSchema = new mongoose.Schema({
  name: String,
  country: {
    type: Schema.Types.ObjectId,
    ref: "country",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("state", StateSchema);
