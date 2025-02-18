import { Box, Typography, Grid  } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddJobsUser } from "../../../redux/reducers/JobsUsers";

const JobsMenuComponent = () => {
  const allJobs = useSelector((state) => state.allJobsUser.value);
  console.log("Jobs", allJobs);

  const skillItems = useSelector((state) => state.skill.skills);

  console.log("skills from jobs menu", skillItems);

  const dispatch = useDispatch();
  const skillOfUser = useSelector((state) => state.skill.skills);
  const skills = skillOfUser.map((x) => x.skill);
  const userProject = useSelector((state) => state.project.items);
  const skillOfProject = userProject.map((x) => x.projectSkills);
  // const [Jobs, setJobs] = useState([]);
  // console.log(skills);
  // console.log(useSelector((state) => state));

  return (
    <Box
      sx={{
        margin: "0.5rem",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "1rem",
      }}
    >
      {allJobs.length === 0 ? (
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {" "}
          We didn't find any matching jobs for your skills. Please ensure your
          profile (link to profile) lists all skills you have. Come back again
          as we will be adding jobs every day.
        </p>
      ) : (
        <Typography variant="h6">Jobs Based on your Skill</Typography>
      )}

      <Grid container spacing={2} style={{marginTop:"1rem"}}>
        {allJobs.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <JobCard
              item={item}
              skillofUser={skills}
              skillOfProject={skillOfProject}
            />
          </Grid>
        ))}
      </Grid>

      {/* <JobCard /> */}
    </Box>
  );
};

export default JobsMenuComponent;
