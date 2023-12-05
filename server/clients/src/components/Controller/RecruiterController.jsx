import React from "react";
import UseAuth from "../../hooks/auth";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const RecruiterController = (props) => {
  const { role } = UseAuth();
  if (role === "recruiter") {
    return (
      <Box sx={{ margin: "1rem" }}>
        <Box sx={{ textAlign: "right", color: "white" }}>
          <Link to="/recruiter">
            <Button sx={{ marginX: "1rem" }} variant="contained">
             Home
            </Button>
          </Link>
          <Link to="/recruiter/profile">
            <Button sx={{ marginX: "1rem" }} variant="contained">
              Profile
            </Button>
          </Link>
          <Link to="/logout">
            <Button variant="contained">Logout</Button>
          </Link>
        </Box>
        <Box>{props.children}</Box>
      </Box>
    );
  }
  return;
};

export default RecruiterController;
