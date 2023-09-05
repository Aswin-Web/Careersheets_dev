import React from "react";
import classes from "./Header.module.css"
import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import axios from 'axios'
import logo from "../../images/Careersheets-logo.png"

 

const handleClick=()=>{
  return window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`,'_self')
  
}

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ background: "#accbee", maxWidth: "100%" }}
      className={classes.header}
    >
      <Toolbar>
        <img className={classes.logo} src={logo}/>
        <h4 className={classes.logoName}>Careersheets(Beta)</h4>

        <Box display={"flex"} marginLeft="auto">
          <Button
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            className={classes.button}
            onClick={handleClick}
          >
            Sign Up Free
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
