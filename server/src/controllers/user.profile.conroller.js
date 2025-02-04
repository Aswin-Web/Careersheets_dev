const Education = require("../models/education.model");
const Skill = require("../models/skill.models");
const JobSeeker = require("../models/user.models");
const User = require("../models/user.models");
const PlatformSkill = require("../models/platformSkills.models");
const Project = require("../models/project.models");
const mongoose = require("mongoose");
const Jobs = require("../models/jobs.models");
const Application = require("../models/application.models");
const JobsHistory = require("../models/jobshistory.models");
const Certification = require("../models/certification.models");
const CertificationProvider = require("../models/certificateProvider.models");

const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


const getUserInfo = async (req, res) => {

  //console.log("Request body from getUserInfo", req.user);
  const id = req.user._id.toString();

  let userEducation;
  try {
    userDetails = await JobSeeker.findById(id)
      .populate("education")
      .populate("skill")
      .populate("project")
      .populate("personal");

      if (!userDetails) {
        return res.status(400).json({ message: "Could not find user" });
      }
      console.log("userdetail", userDetails)

      if (Array.isArray(userDetails.certification)) {
        let certifications = await Certification.find({
          _id: { $in: userDetails.certification },
        }).populate({
          path: "issuedBy",
          model: "certificationProvider",
          select: "ProviderName", 
        });
  
        certifications = certifications.map(cert => ({
          ...cert.toObject(),
          issuedBy: cert.issuedBy?.ProviderName || null, 
        }));

        console.log("certification", certifications)
        userDetails = {
          ...userDetails.toObject(),
          certification: certifications,
        };
      } else {
        userDetails = {
          ...userDetails.toObject(),
          certification: [],
        };
      }

  } catch (error) {
    console.log(error);
  }
  if (!userDetails) {
    return res.status(400).json({ message: "Could not find user" });
  }

  return res.status(200).json(userDetails);
};

const postEducation = async (req, res) => {
  const { college, degree, graduated, graduationYear, registerNumber, stream } =
    req.body;
  const user = req.user._id.toString();

  let existingUser;
  let existingCollege;
  let matchedRegister;
  try {
    existingCollege = await Education.find({ collegeName: college });

    matchedRegister = existingCollege.find(
      (el) => el.registerNumber === registerNumber
    );

    if (matchedRegister) {
      console.log("trueeee regiter number matches");
      return res.status(400).json({
        message:
          "The user with this register number for this college already exists.!!",
      });
    } else {
      console.log("register number mismatches");
    }

    existingUser = await JobSeeker.findById(user).populate("education");
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find the user" });
  }
  const edu = new Education({
    collegeName: college,
    graduated,
    graduationYear,
    degree,
    registerNumber,
    user,
    stream,
  });
  try {
    await edu.save();
    existingUser.education.push(edu);
    await existingUser.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: "education added", edu });
};

const deleteEducation = async (req, res) => {
  const id = req.params.id;

  let edu;
  try {
    edu = await Education.findByIdAndRemove(id).populate("user");
    await edu.user.education.pull(edu);
    await edu.user.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }

  if (!edu) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "successffully deleted", edu });
};
/////skill post ///////

const postSkill = async (req, res) => {
  const { skill, level } = req.body;
  const user = req.user._id.toString();
  let existingUser;
  try {
    existingUser = await JobSeeker.findById(user).populate("skill");
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "could not find the user" });
  }
  
  const findSkill = existingUser.skill.find((el) => el.skill === skill);

  if (findSkill) {
    return res.status(400).json({ message: "This skill is already present" });
  }

  const newSkill = new Skill({ skill, user, level });

  try {
    await newSkill.save();
    existingUser.skill.push(newSkill);
    await existingUser.save();

    return res.status(200).json({ message: "skill added", newSkill });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const deleteSkill = async (req, res) => {
  const skillId = req.params.id;

  let existingSkill;
  try {
    existingSkill = await Skill.findByIdAndRemove(skillId).populate("user");
    await existingSkill.user.skill.pull(existingSkill);
    await existingSkill.user.save();
  } catch (error) {
    console.log(error);
  }
  if (!existingSkill) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res
    .status(200)
    .json({ message: "successffully deleted", existingSkill });
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  const user = req.user._id.toString();

  if (status === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  } 

  let existingUser;
  try {
    await JobSeeker.updateOne({ _id: user }, { $set: { status: status } });
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ message: "status updated", status });
};


