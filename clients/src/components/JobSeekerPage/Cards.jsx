import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import LanguageIcon from "@mui/icons-material/Language";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Popup from "./Utils/PopupStatus";
import AddStatus from "./Utils/AddStatus";
import BasicTable from "./Utils/Table";
import { useState } from "react";

const Cards = (props) => {
  const [opentable,setOpentable]=useState(false)
  const {
    _id,

    author,

    status,

    company,

    location,

    designation,

    whereApply,

    joblink,

    updatedAt,
  } = props.data;


  let finalStatus;
  let color = "grey";
  if (status.length !== 0) {
    finalStatus = status[status.length - 1];
    if (finalStatus.status === "Cleared") {
      color = "#FF8006";
    }
    if (finalStatus.status === "Rejected") {
      color = "#FF6464";
    }
    if (finalStatus.status === "Pending") {
      color = "#F9D923";
    }
    if (finalStatus.status === "Selected") {
      color = "#49FF00";
    }
  }

  const date = new Date(updatedAt);

  return (
    <>
      <Box
        className=""
        sx={{
          marginTop: "25px",
          padding: "10px 0",
          minHeight: "10vh",
          width: "100%",
          backgroundColor: "#2b3467",
          borderRadius: "7px",
          boxShadow: "5px 5px 10px #2C3333",
          border: `5px solid ${color}`,
        }}
      >
        <Box
          sx={{
            padding: "3%",
            height: "100%",
            color: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <ApartmentIcon />
                &nbsp;{company}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <LocationOnIcon />
                &nbsp;{location}
              </Typography>
            </Box>
            <Box>
              <Popup
                content={<EditIcon />}
                info={{ _id, author, finalStatus }}
                title="Edit Post"
              />
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
                Designation : {designation}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  Link &nbsp;
                  <LanguageIcon /> &nbsp;:
                </Typography>
                <a
                  className="linktag"
                  rel="noopener noreferrer"
                  href={joblink}
                  target="_blank"
                >
                  &nbsp; Click here
                </a>
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle1">
                Last Updated: {date.toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle1">Origin: {whereApply}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "10px",
              height: "20%",
            }}
          >
            <Typography variant="h5">
              {status.length !== 0
                ? `Round:${finalStatus.round} ${finalStatus.interviewType} ${finalStatus.status}`
                : `Click the pencil icon to add the status`}
            </Typography>
            <Typography variant="subtitle1">
              Click View button to see more details...
            </Typography>
          </Box>
          <Box
            sx={{
              height: "25%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#E93B81",

                "&:hover": {
                  backgroundColor: "#E93B81",
                },
              }}
              onClick={() => setOpentable(!opentable)}
            >
              <VisibilityIcon sx={{ padding: "0 5px" }} />
              {opentable ? "Hide" : "View"}
            </Button>
            <Typography
              variant="subtitle1"
              sx={{
                backgroundColor: `${color}`,
                padding: "8px",
                borderRadius: "7px",
                color:'black',
              }}
            >
              {status.length !== 0 ? `Status: ${finalStatus.status}` : "None"}
            </Typography>
          </Box>
          {/* Table in the Card */}
          <BasicTable status={status} view={opentable} application_id={_id} />
        </Box>
      </Box>
    </>
  );
};

export default Cards;
