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
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
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
import jwt from "jwt-decode"

const drawerWidth = 240;


export default function DrawerAppBar(props) {
  const { window } = props;
  let navItems=[]
  const [mobileOpen, setMobileOpen] = React.useState(false);
  if (useSelector(state=>jwt( state.auth.value).role)==="superuser"){
    // navItems.push({ path: "/admin/verify", name: "Admin" })
   navItems = [
      { path: "/user/", name: "Application Status" },
      { path: "schdule", name: "Interview Schedule" },
      { path: "/user/devstage", name: "Wishlist" },
      { path: "/user/devstage", name: "Feed" },
      { path: "/user/training", name: "Training" },
      { path: "/user/jobs", name: "Jobs" },
      { path: "/user/applied", name: "Applied Jobs" },
      { path: "/admin/verify", name: "Admin" }
    ];
  }else{
    navItems = [
      { path: "/user/", name: "Application Status" },
      { path: "schdule", name: "Interview Schedule" },
      { path: "/user/devstage", name: "Wishlist" },
      { path: "/user/devstage", name: "Feed" },
      { path: "/user/training", name: "Training" },
      { path: "/user/jobs", name: "Jobs" },
      { path: "/user/applied", name: "Applied Jobs" },
    ];
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", bgColor: "#11144C" }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        CareerSheets
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink to={item.path}>
                <ListItemText primary={item.name} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const { displayPicture } = UseAuth();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ backgroundColor: "#11144C" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 2,
              width: "40%",
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Avatar alt="Remy Sharp" src={icon} />
            CareerSheets
          </Typography>
          <Box
            sx={{
              flexGrow: 3,
              width: "60%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "2%",
            }}
          >

            <Link to="/user/devstage" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "#fff" }}>
                <div
                  sx={{
                    display: "flex",
                  }}
                >
                  <ShareIcon />
                  <Typography variant="subtitle1">Refer</Typography>
                </div>
              </Button>
            </Link>
            <Link to="/user/profile" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  textDecoration: "none",
                }}
              >
                <Avatar src={displayPicture} />

                <Typography variant="subtitle1" sx={{ textDecoration: "none" }}>
                  My Profile
                </Typography>
              </Button>
            </Link>

            <Button sx={{ color: "#fff" }} onClick={() => {}}>
              <a href={REACT_APP_FORM_LINK} rel="noreferrer" target="_blank">
                <Box className="logout_btn">
                  <HelpCenterIcon />
                  <Typography variant="subtitle1" className="logout_btn">
                    Help
                  </Typography>
                </Box>
              </a>
            </Button>

            <Button sx={{ color: "#fff" }} onClick={() => {}}>
              <Link to="/logout">
                <Box className="logout_btn">
                  <LogoutIcon />
                  <Typography variant="subtitle1" className="logout_btn">
                    Logout
                  </Typography>
                </Box>
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
