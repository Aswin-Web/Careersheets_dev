const Personal = require("../models/personalInfo.model");
const User = require("../models/user.models");

const addPersonalInfo = async (req, res) => {
  const { fullName, gender, birth, hometown, languages } = req.body;
  console.log(req.user);
  const user = req.user._id.toString();
  console.log(user);
  console.log(fullName, gender, birth, hometown, languages);

  

  try {
    const existingUser = await User.findById(user).populate("personal");
    console.log(existingUser.personal.length, "hhhh");
    if (existingUser.personal.length === 0) {
      const personalData = await Personal.create({
        dateOfBirth: birth,
        gender,
        user,
        fullName,
        hometown,
        languages
      });
      existingUser.personal.push(personalData);
      await existingUser.save();
      console.log(personalData,"if block");
      return res.status(200).json(personalData);
    } else {
      console.log(user);
      const existingPersonal = await Personal.findOneAndUpdate(
        { user: user },
        {
          $set: {
            dateOfBirth: birth,
            gender,
            user,
            fullName,
            hometown,
            languages
          },
        },{new:true}
      );
      console.log(existingPersonal, "else block");
      return res.status(200).json(existingPersonal);
    }
  } catch (error) {
    console.log(error);
  }
};

const addSummary = async (req, res) => {
  const summaryVal = req.body.summary;
  const user = req.user._id.toString();
  let summary;
  try {
    summary = await User.findByIdAndUpdate(
      { _id: user },
      { $set: { summary: summaryVal } },
      { new: true }
    );
    return res.status(200).json(summary);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addPersonalInfo, addSummary };
