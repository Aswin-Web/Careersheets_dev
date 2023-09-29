const express = require("express");
const { resumeGeneration } = require("../controllers/resume.controller");
const { authenticateUser } = require("../utils/authorisation.header.check");

const router = express.Router();

router.use(authenticateUser);

router.route("/").post(resumeGeneration);

module.exports = router;