////////POSTING PROJECT/////
const postProject = async (req, res) => {
  const { projectTitle, projectDescription, projectDomain, skill } = req.body;
  const user = req.user._id.toString();
  let existingUser;
  try {
    existingUser = await JobSeeker.findById(user).populate("project");
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "could not find the user" });
  }
  // const findProject = existingUser.project.find((el) => el.projectTitle === projectTitile);

  // if (findProject) {
  //   return res.status(400).json({ message: "This skill is already present" });
  // }
  const projectSkills = skill;
  console.log(projectSkills, "kkkkkk");

  const newProject = new Project({
    projectTitle,
    projectDomain,
    projectDescription,
    projectSkills,
    user,
  });

  try {
    await newProject.save();
    existingUser.project.push(newProject);
    await existingUser.save();

    return res.status(200).json({ message: "project added", newProject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

//////DELETE PROJECT/////
const deleteProject = async (req, res) => {
  const id = req.params.id;

  let existingProject;
  try {
    existingProject = await Project.findByIdAndRemove(id).populate("user");

    await existingProject.user.project.pull(existingProject);
    await existingProject.user.save();

    if (!existingProject) {
      return res.status(500).json({ message: "Unable to delete" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res
    .status(200)
    .json({ message: "Successfully Deleted", existingProject });
};

/////SPECIFYING PROFILE ROLE//////////
const updateProfileRole = async (req, res) => {
  const { profileRole } = req.body;
  const user = req.user._id.toString();
  let role;
  try {
    userRole = await User.findByIdAndUpdate(
      user,
      { $set: { profileRole: profileRole } },
      { new: true }
    );
    const role = userRole.profileRole;
    res.status(200).json({ message: "updated Successfully", role: role });
    console.log(role);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};


const updateProfileName = async (req, res) => {
  const { name } = req.body;
  const user = req.user._id.toString();
  try {
    let userName = await User.findByIdAndUpdate(
      user,
      { $set: { name: name } },
      { new: true }
    );
    const updatedName = userName.name;
    res.status(200).json({ message: "name updated Successfully", name: updatedName });
    console.log(userName);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};


const GetAllJobs = async (req, res, next) => {
  try {
    const user = req.user._id.toString();
    const userInfo = await User.findOne({ _id: user }).populate("skill");

    //console.log("user infooooooooooooo", userInfo.skill);

    const acceptJobs = await Jobs.find({
      _id: { $nin: userInfo.appliedPlatformJobs },
      isClosed: false
    })
      .sort([["createdAt", -1]])
      .select(
        "-appliedUsers.isWishlisted -appliedUsers.userId -appliedUsers.isViewed"
      );

    const jobs = acceptJobs;
  
    return res.json({ jobs });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const ApplyForPlatformJobs = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user._id.toString();

    const job = await Jobs.find({ _id: jobId });
    let user = await User.findOne({ _id: userId });
    if (job.length !== 0) {
      if (user.appliedPlatformJobs === undefined) {
        let modify = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { appliedPlatformJobs: jobId } }
        );
        let jobUpdate = await Jobs.findOneAndUpdate(
          {
            _id: jobId,
          },
          { $push: { appliedUsers: { userId, isViewed: false } } }
        );
        const newApplication = await Application.create({
          author: userId,
          company: job[0].companyName,
          designation: job[0].roleName,
          whereApply: "Carrersheets",
          joblink: "-",
          applicationDate: job[0].createdAt,
          location: job[0].location,
        });
        return res.status(200).json({
          msg: "item added successfully",
          newApplication: newApplication,
        });
      } else {
        const isDuplicated = user.appliedPlatformJobs.filter(
          (item) => item.toString() === jobId
        );

        if (isDuplicated.length === 0) {
          let modify = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { appliedPlatformJobs: jobId } }
          );
          const newApplication = await Application.create({
            author: userId,
            company: job[0].companyName,
            designation: job[0].roleName,
            whereApply: "Carrersheets",
            joblink: "-",
            applicationDate: job[0].createdAt,
            location: job[0].location,
          });
          let jobUpdate = await Jobs.findOneAndUpdate(
            {
              _id: jobId,
            },
            { $push: { appliedUsers: { userId, isViewed: false } } }
          );

          return res.status(200).json({
            msg: "item added successfully",
            newApplication: newApplication,
          });
        } else {
          return res.status(400).json({ msg: "item already presented" });
        }
      }
    } else {
      return res.status(400).json({ msg: "Job is not Valid" });
    }
  } catch (error) {
    console.log(error);
    return next();
  }
};


const AddUserToJobHistory = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    if (jobId === undefined || jobId === "") {
      return res.status(400).json({ msg: "Invalid Parameter Sent" });
    }

    const updateData = await JobsHistory.create({
      job_id: jobId,
      user_id: req.user._id.toString(),
    });
    const ApplicationViews = await JobsHistory.find({
      job_id: mongoose.Types.ObjectId(jobId),
    }).count();
    console.log(ApplicationViews);
    return res
      .status(200)
      .json({ msg: "Inserted Successfully", views: ApplicationViews });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const AppliedJobs = async (req, res, next) => {
  try {
    const user = req.user._id.toString();
    const userInfo = await User.findOne({ _id: user }).populate("skill");
    const jobs = await Jobs.find({
      _id: { $in: userInfo.appliedPlatformJobs },
      isClosed: false,
      //  [/.*c.*/i ,/.*Java.*/i ]
    })
      .sort([["createdAt", -1]])
      .select(
        "-appliedUsers.isWishlisted -appliedUsers.userId -appliedUsers.isViewed"
      );

    console.log(jobs);
    return res.json({ jobs });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const SearchAppliedJobs = async (req, res, next) => {
  try {
    const user = req.user._id.toString();
    // const userInfo = await User.findOne({ _id: user }).populate("skill");
    const jobs = await Jobs.find({
      _id: req.params.id,

      //  [/.*c.*/i ,/.*Java.*/i ]
    })
      .sort([["createdAt", -1]])
      .select(
        "-appliedUsers.isWishlisted -appliedUsers.userId -appliedUsers.isViewed"
      );
    const projectUser = await User.findOne({ _id: user });
    console.log(jobs);
    return res.json({ jobs });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const GetAllPlatFormSkills = async (req, res, next) => {
  try {
    const skill = await PlatformSkill.find({});
    return res.status(200).json({ skill });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const sendEmailOnJobApplication = async (req, res) => {
  const user_info = req.user;
  const { job } = req.body;

  console.log("user info", user_info);
  console.log("job info", job);

  const user = req.user._id.toString();
  const userInfo = await User.findOne({ _id: user }).populate("skill");

  const userSkills = userInfo.skill.map(skill => `${skill.skill} - ${skill.level}`).join(", ");

  let config = {
      service: 'gmail',
      auth: {
          user: process.env.APPLICATION_EMAIL,
          pass: process.env.APPLICATION_PASSWORD
      }
  };
  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
      theme: "default",
      product: {
          name: "Careersheets",
          link: 'https://app.careersheets.in/'
      }
  });

  let response = {
    body: {
        table: {
            data: [{
                Applicant_Name: user_info.name,
                Applicant_Email: user_info.email,
                Comapny_Name: job.companyName,
                Skills_Required_For_Job: job.SkillsRequired,
                Role: job.roleName,
                Location: job.location,
                Resume:`https://www.app.careersheets.in/admin/profile/resume/${job._id}/${user_info._id}`
            }]
        }
    }
};

  let mail = mailGenerator.generate(response);
  let message = {
      from: `CareerSheets ${process.env.APPLICATION_EMAIL}`,
      to: "dhanesh@ibacustech.com",
      subject: "Job Application Received",
      html: mail
  };

  try {
      // Send email
      await transporter.sendMail(message);
      return res.status(201).json({ msg: "Mail sent successfully!" });
  } catch (error) {
      console.error("Error sending mail:", error);
      return res.status(500).json({ error: "Error sending mail." });
  }
}





//Certifications

const createCertifications = async (req, res) => {
  const userId = req.user._id.toString();
  let existingUser;

  try {
    existingUser = await User.findById(userId);
    console.log("user found", existingUser);

    if (!existingUser) {
      return res.status(400).json({ message: "Unable to find the user" });
    }

    const {
      existingId,
      certificateName,
      providedBy,
      issuedOn,
      startDate,
      endDate,
      certificateId,
      approval
    } = req.body.formData;

    const {isCustomProvider} = req.body;

    console.log("custommmmm", isCustomProvider, req.body.formData);

    let existingCertification;
    let matchedCertificateId;

    if (existingId) {
      existingCertification = await Certification.find({ _id: existingId });

      matchedCertificateId = existingCertification.find(
        (el) => el.certificateId == certificateId
      );

      if (matchedCertificateId) {
        console.log("true certificateId matches");
        return res.status(400).json({
          message:
            "A certification with this certificate ID already exists for the user.",
        });
      } else {
        console.log("certificate ID mismatches");
      }
    }

    let certificationProvider = [];

    if (isCustomProvider) {
      const newCertificationProvider = new CertificationProvider({
        ProviderName: providedBy,
      });

      const savedProvider = await newCertificationProvider.save();
      
      console.log("New provider created:", savedProvider);

      certificationProvider.unshift(savedProvider);

      console.log("New provider createdddddddddddddddddddd", certificationProvider);

    } else {

      certificationProvider = await CertificationProvider.find({Providername:providedBy});

      if (!certificationProvider) {
        return res
          .status(404)
          .json({ message: "Certification Provider not found" });
      }
    }


    console.log("sssssssssssssssssss idiidid", certificationProvider) 

    const certification = new Certification({
      certificationName: certificateName,
      issuedBy: certificationProvider[0]._id,
      certificateIssuedDate: issuedOn,
      startDate,
      expiryDate: endDate,
      certificateId,
      user: userId,
      approval,
    });

    await certification.save();

    if (Array.isArray(existingUser.certification)) {
      existingUser.certification.push(certification._id);
    } else {
      existingUser.certification = [certification._id];
    }

    const userArray = await existingUser.save();

    console.log("certificiciiciccc", certification)

    return res.status(200).json({
      message: "Certification added successfully",
      certification,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};


const getCertifications = async (req, res, next) => {
  try {
    const user = req.user._id.toString();

    const userInfo = await Certification.find({ user: user });

    console.log("user infooooooooooooo", userInfo);


    return res.json({ userInfo });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const deleteCertificate = async (req, res) => {
  const id = req.params.id;

  let existingCertificate;

  try {
    existingCertificate = await Certification.findByIdAndRemove(id).populate("user");

    await existingCertificate.user.certification.pull(existingCertificate);
    await existingCertificate.user.save();

    if (!existingCertificate) {
      return res.status(500).json({ message: "Unable to delete Certificate" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res
    .status(200)
    .json({ message: "Successfully Deleted the Certificate", existingCertificate });
};



const getCertificationProvider = async (req, res, next) => {
  try {
    const CertificationProviderInfo = await CertificationProvider.find();

    console.log("Certification Provider Info", CertificationProviderInfo);

    return res.json({ CertificationProviderInfo });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const generateCertification = async (req, res, next) => {
  try {
    sendEmail(req.user.email, "CareerSheets", message);
    
    return res.json({ CertificationProviderInfo });
  } catch (error) {
    console.log(error);
    return next();
  }
};


module.exports = {
  getUserInfo,
  postEducation,
  deleteEducation,
  postSkill,
  deleteSkill,
  updateStatus,
  updateProfileRole,
  updateProfileName,
  postProject,
  deleteProject,
  GetAllJobs,
  ApplyForPlatformJobs,
  AddUserToJobHistory,
  AppliedJobs,
  SearchAppliedJobs,
  GetAllPlatFormSkills,
  sendEmailOnJobApplication,
  createCertifications,
  getCertifications,
  deleteCertificate,
  getCertificationProvider,
  generateCertification
};
