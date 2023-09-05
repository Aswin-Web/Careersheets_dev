import React, { useEffect } from "react";
import Navbar from "./Navbar";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { Box } from "@mui/material";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet-async";

const JobseekerPage = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  return (
    <div className="components">
      <Helmet>
        <title>CareerSheets-User</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://yt3.googleusercontent.com/JSKcgbOwC9er1na2B_jWU9OsNfouSfm_bs1CASylTw9cHZEycRixrqpJIMoNoU7QpEtPPTWxysw=s176-c-k-c0x00ffffff-no-rj"
        />
      </Helmet>
      <Navbar className="Navbar" />

      <Box className="UserBody">
        <Box>
          <LeftSideBar />
        </Box>
        <RightSideBar />
      </Box>
    </div>
  );
};

export default JobseekerPage;
