const mongoose = require("mongoose");

const personalSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  hometown: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  fullName:{
    type:String
  },
  languages: [String ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone:{
    type:Number,
    min:10,
  }
});

const PersonalInfo = mongoose.model("Personal", personalSchema);
module.exports = PersonalInfo;
