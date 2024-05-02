const Education = require("../models/education.model");
const Skill = require("../models/skill.models");
const JobSeeker = require("../models/user.models");
const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  postEducation,
  deleteEducation,
  postSkill,
  deleteSkill,
  updateStatus,
  updateProfileRole,
  postProject,
  deleteProject,
  GetAllJobs,
  ApplyForPlatformJobs,
  AddUserToJobHistory,
  AppliedJobs,
  SearchAppliedJobs,
  GetAllPlatFormSkills,
  sendEmailToAdminOnSubmitJobApplication
} = require("../controllers/user.profile.conroller");

const {
  postApplication,
  getAllApplications,
  AddStatusToApplication,
  EditStatusOfApplication,
  RemoveStatusFromApplication,
} = require("../controllers/user.controller");


// -----PERSONAL INFO CONTROLLER IMPORT

const {addSummary,addPersonalInfo}=require("../controllers/personal.controller");
const { authenticateUser } = require("../utils/authorisation.header.check");

router.use(authenticateUser);


// Route Name
// api/user + ""
router
  .route("/application")
  .post(postApplication)
  .get(getAllApplications)
  .put(AddStatusToApplication);

router.get("/profile", getUserInfo);

router.route("/profile/education").post(postEducation);

router.delete("/profile/education/:id", deleteEducation);

// ------
router.route("/profile/skill/").post(postSkill);

// Request
router.delete("/profile/skill/:id", deleteSkill);

// -------------------
router.put("/profile/status/", updateStatus);

//--------
router.put("/profile/profilerole/", updateProfileRole);
//------------
router.post("/profile/projects/", postProject);

//------------

// -----------
router.put("/profile/summary", addSummary);
router.put("/profile/personal/",addPersonalInfo );


// -----
router.delete("/profile/projects/:id", deleteProject);

router.post("/application/removestatus", RemoveStatusFromApplication);
router.put("/application/editstatus", EditStatusOfApplication);

// Jobs Routes
// To Get all jobs which are not applied
router.get("/jobs", GetAllJobs);

// To apply for a jobs by job seeker
router.get("/jobs/:jobId", ApplyForPlatformJobs);

//Mail to Admin if Job is Applied
router.post("/jobs/mailOnAppliedJob", sendEmailToAdminOnSubmitJobApplication);

// To View the applied Jobs
router.get("/appliedjobs", AppliedJobs);

// To view a particular Job
router.get("/appliedjobs/:id", SearchAppliedJobs);

// To update The Job history to increase the user count
router.get("/history/:id", AddUserToJobHistory);

// To Get all the Skills
router.get("/platformskills",GetAllPlatFormSkills);



module.exports = router;
