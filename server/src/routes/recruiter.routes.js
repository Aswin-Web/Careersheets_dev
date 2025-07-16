const express = require("express");
const {
  CreateProfile,
  ViewRecruiterJobs,
  GetAParticularJobForRecruiter,
  GetUserInfoRecruiter,
  ViewProfile,
  GetApplicationsForJob,
  UpdateApplicationStatus
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

// udpate job seekers application status
router.get("/job/:jobid/applications", GetApplicationsForJob);
router.put("/application/:applicationId/status", UpdateApplicationStatus);

module.exports = router;
