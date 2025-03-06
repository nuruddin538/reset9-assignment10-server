const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  visaId: { type: mongoose.Schema.Types.ObjectId, ref: "Visa", required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  appliedDate: { type: Date, default: Date.now },
  fee: { type: Number, required: true },
  appliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
