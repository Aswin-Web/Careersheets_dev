const express = require("express");
const { resumeGeneration } = require("../controllers/resume.controller");

const router = express.Router();

router.route("/").post(resumeGeneration);

module.exports = router;
