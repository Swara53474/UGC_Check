const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const project = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
  approvedAmount: String,
  teamMembers: [{
    type: Schema.Types.ObjectId,
    ref: "team_members",
  }],
  phases: [{
    type: Schema.Types.ObjectId,
    ref: "phases",
  }],
  category: {
    type: String,
    enum: ["hardware", "software", "hybrid"],
  },
  scheme: {
    type: Schema.Types.ObjectId,
    ref: "scheme",
  },
  fundingAgency: {
    type: Schema.Types.ObjectId,
    ref: "fundingAgency",
  },
  hei: [{
    type: Schema.Types.ObjectId,
    ref: "hei",
  }],
  faCoordinator : [{
    type: Schema.Types.ObjectId,
    ref: "user",
  }],
  heiCoordinator : [{
    type: Schema.Types.ObjectId,
    ref: "user",
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("project", project);

//Change Team members and phases
