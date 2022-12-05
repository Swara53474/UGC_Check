const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    universityName: String,
    path:String,
    uploadedAt: Date,
});

const document = mongoose.model("document", documentSchema);

module.exports = document;