import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import BasicTable from "./Table";
import { Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { AddJobs } from "../../redux/reducers/AllJobDetails";
import { REACT_APP_SERVER_URL } from "../../config";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    NetworkRequest();
  }, []);
  const NetworkRequest = async () => {
    const { data } = await Axios.get(
      `${REACT_APP_SERVER_URL + "/admin/jobs"}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      }
    );
    dispatch(AddJobs(data.allJobs));
  };

  return (
    <div>
      <Helmet>
        <title>CareerSheets-Admin</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://yt3.googleusercontent.com/JSKcgbOwC9er1na2B_jWU9OsNfouSfm_bs1CASylTw9cHZEycRixrqpJIMoNoU7QpEtPPTWxysw=s176-c-k-c0x00ffffff-no-rj"
        />
      </Helmet>
      <Container>
        <Box
          sx={{
            margin: "1rem",
            gap: "1rem",
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(-1)}
            sx={{ marginBottom: "0.5rem" }}
          >
            Go Back
          </Button>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap", // Wrap buttons to the next line
              justifyContent: "center", // Center items horizontally
              gap: "0.5rem", // Add space between buttons
              marginBottom: "1rem", // Add margin bottom
            }}
          >
            <Button
              variant="outlined"
              sx={{
                // margin: "0 1rem",
                color: "white",backgroundColor: "#11144C",}} onClick={() => navigate("/user")}> 
                Goto User Dashboard
            </Button>
            <Button
              variant="outlined"
              color="error" sx={{ margin: "0 0.5rem" }} onClick={() => navigate("/admin/verify")}>
              Verify CollegeAdmin
            </Button>
            <Button
              variant="outlined" color="error" onClick={() => navigate("/admin/verify/recruiter")}>
              Verify Recruiter
            </Button>
            <Button
              variant="outlined" color="error" onClick={() => navigate("/admin/verify/workingStatusAnswer")}>
              Verify Working Status
            </Button>
            <Button
              sx={{ margin: "0 0.5rem" }}
              variant="outlined" color="error" onClick={() => navigate("/admin/new")}>
              New Job
            </Button>
            <Button
              sx={{ margin: "0 0.5rem" }}
              variant="outlined" color="error" onClick={() => navigate("/admin/jobs")}>
              View Jobs
            </Button>

            <Button
              sx={{ margin: "0 0.5rem" }}
              variant="outlined" color="error" onClick={() => navigate("/admin/lastseen")}>
              View Last Seen
            </Button>

            <Button variant="outlined" color="error"
              sx={{ padding:"0.5rem", margin:"1rem"}}
              onClick={() => {localStorage.clear(); navigate("/");}}>
              Logout
            </Button>
            
            <Button variant="outlined" color="error" sx={{ padding:"0.5rem", margin:"1rem" }} onClick={() => {navigate("/admin/search"); }}>
              Search
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            minHeight: "80vh",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
