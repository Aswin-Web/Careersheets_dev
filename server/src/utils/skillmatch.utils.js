const User = require("../models/user.models");
const { generateHTML } = require("./alerts.email.utils");
const email = require("./nodemailer.email");

const SkillMatch = async (companyName, position, SkillsRequired) => {
  const skillarray = SkillsRequired.split(",");
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
                let skillRegExp = new RegExp(`\\b${skill}\\b`, "gi");
                const matches = userSkills.match(skillRegExp);
                if (matches) {
                  console.log(x.name);
                  let name = x.name;
                  mailList.push({ name: x.name, email: x.email });

                  return x.name;
                }
              });

              return skillSelect;
            }
          });
          // console.log(mailList,skillarray,"NAme")
          const uniqueArray = mailList.filter((item, index, self) => {
            // Use the findIndex() method to check if the current item is the first occurrence in the array
            return (
              index ===
              self.findIndex(
                (t) => t.name === item.name && t.email === item.email
              )
            );
          });
          console.log(uniqueArray);
          uniqueArray.map((x) => {
            //  Transmit Email
            let html = generateHTML(x.name, companyName, position);
            email(x.email, "Job Alert For You", html);
          });
          return userlist;
        } catch (error) {
          console.log(error);
        }
      });
    // console.log(users, "ksdfhksfokjsdokfj");
    // console.log(users[0].skill, "users");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { SkillMatch };
