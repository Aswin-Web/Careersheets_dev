const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Reviewed",
        "HR Screening",
        "Technical Round",
        "Offer Extended",
        "Hired",
        "Not Qualified",
      ],
      default: "Applied",
    },
    recruiterNotes: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true, 
  }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;