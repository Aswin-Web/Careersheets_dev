import { Box, Button, Typography } from "@mui/material";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};
const JobDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobbID = location.pathname.split("/").pop();
  const allJobs = useSelector((state) => state.allJobs.value);
  const currentJob = allJobs.filter((x) => x._id === jobbID);
  

  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      {( currentJob.length !==0 )  ? (
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
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{currentJob[0].roleName}</h3>
              <Button
                sx={{
                  color: "black",
                  border: "1px solid black",
                }}
                onClick={() => navigate(`/admin/edit/${currentJob[0]._id}`)}
              >
                Edit
              </Button>
            </Box>
            <h4>{currentJob[0].companyName}</h4>
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
              {new Date().toLocaleDateString()}
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
              <h4>Responaibilities : </h4>
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
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default JobDetails;
