const express = require("express");
const {
  CreateProfile,
  ViewRecruiterJobs,
  GetAParticularJobForRecruiter,
  GetUserInfoRecruiter,
  ViewProfile
} = require("../controllers/recruiter.controller");
const {
  authenticateRecruiter,
  isRecruiterController,
} = require("../utils/authorisation.header.check");

const router = express.Router();

// authorisation Controller
router.use(authenticateRecruiter);

// ROUTE: api/recruiter/profile

// To Create an Profile
router.route("/profile").post(CreateProfile).get(ViewProfile);

// IS THE RECRUITER IS VERIFIED
router.use(isRecruiterController);

// To Add the jobs
router.get("/jobs", ViewRecruiterJobs);

// To View the jobs
router.get("/jobs/:jobid", GetAParticularJobForRecruiter);

// To View the applicant
router.get("/user/:id", GetUserInfoRecruiter);

module.exports = router;
