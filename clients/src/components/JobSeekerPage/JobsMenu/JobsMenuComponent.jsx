import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddJobsUser } from "../../../redux/reducers/JobsUsers";

const JobsMenuComponent = () => {
  const allJobs = useSelector((state) => state.allJobsUser.value);

  const dispatch = useDispatch();
  const skillOfUser = useSelector((state) => state.skill.skills);
  const skills = skillOfUser.map((x) => x.skill);
  const userProject=useSelector((state)=>state.project.items)
  const skillOfProject=userProject.map((x)=>x.projectSkills)
  // const [Jobs, setJobs] = useState([]);
  // console.log(skills);
  // console.log(useSelector((state) => state));

  return (
    <Box
      sx={{
        margin: "1rem",
        backgroundColor: "white",
        minHeight: "80vh",
        borderRadius: "10px",
        padding: "1rem",
      }}
    >
      {allJobs.length === 0 ? (
        <p style={{fontSize:"24px",fontWeight:"bold"}}> We didn't find any matching jobs for your skills. Please ensure your profile (link to profile) lists all skills you have. Come back again as we will be adding jobs every day.</p>
      ) : (
        <Typography variant="h6">
          Jobs Based on your Skill
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {allJobs.map((item) => (
          <JobCard item={item} skillofUser={skills} key={item._id} skillOfProject={skillOfProject} />
        ))}
      </Box>
      {/* <JobCard /> */}
    </Box>
  );
};

export default JobsMenuComponent;
