const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    companyName: String,
    employeePosition: String,
    employeeName: String,
    contactNumber: String,
  },
  {
    timestamps: true,
  }
);
const Recruiter = mongoose.model("Recruiter", Schema);
module.exports = Recruiter;
