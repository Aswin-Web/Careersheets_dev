const mongoose = require("mongoose");

const certificationProviderSchema = new mongoose.Schema({
  ProviderName: {
    type: String,
    required: true,
  },
});

const CertificationProvider = mongoose.model("certificationProvider", certificationProviderSchema);
module.exports = CertificationProvider;