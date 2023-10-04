import { Avatar, Box, Button, Typography } from "@mui/material";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { green } from "@mui/material/colors";
import axios from "axios";

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
  let currentJob = allJobs.filter((x) => x._id === jobbID);
  let applied = [];
  if (currentJob.length !== 0) {
    let a = currentJob[0].appliedUsers;
    let b = [...a];
    applied = b.reverse();
  }
console.log(currentJob)
  return (
    <Box display={{ display: "flex", flexDirection: "row-reverse" }}>
      <Box
        sx={{
          width: "25%",
          Height: "80vh",
          margin: "1rem",
          padding: "0.5rem",
          border: "1px solid black",
          borderRadius: "10px",
        }}
      >
        <h3>Applied Users</h3>
        <Box
          sx={{
            padding: "1rem",
          }}
        >
          {currentJob[0] !== undefined ? (
            applied.map((item, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent:'space-between',
                  alignItems: "center",
                  border: "1px solid black ",
                  padding: "0.5rem",
                  borderRadius: "10px",
                  marginBottom: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    width: "30%",
                  }}
                >
                  <Avatar
                    alt={item.userId.name}
                    src={item.userId.displayPicture}
                  />
                </Box>
                <Box
                  sx={{
                    width: "70%",
                  }}
                >
                  <h6
                    style={{
                      fontSize: "1rem",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <Link
                      to={`/admin/profile/resume/${currentJob[0]._id}/${item.userId._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={()=>{
                        if (!item.isViewed){
                          const pageViewed=async ()=>{
                            const response = await axios
                              .post(`${process.env.REACT_APP_SERVER_URL}/admin/user/view`,
                              {
                                userId:item.userId._id,
                                jobId:currentJob[0]._id
                              }, {
                                headers: {
                                  "Content-type": "application/json",
                                  Authorization: `Bearer ${localStorage.getItem("admin")}`,
                                },
                              })
                              .catch((err) => console.log(err));
                            
                          }
                          pageViewed()
                        }
                      }}
                    >
                      {item.userId.name.slice(0, 7)}....
                    </Link>
                  </h6>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                  {/* {item.isWishlisted ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "red" }} />
                  )} */}

                  {item.isViewed ? <DoneIcon sx={{ color: "green" }} /> : <></>}

                  {/* <DoneIcon sx={{ color: "green" }} /> */}
                  {/* <FavoriteBorderIcon sx={{ color: "red" }} /> */}
                </Box>
              </Box>
            ))
          ) : (
            <p> None applied </p>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          padding: "1rem",
          width: "75%",
          minHeight: "80vh",
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
                <Typography variant="p">
                  {" "}
                  {currentJob[0].IndustryType}
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
    </Box>
  );
};

export default JobDetails;
