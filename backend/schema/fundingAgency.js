const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const fundingAgency = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "country",
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "state",
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: "district",
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("fundingAgency", fundingAgency);
