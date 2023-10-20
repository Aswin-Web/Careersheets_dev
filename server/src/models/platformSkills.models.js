const mongoose = require("mongoose");

const PlatFormSkillSchema = new mongoose.Schema({
  skill: { type: String, required: true },
});

const PlatformSkill = mongoose.model("PlatformSkill", PlatFormSkillSchema);
module.exports = PlatformSkill;
