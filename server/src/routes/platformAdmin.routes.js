const express = require("express");
const {
  GetAllCollegeAdmin,
  UpdateAdminVerification,
  AuthenticatePlatformAdmin,
  // Jobs update Controllers
  JobCreationRoute,
  InputValidationJob,
  GetAllJobs,
  EditJobs,
  DisableJob,
  GetUserInfoAdmin,
  AddViewedToUser,
  AddWishlistedToUser,
  ViewLastLoginUsers,
  showUsersWithTheRequiredSkillSets,
  sendEmailToAllShownUsers,
  GetAParticularJob
} = require("../controllers/platformAdmin.controller");
const { authenticateAdmin } = require("../utils/authorisation.header.check");

const router = express.Router();

// router.route("/login").post(AuthenticatePlatformAdmin);

// Platform authentication
router.use(authenticateAdmin);

// NOTE: protected - Platform Job Creation
router
  .route("/jobs")
  .get(GetAllJobs) //  To Get all Jobs
  .post(InputValidationJob, JobCreationRoute); // To Create a Job Oppourtunity
router
  .route("/jobs/:jobId")
  .put(InputValidationJob, EditJobs)
  .get(GetAParticularJob) // To Edit a Job Oppourtunity

router.route("/jobs/disable/:jobId").put(DisableJob); // To Disable the Job
router.post("/getUsers", showUsersWithTheRequiredSkillSets); // To get all the users which matches the skillset
router.post("/transmitmail", sendEmailToAllShownUsers); //This will send email to all the listed users in frontend
// To get Resume Details
router.get("/user/:id", GetUserInfoAdmin);
// To Update as the user has viewed
router.post("/user/view", AddViewedToUser);
// To update the user as wishlisted
router.post("/user/wishlist", AddWishlistedToUser);
// Get all CollgeAdmin and Update their Verification
router.route("/").get(GetAllCollegeAdmin).put(UpdateAdminVerification);

router.get("/lastseen", ViewLastLoginUsers);

module.exports = router;
