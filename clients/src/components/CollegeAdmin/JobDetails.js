import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { WhatsApp, ContentCopy } from "@mui/icons-material";
import { WhatsappShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MainNavigation from "./MainNavigation";

import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../config";
import { AddJobsUser } from "../../redux/reducers/JobsUsers";

const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobs, setJob] = useState([]);
  const token = useSelector((state) => state.auth.value);
  const skillItems = useSelector((state) => state.skill.skills);
  console.log("skilsssssssss", skillItems)
  const dispatch = useDispatch();

  const sendRequest = async () => {
    const response = await axios.get(REACT_APP_SERVER_URL + "/user/jobs", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data.jobs;
    console.log("sdattaa", data);
    setJob(data);
    dispatch(AddJobsUser(data));
    return data;
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const allJobs = useSelector((state) => state.allJobsUser.value);
  const job = allJobs.find((job) => job._id === id);

  const generateJobUrl = (jobId) => {
    const baseUrl = "https://www.app.careersheets.in/college/jobs/";
    return baseUrl + jobId;
  };

  const handleCopy = () => {
    toast("Copied to Clipboard");
  };

  return (
    <>
      <MainNavigation />
      {job && (
        <Paper
          elevation={3}
          sx={{
            padding: "2rem",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <Box>
              <Button
                variant="contained"
                onClick={() => navigate("/collegeadmin/jobs")}
              >
                Back
              </Button>
            </Box>

            <Box >
              <WhatsappShareButton url={generateJobUrl(job?._id)}>
                <Tooltip title="Share on WhatsApp">
                  <WhatsApp />
                </Tooltip>
              </WhatsappShareButton>
                <CopyToClipboard text={generateJobUrl(job?._id)}>
                  <Tooltip title="Copy URL">
                    <ContentCopy sx={{marginLeft:"2rem"}} />
                  </Tooltip>
                </CopyToClipboard>
            </Box>
          </div>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {job.companyName}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={centerItems}>
                  <WorkOutlineIcon />
                  <Typography variant="body1">
                    {job.experience} years
                  </Typography>
                </Box>
                <Box sx={centerItems}>
                  <CurrencyRupeeIcon />
                  <Typography variant="body1">{job.salary}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={centerItems}>
                  <ApartmentIcon />
                  <Typography variant="body1">{job.location}</Typography>
                </Box>
                <Box sx={centerItems}>
                  <DateRangeIcon />
                  <Typography variant="body1">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ margin: "1.5rem 0" }} />

            <Box sx={{ marginBottom: "1.5rem" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                About Us
              </Typography>
              <Typography variant="body1">{job.companyDescription}</Typography>
            </Box>

            <Box sx={{ marginBottom: "1.5rem" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Job Description
              </Typography>
              <Typography variant="body1">{job.JobDescription}</Typography>
            </Box>

            <Box sx={{ marginBottom: "1.5rem" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Responsibilities
              </Typography>
              <Typography variant="body1">{job.Responsibilites}</Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Role:</strong> {job.roleName}
                </Typography>
                <Typography variant="body1">
                  <strong>Industry Type:</strong> {job.IndustryType}
                </Typography>
                <Typography variant="body1">
                  <strong>Department:</strong> {job.departmentType}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Employment Type:</strong> {job.employmentType}
                </Typography>
                <Typography variant="body1">
                  <strong>Education:</strong> {job.education}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      )}
      <ToastContainer />
    </>
  );
};

export default JobDetails;
