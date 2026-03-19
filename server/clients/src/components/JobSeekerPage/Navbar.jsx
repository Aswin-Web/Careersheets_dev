import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Tooltip, Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import ShareIcon from "@mui/icons-material/Share";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../../hooks/auth";
import "./main.css";
import icon from "../../images/Careersheets-logo.png";
import { REACT_APP_FORM_LINK } from "../../config";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";

import {
  Dashboard as DashboardIcon,
  Schedule,
  FavoriteBorder,
  AutoStories,
  ModelTraining,
  WorkOutline,
  CheckCircleOutline,
  AdminPanelSettings,
  AddCircleOutline as AddCircleOutlineIcon,
} from "@mui/icons-material";
import Popup from "./Utils/Popup";
import AddApplication from "./AddApplication";

const drawerWidth = 240;

export default function DrawerAppBar(props) {
  const { window } = props;
  const { displayPicture } = UseAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const role = useSelector((state) => {
    try {
      return jwt(state.auth.value).role;
    } catch (e) {
      return "user";
    }
  });

  const baseNavItems = [
    { path: "/user/", name: "Application Status", icon: <DashboardIcon /> },
    { path: "/user/schdule", name: "Interview Schedule", icon: <Schedule /> },
    { path: "/user/devstage", name: "Wishlist", icon: <FavoriteBorder /> },
    { path: "/user/tips", name: "Feed", icon: <AutoStories /> },
    { path: "/user/training", name: "Training", icon: <ModelTraining /> },
    { path: "/user/jobs", name: "Jobs", icon: <WorkOutline /> },
    { path: "/user/applied", name: "Applied Jobs", icon: <CheckCircleOutline /> },
  ];

  const navItems = [...baseNavItems];

  if (role === "superuser") {
    navItems.push({ path: "/admin/verify", name: "Admin Portal", icon: <AdminPanelSettings /> });
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          color: "#475569",
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 }, minHeight: 64 }}>
          {/* Logo Section (Left) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar src={icon} sx={{ width: 32, height: 32 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
                letterSpacing: "-0.5px",
                display: { xs: "none", sm: "block" }
              }}
            >
              CareerSheets
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Action Cluster (Desktop Only) */}
          <Stack direction="row" spacing={4} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
            {/* Nav Links Desktop */}
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                component={Link}
                to="/user/devstage"
                startIcon={<ShareIcon />}
                sx={{
                  color: "#64748b",
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { color: '#155dfc', bgcolor: 'transparent' }
                }}
              >
                Refer
              </Button>
              <Button
                href={REACT_APP_FORM_LINK}
                target="_blank"
                rel="noreferrer"
                startIcon={<HelpCenterIcon />}
                sx={{
                  color: "#64748b",
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { color: '#155dfc', bgcolor: 'transparent' }
                }}
              >
                Help
              </Button>
            </Box>

            {/* Profile Cluster Desktop */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Profile">
                <Box
                  component={Link}
                  to="/user/profile"
                  sx={{
                    p: '2px',
                    borderRadius: '50%',
                    border: '2px solid transparent',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: '#155dfc' }
                  }}
                >
                  <Avatar src={displayPicture} sx={{ width: 34, height: 34 }} />
                </Box>
              </Tooltip>
              <Tooltip title="Sign Out">
                <IconButton
                  component={Link}
                  to="/logout"
                  sx={{
                    color: "#64748b",
                    '&:hover': { color: '#f87171', bgcolor: 'rgba(248, 113, 113, 0.08)' }
                  }}
                >
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Mobile Menu Icon (Right Side) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          <Box
            onClick={handleDrawerToggle}
            sx={{
              textAlign: "left",
              backgroundColor: "#ffffff",
              color: "#475569",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              pt: 1,
              borderRight: "1px solid #e2e8f0"
            }}
          >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
              <Avatar src={icon} sx={{ width: 32, height: 32 }} />
              <Typography variant="h6" fontWeight="bold" color="#1e293b">
                CareerSheets
              </Typography>
            </Box>
            <Divider sx={{ mb: 1, bgcolor: '#f1f5f9', flexShrink: 0 }} />

            {/* Scrollable Navigation Items */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
              <List>
                {navItems.map((item) => (
                  <ListItem key={item.name} disablePadding>
                    <ListItemButton
                      component={NavLink}
                      to={item.path}
                      end={item.path === '/user/' || item.path === '/user'}
                      sx={{
                        py: 1.5,
                        px: 2.5,
                        color: '#64748b',
                        "&.active": {
                          backgroundColor: "rgba(21, 93, 252, 0.08)",
                          color: "#155dfc",
                          "& .MuiListItemIcon-root": { color: "#155dfc" }
                        },
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)", color: "#1e293b" },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <ListItem disablePadding sx={{ display: { md: 'none' } }}>
                  <Popup
                    content={
                      <ListItemButton sx={{ py: 1.5, px: 2.5, width: '100%' }}>
                        <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                          {/* <AddCircleOutlineIcon /> */}
                        </ListItemIcon>
                        {/* <ListItemText primary="Create Application" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} /> */}
                      </ListItemButton>
                    }
                    body={<AddApplication />}
                    titles={"Create New Application"}
                  />
                </ListItem>
              </List>
            </Box>

            {/* Fixed Footer Actions */}
            <Box sx={{ flexShrink: 0, borderTop: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
              <List sx={{ pb: 0 }}>
                <ListItem disablePadding sx={{ display: { md: 'none' } }}>
                  <ListItemButton component={Link} to="/user/profile" sx={{ py: 1.5, px: 2.5 }}>
                    <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                      <Avatar src={displayPicture} sx={{ width: 24, height: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: { md: 'none' } }}>
                  <ListItemButton component={Link} to="/user/devstage" sx={{ py: 1.5, px: 2.5 }}>
                    <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}><ShareIcon /></ListItemIcon>
                    <ListItemText primary="Refer" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: { md: 'none' } }}>
                  <ListItemButton component="a" href={REACT_APP_FORM_LINK} target="_blank" rel="noreferrer" sx={{ py: 1.5, px: 2.5 }}>
                    <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}><HelpCenterIcon /></ListItemIcon>
                    <ListItemText primary="Help" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ my: 0.5, bgcolor: '#f1f5f9', display: { md: 'none' } }} />
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/logout"
                    sx={{ py: 1.5, px: 2.5, color: '#f87171' }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Sign Out" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}











































