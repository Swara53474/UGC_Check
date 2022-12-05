const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UniversitySchema = new mongoose.Schema({
  name: String,
  admin: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  documents: String,
});

module.exports = mongoose.model("university", UniversitySchema);
