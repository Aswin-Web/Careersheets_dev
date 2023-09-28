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
  AddViewedToUser,AddWishlistedToUser
} = require("../controllers/platformAdmin.controller");
const { authenticateAdmin } = require("../utils/authorisation.header.check");

const router = express.Router();

// router.route("/login").post(AuthenticatePlatformAdmin);


// Platform authentication
router.use(authenticateAdmin);

// NOTE: Unprotected - Platform Job Creation
router
  .route("/jobs")
  .get(GetAllJobs) //  To Get all Jobs
  .post(InputValidationJob, JobCreationRoute); // To Create a Job Oppourtunity
router.route("/jobs/:jobId").put(InputValidationJob, EditJobs);  // To Edit a Job Oppourtunity
router.route("/jobs/disable/:jobId").put(DisableJob)  // To Disable the Job
// To get Resume Details
router.get("/user/:id",GetUserInfoAdmin)
// To Update as the user has viewed
router.post("/user/view",AddViewedToUser)
// To update the user as wishlisted 
router.post("/user/wishlist",AddWishlistedToUser)
// Get all CollgeAdmin and Update their Verification
router.route("/").get(GetAllCollegeAdmin).put(UpdateAdminVerification);




module.exports = router;
