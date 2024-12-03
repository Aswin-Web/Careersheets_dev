import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";
import './JobCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewJobApplications from "./ViewJobApplications";


const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};

const JobCard = ({ item, skillofUser, skillOfProject }) => {
  console.log(item);
  const [acquiredScore, setScore] = useState(0);

  let score = 0;
  let SkillMatch;
  let projectScore = 0;
  // console.log(skillofUser,skillofUser.toString().match(/Jython/i))
  const JobSkillset = item.SkillsRequired.split(",");

  // const JobSkillset = ["c++", "java", "python","c++"];
  SkillMatch = JobSkillset.map((skill) => {
    if (skillofUser.toString().toLowerCase().includes(skill.toLowerCase())) {
      score = score + 1;
    }
  });

  const projectMatch = JobSkillset.map((skill) => {
    if (skillOfProject.toString().toLowerCase().includes(skill.toLowerCase())) {
      projectScore = projectScore + 1;
    }
  })

  if (score > 0) {
    let acquiredPercentage = (score / JobSkillset.length) * 100;
    // setScore(acquiredPercentage)
  }
  console.log(score);
  console.log(projectScore);
  console.log(item.projectLevel);

  // Calculate the percentage of skill match
  const skillMatchPercentage = Math.round((score / JobSkillset.length) * 100);

  // Disable apply button if skill match percentage is less than 25%
  const disableApplyButton = skillMatchPercentage < 25;

  //console.log("disable apply button", disableApplyButton);

  return (
    <div>
      <div className="container mt-4">
      <div className="row">
        <div className="col">
          <Box
            key={Math.random() * 0.9999}
            sx={{
              backgroundColor: "white",
              padding: "1rem",
              border: "1px solid black",
              borderRadius: "10px",
              width: "100%",
            }}
      >
        {/* Heading */}
        <Box sx={{}}>
          <h3> 
            {" "}
            {item.roleName
              ? item.roleName.length <= 14
                ? item.roleName
                : item.roleName.slice(0, 12) + "..."
              : ""}{" "}
            <div
              style={{
                width: "10px",
                height: "10px",
                background: `${item.isClosed ? "red" : "#03C988"}`,
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></div>
          </h3>
          <h4>
            {item.companyName
              ? item.companyName.length <= 14
                ? item.companyName
                : item.companyName.slice(0, 14) + "..."
              : ""}{" "}
          </h4>
        </Box>
        <p style={{ color: "#1A5D1A", fontWeight: 600 }}>{`${
          item.projectLevel
            ? Math.round((projectScore / JobSkillset.length) * 100)
            : Math.round((score / JobSkillset.length) * 100)
        }% skill matches your skillset `}</p>
        {/* Horizontal Columns */}
        <Box>
          <Box sx={centerItems}>
            {" "}
            <WorkOutlineIcon /> {item.experience} years
          </Box>
          <Box sx={centerItems}>
            <CurrencyRupeeIcon />
            {item.salary}
          </Box>
        </Box>
        <Box sx={centerItems}>
          <ApartmentIcon />
          {item.location}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0.5rem 0",
            alignItems: "center",
          }}
        >
          <Box sx={centerItems}>
            <DateRangeIcon />
            {new Date(item.createdAt).toLocaleDateString()}
          </Box>

          <Box></Box>
        </Box>

        <Box>
          <p style={{ color: "grey" }}>
            {`${
              item.appliedUsers.length !== 0
                ? item.appliedUsers.length + "Applications received"
                : "None applied"
            } `}
          </p>  
                    
          {/* <Link to={`/user/jobs/${item._id}`}>
            <p>View</p>
          </Link> */}

          <Link to={`/user/jobs/${item._id}?disableApplyButton=${disableApplyButton}`}>
            <p>View</p>
          </Link>
        </Box>
      </Box>
    </div>
    </div>
    </div>
    </div>
  );
};

export default JobCard;
