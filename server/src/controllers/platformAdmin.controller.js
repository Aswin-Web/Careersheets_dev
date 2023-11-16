// MONGODB Models
const Jobs = require("../models/jobs.models");
const LoginHistory = require("../models/login.history.model");
const User = require("../models/user.models");
const generateToken = require("../utils/jwt.token");

//npm Libraries
const { validationResult, body } = require("express-validator");
const { SkillMatch } = require("../utils/skillmatch.utils");
const { generateHTML } = require("../utils/alerts.email.utils");
const email = require("../utils/nodemailer.email");

const GetAllCollegeAdmin = async (req, res, next) => {
  try {
    console.log("Asking");
    const Userlist = await User.find({
      role: "collegeadmin",
      verification: true,
    })
      .select({
        _id: 1,
        name: 1,
        email: 1,
        displayPicture: 1,
        collegeVerification: 1,
        contact: 1,
        collegeName: 1,
      })
      .sort({ createdAt: -1 });
    console.log(await Userlist);
    return res.json({ user: Userlist });
  } catch (error) {
    console.log(error.message);
    return next();
  }
};

const GetAllRecruiters = async (req, res, next) => {
  try {
    console.log("Asking");
    const Userlist = await User.find({
      role: "recruiter",
    })
      .select({
        _id: 1,
        name: 1,
        email: 1,
        displayPicture: 1,
        verification: 1,
        contact: 1,
      })
      .sort({ createdAt: -1 });
    console.log(await Userlist);
    return res.json({ user: Userlist });
  } catch (error) {
    console.log(error.message);
    return next();
  }
};

