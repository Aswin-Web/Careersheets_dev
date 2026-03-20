import { Box, Stack, Tooltip, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddApplication } from "../../redux/reducers/application.data";
import { AddJobsUser } from "../../redux/reducers/JobsUsers";
import { educationActions } from "../../redux/reducers/education-Data";
import { projectActions } from "../../redux/reducers/project-data";
import { skillActions } from "../../redux/reducers/Skill-data";
import { statusActions } from "../../redux/reducers/status-data";
import { roleActions } from "../../redux/reducers/role-data";
import { REACT_APP_SERVER_URL } from "../../config";

// Icons
import DashboardIcon from "@mui/icons-material/GridView";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

const sendRequest = async () => {
  const response = await axios
    .get(`${REACT_APP_SERVER_URL}/user/profile`, {
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

const LeftSideBar = ({ isOpen, setIsOpen }) => {
  const data = useSelector((state) => state.application.value);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const [admin, setAdmin] = useState(false);
  const location = useLocation();

  const getApplication = useCallback(async () => {
    if (data.length === 0) {
      const { data } = await axios.get(
        `${REACT_APP_SERVER_URL}/user/application`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(AddApplication([...data]));
      return data;
    }
  }, [data.length, dispatch, token]);

  const getJobs = useCallback(async () => {
    const { data } = await axios.get(
      `${REACT_APP_SERVER_URL + "/user/jobs"}`,
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
  }, [dispatch]);

  useEffect(() => {
    getApplication();
    getJobs();
    sendRequest().then((data) => {
      if (data) {
        let status = data.status;
        let details = data.education ? data.education.reverse() : [];
        let project = data.project ? data.project.reverse() : [];

        dispatch(educationActions.replaceEdu(details));
        dispatch(projectActions.replaceProject(project));
        dispatch(skillActions.replaceSkill(data.skill));
        dispatch(statusActions.changeStatus(status));
        dispatch(roleActions.changeRole(data.profileRole));
        if (data.role === "superuser") {
          setAdmin(true);
        }
      }
    });
  }, [dispatch, getApplication, getJobs]);

  const navItems = [
    { path: "/user", icon: <DashboardIcon />, label: "Status" },
    { path: "/user/schdule", icon: <ScheduleIcon />, label: "Schedule" },
    { path: "/user/devstage", icon: <FavoriteBorderIcon />, label: "Wishlist" },
    { path: "/user/tips", icon: <AutoStoriesIcon />, label: "Feed" },
    { path: "/user/training", icon: <ModelTrainingIcon />, label: "Training" },
    { path: "/user/jobs", icon: <WorkOutlineIcon />, label: "Jobs" },
    { path: "/user/applied", icon: <CheckCircleOutlineIcon />, label: "Applied" },
  ];

  return (
    <Box
      sx={{
        width: isOpen ? 260 : 72,
        height: 'calc(100vh - 64px)',
        position: 'fixed',
        left: 0,
        top: 64,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        py: 3,
        bgcolor: "#ffffff", // White
        color: "#475569", // Slate
        zIndex: 1100,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowX: "hidden",
        borderRight: "1px solid #e2e8f0"
      }}
    >
      {isOpen && (
        <Box sx={{ width: '100%', px: 3, mb: 4 }}>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              color: "#1e293b",
              letterSpacing: "0.02em",
              textAlign: "center"
            }}
          >
            Dashboard
          </Typography>
        </Box>
      )}

      <Stack spacing={0.8} sx={{ width: '100%', px: 1.5 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/user' && location.pathname === '/user/');
          return (
            <Tooltip key={item.label} title={!isOpen ? item.label : ""} placement="right" arrow>
              <IconButton
                component={Link}
                to={item.path}
                sx={{
                  width: '100%',
                  justifyContent: isOpen ? "flex-start" : "center",
                  borderRadius: 10,
                  px: isOpen ? 2.5 : 0,
                  py: 1.4,
                  bgcolor: isActive ? 'rgba(21, 93, 252, 0.08)' : 'transparent',
                  color: isActive ? '#155dfc' : '#475569',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                    color: isActive ? '#155dfc' : '#1e293b',
                  },
                }}
              >
                {React.cloneElement(item.icon, {
                  sx: {
                    fontSize: 22,
                    minWidth: 22,
                    color: isActive ? "#155dfc" : "inherit"
                  }
                })}
                {isOpen && (
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 2.5,
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      whiteSpace: "nowrap",
                      opacity: 1,
                      transition: "opacity 0.2s ease"
                    }}
                  >
                    {item.label}
                  </Typography>
                )}
              </IconButton>
            </Tooltip>
          );
        })}

        {admin && (
          <>
            <Box sx={{ width: '80%', height: '1px', bgcolor: 'rgba(255, 255, 255, 0.1)', my: 1.5, mx: 'auto' }} />
            <Tooltip title={!isOpen ? "Admin" : ""} placement="right" arrow>
              <IconButton
                component={Link}
                to="/admin/verify"
                sx={{
                  width: '100%',
                  justifyContent: isOpen ? "flex-start" : "center",
                  borderRadius: 10,
                  px: isOpen ? 2.5 : 0,
                  py: 1.4,
                  color: location.pathname.startsWith('/admin') ? '#155dfc' : '#475569',
                  bgcolor: location.pathname.startsWith('/admin') ? 'rgba(21, 93, 252, 0.08)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)', color: '#1e293b' },
                }}
              >
                <AdminPanelSettingsIcon sx={{ fontSize: 22, minWidth: 22, color: location.pathname.startsWith('/admin') ? '#155dfc' : 'inherit' }} />
                {isOpen && (
                  <Typography variant="body2" sx={{ ml: 2.5, fontWeight: 500, fontSize: '0.95rem', whiteSpace: "nowrap" }}>
                    Admin Portal
                  </Typography>
                )}
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      {/* Collapse Toggle Button */}
      <Box sx={{ width: '100%', px: 1.5, pb: 2 }}>
        <Tooltip title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"} placement="right" arrow>
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              width: '100%',
              justifyContent: isOpen ? "flex-start" : "center",
              borderRadius: 10,
              px: isOpen ? 2.5 : 0,
              py: 1.2,
              color: '#94a3b8',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)', color: '#1e293b' }
            }}
          >
            {isOpen ? <MenuOpenIcon sx={{ fontSize: 22, minWidth: 22 }} /> : <MenuIcon sx={{ fontSize: 22, minWidth: 22 }} />}
            {isOpen && (
              <Typography variant="body2" sx={{ ml: 2.5, fontWeight: 500, fontSize: '0.9rem', whiteSpace: "nowrap" }}>
                Collapse
              </Typography>
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
