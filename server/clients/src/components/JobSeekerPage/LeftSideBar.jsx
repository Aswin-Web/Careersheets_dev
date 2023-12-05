import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GradingIcon from "@mui/icons-material/Grading";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddApplication } from "../../redux/reducers/application.data";
import { AddJobsUser } from "../../redux/reducers/JobsUsers";
import { educationActions } from "../../redux/reducers/education-Data";
import { projectActions } from "../../redux/reducers/project-data";
import { skillActions } from "../../redux/reducers/Skill-data";
import { statusActions } from "../../redux/reducers/status-data";
import { roleActions } from "../../redux/reducers/role-data";

const sendRequest = async () => {
  const response = await axios
    .get(`${process.env.REACT_APP_SERVER_URL}/user/profile`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage
          .getItem("user")
          .slice(1, localStorage.getItem("user").length - 1)}`,
      },
    })
    .catch((err) => console.log(err));
  const data = await response.data;

  return data;
};

const LeftSideBar = () => {
  const data = useSelector((state) => state.application.value);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  // console.log(useSelector((state) => state))
  const [admin, setAdmin] = useState(false);

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

  const getJobs = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL + "/user/jobs"}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("user")
            .slice(1, localStorage.getItem("user").length - 1)}`,
        },
      }
    );

    dispatch(AddJobsUser(data.jobs));
  };

  useEffect(() => {
    getApplication();
    getJobs();
    sendRequest().then((data) => {
      let status = data.status;
      let details = data.education.reverse();
      let project = data.project.reverse();

      dispatch(educationActions.replaceEdu(details));
      dispatch(projectActions.replaceProject(project));
      dispatch(skillActions.replaceSkill(data.skill));
      dispatch(statusActions.changeStatus(status));
      dispatch(roleActions.changeRole(data.profileRole));
      if (data.role === "superuser") {
        setAdmin(true);
      }
    });
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
        <Link to="/user/applied" className="LinkAnchorTag">
          <Button variant="outlined" sx={ButtonStyles}>
            <DoneOutlineIcon />
            <Typography
              component="h6"
              sx={{ fontWeight: "bold", marginLeft: "7px" }}
            >
              Applied Jobs
            </Typography>
          </Button>
        </Link>
        {admin ? (
          <Link to="/admin/verify" className="LinkAnchorTag">
            <Button variant="outlined" sx={ButtonStyles}>
              <AdminPanelSettingsIcon />
              <Typography
                component="h6"
                sx={{ fontWeight: "bold", marginLeft: "7px" }}
              >
                Admin
              </Typography>
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
};

export default LeftSideBar;
