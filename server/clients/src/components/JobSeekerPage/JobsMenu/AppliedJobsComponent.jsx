import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddJobsUser } from "../../../redux/reducers/JobsUsers";
import AppliedJobCard from "./AppliedJobCard";
import { REACT_APP_SERVER_URL } from "../../../config";
import { Container, Grid } from "@mui/material";

const AppliedJobsMenuComponent = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const sendRequest = async () => {
    const response = await axios
      .get(`${REACT_APP_SERVER_URL}/user/appliedjobs`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("user")
            .slice(1, localStorage.getItem("user").length - 1)}`,
        },
      })
      .catch((err) => console.log(err));
    const data = await response.data;
    console.log(data);
    setAppliedJobs([...data.jobs]);
    return data;
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const skillOfUser = useSelector((state) => state.skill.skills);
  const skills = skillOfUser.map((x) => x.skill);
  // const [Jobs, setJobs] = useState([]);
  // console.log(skills);
  // console.log(useSelector((state) => state));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h3"
          fontWeight="800"
          sx={{
            color: '#1e293b',
            letterSpacing: '-0.03em',
            mb: 1.5,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Applied Jobs
        </Typography>
        <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500, maxWidth: 800, mx: 'auto' }}>
          {appliedJobs.length === 0 ? (
            "You haven't applied for any jobs yet. Start exploring opportunities!"
          ) : (
            `You have applied for ${appliedJobs.length} positions.`
          )}
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {appliedJobs.map((item) => (
          <Grid item xs={12} sm={6} lg={4} key={item._id}>
            <AppliedJobCard item={item} skillofUser={skills} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AppliedJobsMenuComponent;