const VerifyRecruiter = async (req, res, next) => {
  try {
    const recruiterID = req.params.userid;
    const Userlist = await User.find({
      _id: recruiterID,
      role: "recruiter",
    })
      .select({
        _id: 1,
        name: 1,
        email: 1,
        displayPicture: 1,
        verification: 1,
        contact: 1,
      })
      .sort({ createdAt: -1 });
    console.log(await Userlist);
    if (Userlist.length !== 0) {
      const recruiter = await User.findByIdAndUpdate(
        { _id: recruiterID },
        { verification: !Userlist[0].verification },
        { new: true }
      );
      return res
        .status(200)
        .json({ isEdited: true, msg: "Successfully Edited" });
    } else {
      return res.status(200).json({ isEdited: false, msg: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    return next();
  }
};

const UpdateAdminVerification = async (req, res, next) => {
  try {
    const { user_id, userVerification } = req.body;
    console.log(user_id, userVerification);
    if (user_id) {
      const user = await User.update(
        { _id: user_id, collegeVerification: !userVerification },
        { collegeVerification: userVerification }
      );
      console.log(user);
      res.status(200).json({ msg: "account updated successfully" });
    } else {
      res.status(404).json({ msg: "please do provide the input fields" });
    }
  } catch (error) {
    console.log(error);
    return next();
  }
};
const ADMIN_NAME = process.env.ADMIN_NAME || "admin";
const ADMIN_PWD = process.env.ADMIN_PWD || "123456789";
const AuthenticatePlatformAdmin = async (req, res, next) => {
  try {
    const { adminName, adminPassword } = req.body;

    if (adminName !== "" && adminPassword !== "") {
      if (adminName === ADMIN_NAME && adminPassword === ADMIN_PWD) {
        // Create an JWT

        const token = await generateToken("admin@gmail.com");
        return res.status(200).json({ token: await token });
      } else {
        return res.status(403).json({ msg: "Invalid Credentials" });
      }
    } else {
      return res.status(400).json({ msg: "Invalid input fields" });
    }
  } catch (error) {
    console.log(error);
    return next();
  }
};

const InputValidationJob = [
  body("companyName")
    .exists()
    .withMessage("Company Name did not exist")
    .isString()
    .withMessage("Its not a valid string")
    .isLength({ min: 5 })
    .withMessage("Company Name is too short"),
  body("companyDescription")
    .exists()
    .withMessage("Company Description did not exist")
    .isString()
    .withMessage("Its not a valid string")
    .isLength({ min: 5 })
    .withMessage("Company description is too short"),
  body("roleName")
    .exists()
    .withMessage("Role Name did not exist")
    .isString()
    .withMessage("Its not a valid string")
    .isLength({ min: 5 })
    .withMessage("Role Name is too short"),
  body("salary")
    .exists()
    .withMessage("salary is not mentioned")
    .isString()
    .withMessage("not a valid string"),
  body("location")
    .exists()
    .withMessage("location did not exist")
    .isString()
    .withMessage("Its not a valid string")
    .isLength({ min: 3 })
    .withMessage("locataion is too short"),
  body("Responsibilites")
    .exists()
    .withMessage("Responsibilities doesnt exist")
    .isString()
    .withMessage("Its not a valid string")
    .isLength({ min: 5 })
    .withMessage("Responsibilites is too short"),
  body("SkillsRequired")
    .exists()
    .withMessage("Skills did not exist")
    .isString()
    .withMessage("Its not a valid string")
    .isLength({ min: 5 })
    .withMessage("Skills is too short"),
  body("experience").exists().withMessage(" did not exist"),
  body("companyAddress")
    .exists()
    .withMessage(" did not exist")
    .isString()
    .withMessage("it is not a valid string")
    .isLength({ min: 5 })
    .withMessage(" is too short"),
  body("education")
    .exists()
    .withMessage(" did not exist")
    .isString()
    .withMessage("it is not a valid string")
    .isLength({ min: 5 })
    .withMessage(" is too short"),
  body("JobDescription")
    .exists()
    .withMessage(" did not exist")
    .isString()
    .withMessage("it is not a valid string")
    .isLength({ min: 5 })
    .withMessage(" is too short"),
  body("IndustryType")
    .exists()
    .withMessage(" did not exist")
    .isString()
    .withMessage("it is not a valid string")
    .isLength({ min: 5 })
    .withMessage(" is too short"),
  body("departmentType")
    .exists()
    .withMessage(" did not exist")
    .isString()
    .withMessage("it is not a valid string")
    .isLength({ min: 5 })
    .withMessage(" is too short"),
  body("employmentType")
    .exists()
    .withMessage(" did not exist")
    .isString()
    .withMessage("it is not a valid string")
    .isLength({ min: 5 })
    .withMessage(" is too short"),
  body("role_Category")
    .exists()
    .withMessage(" did not exist")
    .isString()
    .withMessage("it is not a valid string")
    .isLength({ min: 5 })
    .withMessage(" is too short"),
  body("pincode")
    .exists()
    .withMessage(" did not exist")
    .isString()
    .withMessage("it is not a valid string")
    .isLength({ min: 5 })
    .withMessage(" is too short"),
];

const JobCreationRoute = async (req, res, next) => {
  const { errors } = validationResult(req);

  console.log(errors);
  const message = errors;
  if (errors.length !== 0) {
    return res.status(400).json({ msg: message });
  }
  console.log(req.body);
  try {
    const {
      companyName,
      companyDescription,
      roleName,
      salary,
      location,
      Responsibilites,
      SkillsRequired,
      experience,
      companyAddress,
      education,
      JobDescription,
      IndustryType,
      departmentType,
      employmentType,
      role_Category,
      pincode,
      projectSwitch,
    } = req.body;
    console.log(req.body);

    console.log(Responsibilites);
    const doc = await Jobs.create({
      companyName,
      companyDescription,
      roleName,
      salary,
      location,
      Responsibilites,
      SkillsRequired,
      experience,
      companyAddress,
      education,
      JobDescription,
      IndustryType,
      departmentType,
      employmentType,
      role_Category,
      pincode,
      projectLevel: projectSwitch,  
    });
    const modify = await doc.save().then((x) => {
      // SkillMatch(companyName, roleName,SkillsRequired);
      return x;
    });

    return res
      .status(200)
      .json({ msg: "Job Poster Created Successfully", job: modify });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const GetAllJobs = async (req, res, next) => {
  const jobs = await Jobs.find({})
    .populate({
      path: "recruitersInfo",
      select: "name email",
    })

    .populate({
      path: "appliedUsers.userId",
      populate: {
        path: "project",
      },
      // populate:{
      //   path:"education"
      // }
    })
    .populate({
      path: "appliedUsers.userId",
      populate: {
        path: "skill",
      },
    })
    .populate({
      path: "appliedUsers.userId",
      populate: {
        path: "education",
      },
    })
    .sort({ createdAt: -1 });
  return res.status(200).json({ allJobs: jobs });
};

const EditJobs = async (req, res, next) => {
  try {
    // Input Validation Express Validator
    const { errors } = validationResult(req);
    console.log(errors);
    const message = errors;
    if (errors.length !== 0) {
      return res.status(400).json({ msg: message });
    }

    const {
      companyName,
      companyDescription,
      roleName,
      salary,
      location,
      Responsibilites,
      SkillsRequired,
      experience,
      companyAddress,
      education,
      JobDescription,
      IndustryType,
      departmentType,
      employmentType,
      role_Category,
      projectLevel
    } = req.body;
    const { jobId } = req.params;
    let jobOppourtunity = await Jobs.findOne({ _id: jobId });

    // console.log(jobOppourtunity);

    if (jobOppourtunity !== null) {
      jobOppourtunity = {
        companyName,
        companyDescription,
        roleName,
        salary,
        location,
        Responsibilites,
        SkillsRequired,
        experience,
        companyAddress,
        education,
        JobDescription,
        IndustryType,
        departmentType,
        employmentType,
        role_Category,
        projectLevel
      };
      const modify = await Jobs.findOneAndUpdate(
        { _id: jobId },
        jobOppourtunity,
        { new: true }
      );
      // console.log(modify);
      return res.json({ msg: "edited successfully", job: modify });
    }
    return res.json({ msg: "The Job you applied does not exist" });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const DisableJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    console.log("Worked For ME");
    const currentJob = await Jobs.find({ _id: jobId });
    if (currentJob[0].length !== 0) {
      const modifyJob = await Jobs.findOneAndUpdate(
        { _id: jobId },
        { isClosed: !currentJob[0].isClosed }
      );
      return res.status(200).json({
        msg: "Edited Successfully",
        job: {
          ...modifyJob._doc,
          isClosed: !modifyJob._doc.isClosed,
        },
      });
    } else {
      return res.status(400).json({
        message: "Job does not Exist ",
      });
    }
  } catch (error) {
    console.log(error);
    return next();
  }
};

const GetUserInfoAdmin = async (req, res) => {
  const id = req.params.id;

  let userEducation;
  try {
    userDetails = await User.findById(id)
      .populate("education")
      .populate("skill")
      .populate("project")
      .populate("personal");
  } catch (error) {
    console.log(error);
  }
  if (!userDetails) {
    return res.status(400).json({ message: "Could not find user" });
  }

  return res.status(200).json(userDetails);
};

const AddViewedToUser = async (req, res, next) => {
  const { userId, jobId } = req.body;
  try {
    const jobs = await Jobs.updateOne(
      { _id: jobId, "appliedUsers.userId": userId },
      { $set: { "appliedUsers.$.isViewed": true } }
    );

    // console.log(jobs)
    return res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const AddWishlistedToUser = async (req, res, next) => {
  const { userId, jobId, isWishlisted } = req.body;
  try {
    const jobs = await Jobs.updateOne(
      { _id: jobId, "appliedUsers.userId": userId },
      { $set: { "appliedUsers.$.Wishlisted": isWishlisted } }
    );

    // console.log(jobs)
    return res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const ViewLastLoginUsers = async (req, res, next) => {
  try {
    const resultData = await LoginHistory.find()
      .populate({ path: "user_id", select: "name email displayPicture" })
      .select("createdAt ")
      .sort({ createdAt: "-1" });
    // console.log(resultData)
    return res.status(200).json({ list: resultData });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const showUsersWithTheRequiredSkillSets = async (req, res, next) => {
  try {
    const skill = req.body.skills;
    if (skill !== "") {
      const users = await SkillMatch(skill);
      console.log(users);
      return res
        .status(200)
        .json({ msg: "successfully generated", userlist: users });
    } else {
      return res.status(200).json({ msg: "No Skills Was Specified" });
    }
  } catch (error) {
    console.log(error);
    return next();
  }
};

const sendEmailToAllShownUsers = async (req, res, next) => {
  try {
    const { skill, companyName, role, selectedUsers } = req.body;
    console.log(selectedUsers,"dd")
    if (selectedUsers.length !== 0) {
      selectedUsers.map((x) => {
        //  Transmit Email
        let html = generateHTML(x.name, companyName, role);
        email(x.email, "Job Alert For You", html);
      });

      return res.status(200).json({
        msg: "Selected Mail Transmitted  Successfully",
        mailTransmit: selectedUsers.length,
      });

    } else {
      if (skill !== "") {
        const users = await SkillMatch(skill);
        if (users.length !== 0) {
          users.map((x) => {
            //  Transmit Email
            let html = generateHTML(x.name, companyName, role);
            email(x.email, "Job Alert For You", html);
          });

          return res.status(200).json({
            msg: "Mail Transmitted Successfully",
            mailTransmit: users.length,
          });
        } else {
          return res.status(200).json({
            msg: "No mail was shared because no one has the skill set.",
          });
        }
      } else {
        return res.status(200).json({ msg: "No Skills Was Specified" });
      }
    }
  } catch (error) {
    console.log(error);
    return next();
  }
};
const GetAParticularJob = async (req, res, next) => {
  try {
    const job_id = req.params.jobId;
    const job = await Jobs.find({ _id: job_id }).populate("recruitersInfo");
    if (job.length !== 0) {
      return res.status(200).json({ msg: "Successfully got job", job: job });
    } else {
      return res.status(400).json({ msg: "No job found", job: [] });
    }
  } catch (error) {
    console.log(error);
    return next();
  }
};

const FindARecruiter = async (req, res, next) => {
  try {
    const keyword = req.query.find;
    const job_id = req.body.jobbID;
    const job_users = await Jobs.find({ _id: job_id }).select("recruitersInfo");
    console.log(job_users);
    // console.log(job_users.map((x) => x._id.toString()));
    if (keyword !== "") {
      if (job_users[0].recruitersInfo.length !== 0) {
        const user = await User.find({
          role: "recruiter",
          // recruiterInfo: { $ne: null },
          _id: { $nin: job_users.map((x) => x.recruitersInfo.toString()) },
          $or: [
            { name: { $regex: `^${keyword}`, $options: "i" } },
            { email: { $regex: `^${keyword}`, $options: "i" } },
          ],
        }).select("name email displayPicture");

        // console.log(user);
        return res.status(200).json(user);
      } else {
        const user = await User.find({
          role: "recruiter",
          recruiterInfo: { $ne: null },
          $or: [
            { name: { $regex: `^${keyword}`, $options: "i" } },
            { email: { $regex: `^${keyword}`, $options: "i" } },
          ],
        }).select("name email displayPicture");

        console.log(user);
        return res.status(200).json(user);
      }
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
    return next();
  }
};

const AddRecruiterToJobPosting = async (req, res, next) => {
  try {
    const { recruiter, jobbID } = req.body;
    let isJob = await Jobs.find({ _id: jobbID });
    const isRecruiter = await User.find({ _id: recruiter, role: "recruiter" });
    if ((isJob.length && isRecruiter.length) !== 0) {
      const isUser = isJob[0].recruitersInfo.filter(
        (x) => x.toString() === recruiter
      );
      if (isUser.length === 0) {
        const addRecruiter = await Jobs.findOneAndUpdate(
          { _id: jobbID },
          { $push: { recruitersInfo: recruiter } },
          { new: true }
        )
          .populate({
            path: "recruitersInfo",
            select: "email name displayPicture",
          })
          .populate({
            path: "appliedUsers.userId",
            populate: {
              path: "project",
            },
            // populate:{
            //   path:"education"
            // }
          })
          .populate({
            path: "appliedUsers.userId",
            populate: {
              path: "skill",
            },
          })
          .populate({
            path: "appliedUsers.userId",
            populate: {
              path: "education",
            },
          })
          .sort({ createdAt: -1 });
        // console.log(addRecruiter);
        return res
          .status(200)
          .json({ msg: "added recruiter", job: addRecruiter });
      } else {
        return res.status(200).json({ msg: "User alerady exists", job: isJob });
      }
    } else {
      return res
        .status(400)
        .json({ msg: "You dont have a Job or a recruiter" });
    }

    return res.send("HELLOWINN");
  } catch (error) {
    console.log(error);
    return next();
  }
};

const RemoveRecruiterFromJobPosting = async (req, res, next) => {
  try {
    const { recruiter, jobbID } = req.body;
    let isJob = await Jobs.find({ _id: jobbID });
    const isRecruiter = await User.find({ _id: recruiter, role: "recruiter" });
    if ((isJob.length && isRecruiter.length) !== 0) {
      const removeRecruiter = await Jobs.findOneAndUpdate(
        { _id: jobbID },
        { $pull: { recruitersInfo: isRecruiter[0]._id.toString() } },
        { new: true }
      )
        .populate({
          path: "recruitersInfo",
          select: "email name displayPicture",
        })
        .populate({
          path: "appliedUsers.userId",
          populate: {
            path: "project",
          },
          // populate:{
          //   path:"education"
          // }
        })
        .populate({
          path: "appliedUsers.userId",
          populate: {
            path: "skill",
          },
        })
        .populate({
          path: "appliedUsers.userId",
          populate: {
            path: "education",
          },
        })
        .sort({ createdAt: -1 });
      // console.log(removeRecruiter)
      return res
        .status(200)
        .json({ msg: "added recruiter", job: removeRecruiter });
    } else {
      return res
        .status(400)
        .json({ msg: "You dont have a Job or a recruiter" });
    }
  } catch (error) {
    console.log(error);
    return next();
  }
};

module.exports = {
  GetAllCollegeAdmin,
  UpdateAdminVerification,
  AuthenticatePlatformAdmin,
  JobCreationRoute,
  InputValidationJob,
  GetAllJobs,
  EditJobs,
  DisableJob,
  GetUserInfoAdmin,
  AddViewedToUser,
  AddWishlistedToUser,
  ViewLastLoginUsers,
  showUsersWithTheRequiredSkillSets,
  sendEmailToAllShownUsers,
  GetAParticularJob,
  GetAllRecruiters,
  FindARecruiter,
  AddRecruiterToJobPosting,
  RemoveRecruiterFromJobPosting,
  VerifyRecruiter,
};
