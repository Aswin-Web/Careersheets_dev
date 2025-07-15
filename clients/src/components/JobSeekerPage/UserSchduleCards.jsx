import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import LanguageIcon from "@mui/icons-material/Language";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
const Cards = (props) => {
  const {
    author,
    company,
    createdAt,
    designation,
    joblink,
    location,
    status,
    updatedAt,
    whereApply,
    _id,
  } = props.info;
  
  let ApplyDate = new Date(createdAt).toLocaleDateString()
  let d = new Date();
  const [time, settime] = useState({ hour: d.getHours(), min: d.getMinutes() });

  return (
    <div>
      <Box
        sx={{
          margin: "10px 0",
          minHeight: "20vh",
          width: "80%",
          margin: "auto",
          backgroundColor: "#2b3467",
          borderRadius: "7px",
          boxShadow: "5px 5px 10px #2C3333",
          border: "5px solid #f9d923",
        }}
      >
        <Box
          sx={{
            padding: "3%",
            height: "100%",
            color: "white",
          }}
        >
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                color: "white",
              }}
            >
              <AppRegistrationIcon />
            </Button>
          </Box> */}
          <Box
            sx={{
              height: "25%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6">
                <ApartmentIcon /> {company}
              </Typography>
              <Typography variant="subtitle1">
                <LocationOnIcon />
                {location}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              height: "30%",
              padding: "0 10px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box>
              <Typography variant="subtitle1">
                Designation: {designation}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography variant="subtitle1">Application Link:</Typography>
                <a
                  className="linktag"
                  rel="noopener noreferrer"
                  href={joblink}
                  target="_blank"
                >
                  <LanguageIcon />
                </a>
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle1">Date: {ApplyDate}</Typography>
              <Typography variant="subtitle1">Origin: {whereApply}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "10px",
              height: "30%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                flex: 1,
                width: "100%",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bolder",
                }}
              >
                {`Round: ${status[status.length - 1].round} ${
                  status[status.length - 1].interviewType
                }`}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#11144C",
                  border: "5px Solid #f9d923",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{ fontWeight: "bolder" }}
                  >
                    Interview Date
                  </Typography>

                  <Typography
                    component="h1"
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    {new Date(
                      status[status.length - 1].date
                    ).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <br />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Cards;
