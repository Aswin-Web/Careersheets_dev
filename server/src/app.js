require("dotenv").config();
const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const session = require("express-session");
var morgan = require("morgan");
const ejs = require("ejs");
const path = require("path");
// const __dirname=requiure()

// Authorisation Header Check
const { authenticateUser } = require("./utils/authorisation.header.check");

// Utils
const connectDB = require("./utils/connectDB");

//Passport

// Routes Import
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const googleAuthRoutes = require("./routes/googleauth.routes");
const CSVroutes = require("./routes/csv.routes");
const collegeAdminRouter = require("./routes/college.routes");
const collegeListRouter = require("./routes/collegeList.routes");
const platformAdminRoutes = require("./routes/platformAdmin.routes");
const resumeRoutes = require("./routes/resume.routes");
const recruiterRoutes = require("./routes/recruiter.routes");

const cors = require("cors");
const { SkillMatch } = require("./utils/skillmatch.utils");
const { connectElasticServer } = require("./utils/elastic.utils");
const app = express();

// Cookie-Parser

// MongoDB Connection String
connectDB();

// Elastic SERVER
// connectElasticServer()

app.use(express.json());

app.use(cookieParser());

app.use(morgan("tiny"));

// app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "../../clients/build")));

// app.get('*', (req, res) => {

// });

app.use(
  cors({
    origin: ["https://careersheets.netlify.app", "http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept"
  );
  next();
});

app.get("/newb", SkillMatch);
///COLLEGE LIST
app.use("/api/collegelist", collegeListRouter);

// PlatformAdmin
app.use("/api/admin", platformAdminRoutes);

// Create an CSV
app.use("/api/csv", CSVroutes);

// Authentication Routes
// app.use("/auth", authRoutes);

// Google SignUp
app.use("/api/auth/google", googleAuthRoutes);

// Recruiter Routes
app.use("/api/recruiter", recruiterRoutes);

////collegeadmin routes////
app.use("/api/collegeadmin", collegeAdminRouter);

// User Routes
app.use("/api/user", userRoutes);
// Resume generation Routes
app.use("/api/user/profile/generateresume", resumeRoutes);

app.use("*", (req, res, next) => {
  console.log("Could not match any Route");
  // return res.sendFile(path.resolve(__dirname, '../../clients/build', 'index.html'));
  res.status(500).json({ msg: "Something went wrong Routes" });
});

app.use((req, res) => {
  // if (err){

  //   console.log("Controller Error")
  // }
  res.status(500).json({ msg: "Something went wrong" });
});

// Elastic Initialization

app.get("/dev/es/install", async (req, res, next) => {
  try {
    await connectElasticServer();
    return res.status(200).json({ msg: "Elastic search Initialized" });
  } catch (error) {
    return res.status(400).json({ msg: "Elastic search Not Initialized" });
  }
});

//
module.exports = app;
