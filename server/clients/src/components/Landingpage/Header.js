import React from "react";
import { Link } from "react-router-dom"; 
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { REACT_APP_SERVER_URL } from "../../config";
import logo from "../../images/Careersheets-logo.png";

const handleClick = () => {
  return window.open(`${REACT_APP_SERVER_URL}/auth/google`, "_self");
};

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#accbee",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #91b9e7",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
   
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Careersheets Logo"
            style={{ height: "45px", width: "45px", marginRight: "12px", borderRadius: "50%" }} 
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "#042345",
              fontWeight: "bold",
             
              display: { xs: "none", sm: "block" },
            }}
          >
            Careersheets
          </Typography>
        </Link>

        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            borderRadius: "50px", 
            fontWeight: "bold",
            textTransform: "none", 
            fontSize: "0.9rem",
            px: 3, 
          }}
        >
          Sign Up Free
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;