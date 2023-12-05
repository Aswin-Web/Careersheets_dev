import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddJobsUser } from "../../../redux/reducers/JobsUsers";
import AppliedJobCard from "./AppliedJobCard";

const AppliedJobsMenuComponent = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const sendRequest = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/appliedjobs`, {
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
    <Box>
      <Box
        sx={{
          margin: "1rem",
          backgroundColor: "white",
          minHeight: "80vh",
          borderRadius: "10px",
          padding: "1rem",
        }}
      >
        <Typography variant="h6">
          Applied Jobs
        </Typography>
        {appliedJobs.length === 0 ? (
          <p>You Have not applied for any jobs</p>
        ) : (
          <p></p>
        )}
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {appliedJobs.map((item) => (
            <AppliedJobCard item={item} skillofUser={skills} key={item._id} />
          ))}
        </Box>
        {/* <JobCard /> */}
      </Box>
    </Box>
  );
};

export default AppliedJobsMenuComponent;
