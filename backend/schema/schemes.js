const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Schemes = new mongoose.Schema({
  name: String,
  description: String,
  docs: Array,
  fundingAgency: {
    type: Schema.Types.ObjectId,
    ref: "fundingAgency",
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

module.exports = mongoose.model("scheme", Schemes);
