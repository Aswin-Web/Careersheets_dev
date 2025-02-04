const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  certificationName: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: mongoose.Types.ObjectId,
    ref: "CertificationProvider",
    required: true,
  },
  certificateIssuedDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  certificateId: {
    type: String,
    required: true,
  },
  approval: {
    type: String,
    required: true,
  },
});

const Certification = mongoose.model("certification", certificationSchema);
module.exports = Certification;