import { Box } from "@mui/material";
import React from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";
import "./JobCard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};

const JobCard = ({ item, skillofUser, skillOfProject }) => {
  let score = 0;
  let projectScore = 0;

  const JobSkillset = item.SkillsRequired.split(",");

  JobSkillset.forEach((skill) => {
    if (skillofUser.toString().toLowerCase().includes(skill.toLowerCase())) {
      score = score + 1;
    }
  });

  JobSkillset.forEach((skill) => {
    if (skillOfProject.toString().toLowerCase().includes(skill.toLowerCase())) {
      projectScore = projectScore + 1;
    }
  });

  const skillMatchPercentage = Math.round((score / JobSkillset.length) * 100);
  const disableApplyButton = skillMatchPercentage < 25;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "1rem",
        border: "1px solid black",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "250px", 
      }}
    >
      <Box>
        <h3>
          {item.roleName
            ? item.roleName.length <= 14
              ? item.roleName
              : item.roleName.slice(0, 12) + "..."
            : ""}
          <span
            style={{
              width: "10px",
              height: "10px",
              background: item.isClosed ? "red" : "#03C988",
              borderRadius: "50%",
              display: "inline-block",
              marginLeft: "10px",
            }}
          ></span>
        </h3>
        <h4>
          {item.companyName
            ? item.companyName.length <= 14
              ? item.companyName
              : item.companyName.slice(0, 14) + "..."
            : ""}
        </h4>
      </Box>

      <p
        style={{
          color: skillMatchPercentage < 50 ? "red" : "#1A5D1A",
          fontWeight: 600,
        }}
      >
        {`${
          item.projectLevel
            ? Math.round((projectScore / JobSkillset.length) * 100)
            : skillMatchPercentage
        }% skill matches your skillset `}
      </p>

      <Box>
        <Box sx={centerItems}>
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
      </Box>

      <Box>
        <p style={{ color: "grey" }}>
          {`${
            item.appliedUsers.length !== 0
              ? item.appliedUsers.length + " Applications received"
              : "None applied"
          } `}
        </p>

        <Link
          to={`/user/jobs/${item._id}?disableApplyButton=${disableApplyButton}`}
        >
          <p>View</p>
        </Link>
      </Box>
    </Box>
  );
};

export default JobCard;
