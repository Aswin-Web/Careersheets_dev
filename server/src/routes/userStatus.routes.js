const express = require("express");

const {userStatusPost, getUserWorkingQuestions,getUserWorkingQuestionsAdmin, updateApproval, updateWorkingQuestion, getTips, tipViews, ratings} = require("../controllers/userStatus.controller.js");
const { authenticateUser } = require("../utils/authorisation.header.check");

const router = express.Router();

router.use(authenticateUser);

router.route("/postStatus").post(userStatusPost);
router.route("/getStatus").get(getUserWorkingQuestions);
router.route("/updateApproval/:id").put(updateApproval);
router.route("/updateWorkingQuestion/:id").put(updateWorkingQuestion);
router.route("/getTips").get(getTips);
router.route("/incrementViews").put(tipViews);
router.route("/rating").post(ratings);
router.route("/getStatusAdmin").get(getUserWorkingQuestionsAdmin);


module.exports = router;