import * as React from "react";

import Sideview from "./sideview";

import classes from "./MainNavigation.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import ShareIcon from "@mui/icons-material/Share";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

import LogoutIcon from "@mui/icons-material/Logout";

import Logout from "../../utils/logout";
import { Link } from "react-router-dom";
import logo from "../../images/Careersheets-logo.png";
import { REACT_APP_FORM_LINK } from "../../config";

function MainNavigation() {
  const value = useSelector((state) => state.collegeAdmin.value);

  // const [leftBar, setLefttbar] = React.useState(true);

  // const handleOpenNavMenu = (event) => {
  //   setLefttbar((prevState) => !prevState);

  // };

  return (
    <React.Fragment>
      <div className={classes.navbar}>
        <AppBar
          position="static"
          sx={{ background: "#12a4d9", maxWidth: "100%" }}
          className={classes.bar}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ maxWidth: "100%" }}>
              <img className={classes.logo_cs} src={logo} />
              <Typography
                variant="h4"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "black",
                  textDecoration: "none",
                  marginLeft: "0.7em",
                }}
              >
                Careersheets(Beta)
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none", width: "100%" },
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  // onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <Sideview />
                </IconButton>
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "flex", justifyContent: "end" },
                }}
              >
                {/* <Box sx={{ fontSize: "1rem" }}>
                  <Button sx={{ color: "white" }}>
                    <ShareIcon />
                  </Button>
                  <p className={classes.iconName}>SHARE</p>
                </Box> */}
                <Box>
                  <Button sx={{ color: "#fff" }} onClick={() => {}}>
                    <a
                      href={REACT_APP_FORM_LINK}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Box className="logout_btn">
                        <HelpCenterIcon />
                        <Typography variant="subtitle1" className="logout_btn">
                          Help
                        </Typography>
                      </Box>
                    </a>
                  </Button>
                </Box>
                <Link to="/logout" className={classes.logout_btn}>
                  <Box
                    sx={{
                      marginTop: "0.3em",
                      marginRight: "1.5em",
                      fontSize: "1rem",
                    }}
                  >
                    <Button sx={{ color: "white" }}>
                      <LogoutIcon />
                    </Button>
                    <p className={classes.iconName}>LOGOUT</p>
                  </Box>
                </Link>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <IconButton sx={{ p: 0, marginRight: "1em" }}>
                  <Avatar alt="Remy Sharp" src={value.displayPicture} />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </React.Fragment>
  );
}
export default MainNavigation;
