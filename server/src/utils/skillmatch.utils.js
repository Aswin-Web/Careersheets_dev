const User = require("../models/user.models");
const { generateHTML } = require("./alerts.email.utils");
const email = require("./nodemailer.email");

const SkillMatch = async (SkillsRequired) => {

  const skillarray = SkillsRequired.split(",");
  skillarray.push("a11a"), skillarray.push("b32a");
  // console.log(skillarray);
  try {
    const users = await User.find({ role: "user" })
      .populate({
        path: "skill",
        select: { skill: 1 },
      })
      .select({ email: 1, _id: -1, name: 1 })
      .then(function (user) {
        try {
          const mailList = [];
          const userlist = user.filter((x) => {
            // console.log(skillarray);
            if (x.skill.length !== 0) {
              const userSkills = x.skill.map((x) => x.skill).toString();
              const skillSelect = skillarray.filter((skill) => {
                if (skill !== "") {
                  let skillRegExp = new RegExp(`\\b${skill}\\b`, "gi");
                  const matches = userSkills.match(skillRegExp);
                  if (matches) {
                    console.log(x.name);
                    let name = x.name;
                    mailList.push({ name: x.name, email: x.email });

                    return x.name;
                  }
                }
              });

              return skillSelect;
            }
          });
          const uniqueArray = mailList.filter((item, index, self) => {
            return (
              index ===
              self.findIndex(
                (t) => t.name === item.name && t.email === item.email
              )
            );
          });
          // console.log(uniqueArray,"dsfjksdhfj");

          return uniqueArray;
        } catch (error) {
          console.log(error);
        }
      });

    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { SkillMatch };
