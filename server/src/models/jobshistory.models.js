const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
    },
    job_id: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Job",
    },
  },

  {
    timestamps: true,
  }
);

const JobsHistory = mongoose.model("JobsHistory", viewSchema);
module.exports = JobsHistory;
