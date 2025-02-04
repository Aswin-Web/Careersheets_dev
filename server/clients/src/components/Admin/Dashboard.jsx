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
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "white",backgroundColor: "#11144C",width: "20%",}} onClick={() => navigate("/user")}> 
                Goto User Dashboard
            </Button>
            <Button
              variant="outlined"
              color="error" sx={{ width: "20%", }} onClick={() => navigate("/admin/verify")}>
              Verify CollegeAdmin
            </Button>
            <Button
              variant="outlined" color="error" onClick={() => navigate("/admin/verify/recruiter")} sx={{width: "20%",}}>
              Verify Recruiter
            </Button>
            <Button
              variant="outlined" color="error" onClick={() => navigate("/admin/verify/workingStatusAnswer")} sx={{width: "20%",}}>
              Verify Working Status
            </Button>
            <Button
              
              variant="outlined" color="error" onClick={() => navigate("/admin/new")} sx={{width: "20%",}}>
              New Job
            </Button>
            <Button
              
              variant="outlined" color="error" onClick={() => navigate("/admin/jobs")} sx={{width: "20%",}}>
              View Jobs
            </Button>

            <Button
              variant="outlined"
              color="error"  onClick={() => navigate("/admin/verify/certifications")} sx={{width: "20%",}}>
              Verify Certifications
            </Button>

            <Button
              variant="outlined" color="error" onClick={() => navigate("/admin/lastseen")} sx={{width: "20%",}}>
              View Last Seen
            </Button>

            <Button variant="outlined" color="error"
              sx={{ width: "20%",}}
              onClick={() => {localStorage.clear(); navigate("/");}}>
              Logout
            </Button>
            
            <Button variant="outlined" color="error" sx={{ width: "20%", }} onClick={() => {navigate("/admin/search"); }}>
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
