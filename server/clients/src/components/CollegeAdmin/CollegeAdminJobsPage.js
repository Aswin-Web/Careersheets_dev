import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Tooltip, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../config";
import { AddJobsUser } from "../../redux/reducers/JobsUsers";
import { skillActions } from "../../redux/reducers/Skill-data";
import MainNavigation from "./MainNavigation";
import JobCard from "./JobCard";

const CollegeAdminJobsPage = () => {
  const dispatch = useDispatch();
  const [jobs, setJob] = useState([])
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.value);

  const skillItems = useSelector((state) => state.skill.skills);
    console.log("skilsssssssss", skillItems)

    const sendRequest = async () => {
      try {
        const response = await axios.get(REACT_APP_SERVER_URL + "/user/jobs", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.jobs;
        setJob(data);
        dispatch(AddJobsUser(data));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    const sendRequestForSkills = async () => {
      try {
        const response = await axios.get(REACT_APP_SERVER_URL + "/collegeadmin/", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        if (data && Array.isArray(data.userSkills)) {
          dispatch(skillActions.replaceSkill(data.userSkills));
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
  
    useEffect(() => {
      Promise.all([sendRequest(), sendRequestForSkills()]).then(() => {
        setLoading(false); 
      });
    }, []);

  const calculateSkillMatch = (jobSkills) => {
    if (!jobSkills) return { percentage: 0, matchingUsers: [] };

    const requiredSkills = jobSkills.split(",").map((skill) => skill.trim().toLowerCase());
    const totalStudents = skillItems.length;

    let matchedUsers = [];

    requiredSkills.forEach((jobSkill) => {
      skillItems.forEach((student) => {
        if (student.skill.toLowerCase() === jobSkill) {
          matchedUsers.push(student.user); 
        }
      });
    });

    matchedUsers = [...new Set(matchedUsers)];
    const percentage = ((matchedUsers.length / totalStudents) * 100).toFixed(2);

    return { percentage, matchingUsers: matchedUsers };
  };


  return (
    <>
      <MainNavigation />
      <Box sx={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <CircularProgress />
          </Box>
        ) : jobs.length !== 0 ? (
          <Grid container spacing={3}>
            {jobs.map((job) => {
              const { percentage, matchingUsers } = calculateSkillMatch(job.SkillsRequired);
              return (
                <Grid item xs={12} md={4} key={job._id}>
                  <Tooltip
                    title={matchingUsers.length > 0 ? matchingUsers.join(", ") : "No matching students"}
                    arrow
                  >
                    <Box>
                      <JobCard job={job} percentage={percentage} />
                      <Typography variant="caption" sx={{ mt: 1 }}>
                        Skill Match: <span style={{ fontWeight: "bolder" }}>{percentage}%</span>
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center" }}>No job details found.</Typography>
        )}
      </Box>
    </>
  );
};

export default CollegeAdminJobsPage;