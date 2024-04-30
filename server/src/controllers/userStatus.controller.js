const {UserStatus} = require("../models/userStatus.model");
const JobSeeker = require("../models/user.models");

let userStatusPost = async (req, res) => {
    console.log("Status Post Function");
    console.log("Request body from cruddddd Controller jjjjjjjjjjjjjjjjjjj",req.body);

    const {skills, tips, collegeName, studentName, displayPicture, date} = req.body;


    const user = req.user._id.toString();
    
    try {
        existingUser = await JobSeeker.findById(user);
      } catch (error) {
        console.log(error);
      }
      if (!existingUser) {
        return res.status(400).json({ message: "could not find the user" });
      }
    
    try {
        const data = new UserStatus({
            skills: skills,
            tips: tips,
            approval: "Under Review",
            user: user,
            college: collegeName,
            studentName: studentName,
            views:"0",
            likes:[],
            displayPicture: displayPicture,
            date:date
        });

        await data.save();
        res.json({ skills,tips,approval: data.approval, user, message: "Posted Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

let getUserWorkingQuestions = async (req, res) => {
  console.log("Fetch Status Data Function");
  const fetchid = req.user._id.toString();
  try{
  const data = await UserStatus.find({user: fetchid});
    if(!data){
        res.send("Data Not Found");
    } 
    res.send(data);
  }catch(err){
    res.send(err);
  }
};

let getUserWorkingQuestionsAdmin = async (req, res) => {
  console.log("Fetch Status Data Function");
  try{
  const data = await UserStatus.find();
    if(!data){
        res.send("Data Not Found");
    } 
    res.send(data);
  }catch(err){
    res.send(err);
  }
};

let getTips = async (req, res) => {
  console.log("Fetch Tips Function");
  console.log("Query Parameters:", req.query);
  const user = req.user._id.toString();

  const collegeName = req.query.collegeName;
  console.log("gsgsggs", collegeName);

  if (!collegeName) {
      return res.status(400).json({ message: "College name is required" });
  }

  const approval = "Approved";

  try {
      const data = await UserStatus.find({ college: collegeName, approval: approval });
      if (!data) {
          return res.status(404).json({ message: "Data Not Found" });
      }

      data.forEach(item => {
          item.rating = item.rating.filter(rating => rating.userId === user);
      });

      res.json(data);
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
};


let updateApproval = async (req, res) => {
  console.log("Update Status Function");
  
  const {approval} = req.body;

  console.log(req.body,"sjjsjsjs")
  const Id = req.params.id;

  try {
      const data = await UserStatus.findOneAndUpdate(
          { _id: Id },
          { $set: { approval: approval } },
          { new: true }
      );
      if (!data) {
          return res.status(404).send("Not found");
      }
 
      return res.json({message: "Updated Approval Status Successfully" });
  } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
  }
};

let updateWorkingQuestion = async (req, res) => {
  console.log("Update Working Question Function");
  const user = req.user._id.toString();
  const {skills, tips} = req.body;
  const Id = req.params.id;
  try {
      const data = await UserStatus.findOneAndUpdate(
          { _id: Id, userId: user },
          { $set: { skills: skills, tips: tips } },
          { new: true }
      ); 
      if (!data) {
          return res.status(404).send("Not found");
      }
      return res.json({skills,tips, approval: data.approval, message: "Updated Working Questions Successfully" });
  } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
  }
};


let tipViews = async (req, res) => {
  console.log("Increment views part");
  console.log("tipId:", req.body);
  const {tipId} = req.body;
  if (!tipId) {
      return res.status(400).json({ message: "Tip Id is required" });
  }
  try {
      const data = await UserStatus.findOne({ _id: tipId });
      console.log("views", data)
      const views = data.views+1;

      const dataUpdated = await UserStatus.findOneAndUpdate(
        { _id: tipId },
        { $set: {views: views } },
        { new: true }
    ); 
      if (!dataUpdated) {
          return res.status(404).json({ message: "Data Not Found" });
      }
      res.json(dataUpdated);
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
};

const ratings = async (req, res) => {
  const { tipId, rating } = req.body; 
  const userId = req.user._id.toString();

  console.log(" from ratings", req.body);
  try {
      const userStatus = await UserStatus.findById(tipId);
      console.log("from rating controller",userStatus)

      if (!userStatus) {
          return res.status(404).json({ message: 'User status not found' });
      }

      const existingRatingIndex = userStatus.rating.findIndex(item => item.userId === userId);
      console.log("rating controller", existingRatingIndex);

      if (existingRatingIndex !== -1) {
          userStatus.rating[existingRatingIndex].rating = rating;
      } else {
          userStatus.rating.push({ userId, rating });
      }

      await userStatus.save();
      res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
      console.error('Error submitting rating:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { userStatusPost, getUserWorkingQuestions, updateApproval, updateWorkingQuestion, getTips, tipViews, ratings, getUserWorkingQuestionsAdmin };