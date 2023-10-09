import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Axios from "axios";
import { AddJobs } from "../../redux/reducers/AllJobDetails";
import { Link } from "react-router-dom";

const AllJobsSection = () => {
  const allJobs = useSelector((state) => state.allJobs.value);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("Working")
  //   NetworkRequest();
  // },[]);
  // const NetworkRequest = async () => {
  //   const { data } = await Axios.get(
  //     `${process.env.REACT_APP_SERVER_URL + "/admin/jobs"}`,
  //     {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("admin")}`,
  //       },
  //     }
  //   );
  //   console.log(data.allJobs)
  //   dispatch(AddJobs(data.allJobs));
  // };

  const centerItems = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px",
    margin: "0.5rem 0",
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          margin: "1rem",
          fontWeight: "600",
        }}
      >
        The Applications You have Created
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {allJobs.length !== 0 ? (
          allJobs.map((item, index) => (
            <Box
              key={Math.random() * 0.9999}
              sx={{
                backgroundColor: "white",
                padding: "1rem",
                border: "1px solid black",
                display: "inline-block",
                margin: "1rem",
                borderRadius: "10px",
              }}
            >
              {/* Heading */}
              <Box>
                <h3>
                  {" "}
                  {item.roleName ? item.roleName: ""}{" "}
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      background: `${item.isClosed ? "red" : "#03C988"}`,
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></div>
                </h3>
                <h4>{item.companyName}</h4>
              </Box>
              {/* Horizontal Columns */}
              <Box>
                <Box sx={centerItems}>
                  {" "}
                  <WorkOutlineIcon /> {item.experience} years
                </Box>
                <Box sx={centerItems}>
                  <CurrencyRupeeIcon />
                  {item.salary}
                </Box>
              </Box>
              <Box sx={centerItems}>
                <ApartmentIcon />
                {item.location}
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
                  {new Date(item.createdAt).toLocaleDateString()}
                </Box>
                <Box>
                  <Link to={`/admin/jobs/${item._id}`}>
                    <Button>View</Button>
                  </Link>
                </Box>
              </Box>
              <Box>
                <p style={{ color: "grey" }}>
                  {`${
                    item.appliedUsers.length !== 0
                      ? item.appliedUsers.length + " Applications received"
                      : "None applied"
                  } `}
                </p>
              </Box>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default AllJobsSection;
