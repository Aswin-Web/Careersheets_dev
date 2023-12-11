import { Box, Button, Typography } from "@mui/material";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AddSingleApplication } from "../../../redux/reducers/application.data";
import { removeAJob } from "../../../redux/reducers/JobsUsers";
import { REACT_APP_SERVER_URL } from "../../../config";

const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};
const ViewJobApplications = () => {
  const [views, setviews] = useState(0);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const jobbID = location.pathname.split("/").pop();
  const allJobs = useSelector((state) => state.allJobsUser.value);
  const currentJob = allJobs.filter((x) => x._id === jobbID);
  const newState = useSelector((state) => state);

  console.log(useSelector((state) => state));

  const saveApplyHistory = async () => {
    const data = await axios.get(
      `${
        REACT_APP_SERVER_URL + `/user/history/${currentJob[0]._id}`
      }`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("user")
            .slice(1, localStorage.getItem("user").length - 1)}`,
        },
      }
    );
    console.log(data);
    setviews(data.data.views);
  };

  useEffect(() => {
    saveApplyHistory();
  }, []);

  const handleApply = async () => {
    const data = await axios.get(
      `${REACT_APP_SERVER_URL + `/user/jobs/${currentJob[0]._id}`}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("user")
            .slice(1, localStorage.getItem("user").length - 1)}`,
        },
      }
    );
    if (data.status === 200) {
      console.log(data.data.newApplication, newState);
      dispatch(AddSingleApplication(data.data.newApplication));
      dispatch(removeAJob(currentJob[0]._id));
      navigate("/user");
    }
  };

  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      {currentJob.length !== 0 ? (
        <Box
          sx={{
            backgroundColor: "white",
            padding: "1rem",
            border: "1px solid black",

            margin: "1rem",
            borderRadius: "10px",
          }}
        >
          {/* Heading */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h4>{currentJob[0].companyName}</h4>
            <Box>
              <p style={{ color: "grey" }}>{`${views} Views`}</p>
            </Box>
          </Box>
          {/* Horizontal Columns */}
          <Box>
            <Box sx={centerItems}>
              {" "}
              <WorkOutlineIcon />
              {currentJob[0].experience} years
            </Box>
            <Box sx={centerItems}>
              <CurrencyRupeeIcon />
              {currentJob[0].salary}
            </Box>
          </Box>
          <Box sx={centerItems}>
            <ApartmentIcon />
            {currentJob[0].location}
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
              {new Date(currentJob[0].createdAt).toLocaleDateString()}
            </Box>
            {/* <Box>
            <Button>View</Button>
          </Box> */}
          </Box>
          {/* About Us */}
          <Box>
            <h3>About Us</h3>
            <br />
            <p>{currentJob[0].companyDescription}</p>
            <br />
          </Box>
          {/* Job Description */}
          <Box>
            <h3>Job Description</h3>
            <br />
            <p>{currentJob[0].JobDescription}</p>
            <br />

            <br />
            <Box>
              <h4>Responsibilities : </h4>
              <p> {currentJob[0].Responsibilites}</p>
            </Box>
            <br />
            <Box>
              <Typography
                sx={{
                  display: "inline-block",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Skills :{" "}
              </Typography>
              <Typography variant="p">
                {" "}
                {currentJob[0].SkillsRequired}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  display: "inline-block",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Role :{" "}
              </Typography>
              <Typography variant="p"> {currentJob[0].roleName}</Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  display: "inline-block",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Industry Type :{" "}
              </Typography>
              <Typography variant="p"> {currentJob[0].IndustryType}</Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  display: "inline-block",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Department :{" "}
              </Typography>
              <Typography variant="p">
                {currentJob[0].departmentType}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  display: "inline-block",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Employment Type:
              </Typography>
              <Typography variant="p">
                {" "}
                {currentJob[0].employmentType}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  display: "inline-block",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Education UG:
              </Typography>
              <Typography variant="p"> {currentJob[0].education}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                color: "black",
                border: "1px solid black",
                backgroundColor: "#27E1C1",
                display: `${alert ? "none" : "block"}`,
              }}
              onClick={() => setAlert(!alert)}
            >
              Apply for this Job
            </Button>
            <Box sx={{ display: `${alert ? "block" : "none"}` }}>
              <p>Are you sure you want to apply?</p>
              <Button
                sx={{
                  color: "black",
                  border: "1px solid black",
                  backgroundColor: "#27E1C1",
                  margin: "0 1rem",
                }}
                onClick={handleApply}
              >
                Apply
              </Button>
              <Button
                sx={{
                  color: "black",
                  border: "1px solid black",
                  backgroundColor: "#27E1C1",
                }}
                onClick={() => setAlert(!alert)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ViewJobApplications;
