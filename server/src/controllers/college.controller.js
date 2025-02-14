const User = require("../models/user.models");
const Education = require("../models/education.model");
const Application = require("../models/application.models");
const Certification = require("../models/certification.models");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  const user = req.user._id.toString();
  if (user === "") {
    return;
  }

  let collegeAdmin;
  let college;
  //   let jobSeekerCollege;
  //   let userID = [];
  let userApplication;

  try {
    collegeAdmin = await User.findById(user);

    college = collegeAdmin.collegeName;

    if (!college) {
      return res.status(501).json({ message: "notselected" });
    }

    if (collegeAdmin.collegeVerification) {
      userApplication = await Education.aggregate([
        { $match: { collegeName: college /*collegeVerification:true*/ } },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails",
          },
        },

        {
          $lookup: {
            from: "applications",
            localField: "user",
            foreignField: "author",
            as: "application",
          },
        },
        { $sort: { "application.updatedAt": -1 } },
      ]);

      const users = await Education.aggregate([
        { $match: { collegeName: college } }, 
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $project: {
            _id: 0,
            userId: "$user", 
          },
        },
      ]);

      console.log("user", users);
      const userIds = users.map(user => user.userId);

      let certificationInfo = await Certification.find({
        user: { $in: userIds }  
      }).populate({
        path: "issuedBy",
        model: "certificationProvider",
        select: "ProviderName",
      })
      .populate({
        path: "user",
        model: "User",
        select: "name", 
      });;
  
      certificationInfo = certificationInfo.map((cert) => ({
        ...cert.toObject(),
        issuedBy: cert.issuedBy?.ProviderName || null,
      }));
  
      console.log("certification", certificationInfo);

      return res
        .status(200)
        .json({ userApplication: userApplication, collegeAdmin: collegeAdmin, certificationInfo });
    } else {
      return res.status(401).json({ message: "College Admin is not verified" });
    }
  } catch (error) {
    console.log(error);
  }
};

////adding college admin's college and contact/////
const addCollege = async (req, res) => {
  const user = req.user._id.toString();
  const { college, contact } = req.body;

  if (college === "" && contact === "") {
    return;
  }
  let collegeAdmin;

  try {
    const abc = await User.findByIdAndUpdate(
      { _id: user },
      {
        $set: {
          collegeName: college,
          contact: contact,
          collegeVerification: false,
        },
      }
    );
    collegeAdmin = await User.findById(user);
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ message: "college and contact added" });
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  let applicationDetails, certificationInfo;
  let user;
  try {
    applicationDetails = await Application.find({ author: id }).populate(
      "author"
    );

     certificationInfo = await Certification.find({
      user:  id 
    }).populate({
      path: "issuedBy",
      model: "certificationProvider",
      select: "ProviderName",
    })
    .populate({
      path: "user",
      model: "User",
      select: "name", 
    });;

    certificationInfo = certificationInfo.map((cert) => ({
      ...cert.toObject(),
      issuedBy: cert.issuedBy?.ProviderName || null,
    }));


    if (!applicationDetails) {
      return res.status(200).json({ message: "No appliation Details found" });
    }
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ applicationDetails: applicationDetails, certificationInfo });
};

module.exports = {
  getUsers,
  addCollege,
  getUserById,
};
