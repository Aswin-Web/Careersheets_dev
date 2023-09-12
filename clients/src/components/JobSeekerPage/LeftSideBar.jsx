import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GradingIcon from "@mui/icons-material/Grading";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddApplication } from "../../redux/reducers/application.data";

const LeftSideBar = () => {
  const data = useSelector((state) => state.application.value);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const getApplication = async () => {
    if (data.length === 0) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/application`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(AddApplication([...data]));

      return await data;
    }
    return;
  };
  useEffect(() => {
    getApplication();
    return;
  }, []);

  const ButtonStyles = {
    margin: "10px",
    color: "white",
    display: "flex",
    width: "85%",
    justifyContent: "flex-start",
    textDecoration: "none",
  };
  return (
    <div className="LeftSide">
      <Typography
        variant="h5"
        sx={{
          padding: "5%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <Link to="/user" className="LinkAnchorTag">
          <Button variant="outlined" sx={ButtonStyles}>
            <MoreHorizIcon />
            <Typography
              component="h6"
              sx={{
                fontWeight: "bold",
                marginLeft: "7px",
                textTransform: "capitalize",
              }}
            >
              Application Status
            </Typography>
          </Button>
        </Link>
        <Link to="/user/schdule" className="LinkAnchorTag">
          <Button variant="outlined" sx={ButtonStyles}>
            <ScheduleIcon />
            <Typography
              component="h6"
              sx={{ fontWeight: "bold", marginLeft: "7px" }}
            >
              Schedule
            </Typography>
          </Button>
        </Link>
        <Link to="/user/devstage" style={{ textDecoration: "none" }}>
          <Button variant="outlined" sx={ButtonStyles}>
            <FavoriteBorderIcon />
            <Typography
              component="h6"
              sx={{ fontWeight: "bold", marginLeft: "7px" }}
            >
              Wishlist
            </Typography>
          </Button>
        </Link>
        <Link to="/user/devstage" style={{ textDecoration: "none" }}>
          <Button variant="outlined" sx={ButtonStyles}>
            <GradingIcon />
            <Typography
              component="h6"
              sx={{ fontWeight: "bold", marginLeft: "7px" }}
            >
              Feed
            </Typography>
          </Button>
        </Link>
        <Link to="/user/training" className="LinkAnchorTag">
          <Button variant="outlined" sx={ButtonStyles}>
            <VideoLibraryIcon />
            <Typography
              component="h6"
              sx={{ fontWeight: "bold", marginLeft: "7px" }}
            >
              Training
            </Typography>
          </Button>
        </Link>
        <Link to="/user/jobs" className="LinkAnchorTag">
          <Button variant="outlined" sx={ButtonStyles}>
            <WorkOutlineIcon />
            <Typography
              component="h6"
              sx={{ fontWeight: "bold", marginLeft: "7px" }}
            >
              Jobs
            </Typography>
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default LeftSideBar;
