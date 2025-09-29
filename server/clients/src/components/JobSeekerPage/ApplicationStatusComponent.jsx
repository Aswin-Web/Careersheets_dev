import { Box, Container } from "@mui/material";
import React from "react";
import Cards from "./Cards";
import RightSideNavbar from "./RightTopMenu";
import DefaultText from "./DefaultText";
import { useSelector } from "react-redux";
import ReactGA from "react-ga";
import { useEffect } from "react";
const ApplicationStatusComponent = () => {
  const data = useSelector((state) => state.application.value);
  console.log("Data", data);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", px: { xs: 1 } }}>
      {/* Right side navbar */}
      <Box sx={{ alignSelf: "flex-end" }}>
        <RightSideNavbar />
      </Box>

      {/* Content */}
      {data.length === 0 ? (
        <DefaultText />
      ) : (
        data.map((item, index) => (
          <Container
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Cards data={item} />
          </Container>
        ))
      )}
    </Box>
  );
};

export default ApplicationStatusComponent;