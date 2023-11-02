const Recruiter = require("../models/recruiterinfo.models");
const User = require("../models/user.models");
const Jobs = require("../models/jobs.models");
const Mongoose = require("mongoose");

const CreateProfile = async (req, res, next) => {
  try {
    const { employeeName, employeePosition, companyName, contactNumber } =
      req.body;
    if (
      (companyName && contactNumber && employeeName && employeePosition) !== ""
    ) {
      const isUser = await User.findOne({ _id: req.user });
      if (isUser.recruiterInfo !== undefined) {
        const infoUpdate = await Recruiter.findOneAndUpdate(
          { _id: isUser.recruiterInfo },
          {
            employeeName,
            employeePosition,
            companyName,
            contactNumber,
          }
        );
        return res.status(200).json({ msg: "Profile Updated successfully" });
      } else {
        const profileInsert = await Recruiter.create({
          employeeName,
          employeePosition,
          companyName,
          contactNumber,
        });
        profileInsert.save();
        const userUpdate = await User.findOneAndUpdate(
          { _id: req.user },
          { recruiterInfo: profileInsert._id }
        );
        return res.status(200).json({ msg: "Profile Inserted Successfully" });
      }
    } else {
      return res
        .status(400)
        .json({ msg: "Some fields are not inserted properly" });
    }
  } catch (error) {
    console.log(error);
    return next();
  }
};

const ViewRecruiterJobs = async (req, res, next) => {
  console.log(req.user, "View Jobs");
  const jobs = await Jobs.find({
    recruitersInfo: { $in: [Mongoose.Types.ObjectId(req.user)] },
  })
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
    .select("-recruitersInfo")
    .sort({ createdAt: -1 });
  // console.log(jobs[0].recruitersInfo)
  return res.status(200).json({ allJobs: jobs });
};

const GetAParticularJobForRecruiter = async (req, res, next) => {
  // console.log(req.user)
  try {
    const jobs = await Jobs.find({
      _id: req.params.jobid,
      recruitersInfo: { $in: [Mongoose.Types.ObjectId(req.user)] },
    })
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
      .select("-recruitersInfo")
      .sort({ createdAt: -1 });
    return res.status(200).json({ allJobs: jobs });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const GetUserInfoRecruiter = async (req, res, next) => {
  const id = req.params.id;
  try {
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

    console.log(userDetails);
    return res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    return next();
  }
};

module.exports = {
  CreateProfile,
  ViewRecruiterJobs,
  GetAParticularJobForRecruiter,
  GetUserInfoRecruiter,
};
