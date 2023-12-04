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
  GetAParticularJob,
  GetAllRecruiters,
  VerifyRecruiter,
  FindARecruiter,
  AddRecruiterToJobPosting,
  RemoveRecruiterFromJobPosting,
  GetSearchUsers,
} = require("../controllers/platformAdmin.controller");
const { authenticateAdmin } = require("../utils/authorisation.header.check");

const router = express.Router();

// router.route("/login").post(AuthenticatePlatformAdmin);

// To get the users
router.post("/getusers", GetSearchUsers);

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
  .get(GetAParticularJob); // To Edit a Job Oppourtunity

router.route("/jobs/disable/:jobId").put(DisableJob); // To Disable the Job
router.post("/getUsers", showUsersWithTheRequiredSkillSets); // To get all the users which matches the skillset
router.post("/transmitmail", sendEmailToAllShownUsers); //This will send email to all the listed users in frontend
// To get Resume Details
router.get("/user/:id", GetUserInfoAdmin);
// To Update as the user has viewed
router.post("/user/view", AddViewedToUser);
// To update the user as wishlisted
router.post("/user/wishlist", AddWishlistedToUser);

//  To find the Keyword with the text
router.post("/finduser", FindARecruiter);

// Get all CollgeAdmin and Update their Verification
router.route("/").get(GetAllCollegeAdmin).put(UpdateAdminVerification);

// Get all Recruiters
router.route("/recruiter").get(GetAllRecruiters).put(UpdateAdminVerification);

// To verify a Recruiter
router.get("/recruiter/verify/:userid", VerifyRecruiter);

// To Add a Recruiter to a Job posting
router.route("/addrecruiter").post(AddRecruiterToJobPosting);

// To Remove a Recruiter from a Job posting
router.route("/removerecruiter").post(RemoveRecruiterFromJobPosting);

router.get("/lastseen", ViewLastLoginUsers);

module.exports = router;
