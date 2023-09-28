const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profileRole: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      default: "none",
    },
    displayPicture: {
      type: String,
    },
    verification: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
    },
    collegeName: { type: String },
    collegeVerification: { type: Boolean, default: false },
    contact: { type: String },

    education: [{ type: mongoose.Types.ObjectId, ref: "Education" }],
    project: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
    skill: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Skill",
      },
    ],
    summary: {
      type: String,
    },
    personal: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Personal",
      },
    ],
    appliedPlatformJobs:[{
      type: mongoose.Types.ObjectId, ref: "Job",unique:true
    }],
   
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", Schema);

module.exports = User;
