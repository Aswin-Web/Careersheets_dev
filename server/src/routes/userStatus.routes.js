const express = require("express");

const {userStatusPost, getUserWorkingQuestions, updateApproval, updateWorkingQuestion, getTips, tipViews} = require("../controllers/userStatus.controller.js");
const { authenticateUser } = require("../utils/authorisation.header.check");

const router = express.Router();

router.use(authenticateUser);

router.route("/postStatus").post(userStatusPost);
router.route("/getStatus").get(getUserWorkingQuestions);
router.route("/updateApproval/:id").put(updateApproval);
router.route("/updateWorkingQuestion/:id").put(updateWorkingQuestion);
router.route("/getTips").get(getTips);
router.route("/incrementViews").put(tipViews);

module.exports = router;