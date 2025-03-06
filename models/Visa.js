const { application } = require("express");
const mongoose = require("mongoose");
const visaSchema = new mongoose.Schema({
  countryImage: { type: String, required: true },
  countryName: { type: String, required: true },
  visaType: { type: String, required: true },
  processingTime: { type: String, required: true },
  requiredDocuments: { type: String, required: true },
  description: { type: String, required: true },
  ageRestriction: { type: String, required: true },
  fee: { type: Number, required: true },
  validity: { type: String, required: true },
  applicationMethod: { type: String, required: true },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
