const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const phase = new mongoose.Schema({
  name: String,
  description: String,
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  startDate: Date,
  endDate: Date,
  startedAt: Date,
  completedAt: Date,
  courses: Array,
  status: String,
  amountDue: String,
  bills: Array
});

module.exports = mongoose.model("phases", phase);
