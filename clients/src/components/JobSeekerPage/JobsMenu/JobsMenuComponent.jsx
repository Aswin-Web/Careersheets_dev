import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux"
import { AddJobsUser } from "../../../redux/reducers/JobsUsers";



const JobsMenuComponent = () => {
  const allJobs =useSelector(state=> state.allJobsUser.value)
  const dispatch=useDispatch()

  const [Jobs, setJobs] = useState([]);

  const NetworkRequest = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL + "/user/jobs"}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("user")
            .slice(1, localStorage.getItem("user").length - 1)}`,
        },
      }
    );
    
    dispatch(AddJobsUser(data.jobs));
  };

  useEffect(() => {
    
    NetworkRequest()
  }, []);

  return (
    <Box
      sx={{
        margin: "1rem",
        backgroundColor: "white",
        minHeight: "80vh",
        borderRadius: "10px",
        padding: "1rem",
        display:'flex',
        flexWrap:'wrap'
      }}
    >
      {allJobs.map(item => <JobCard item={item} />  )}
      {/* <JobCard /> */}
    </Box>
  );
};

export default JobsMenuComponent;
