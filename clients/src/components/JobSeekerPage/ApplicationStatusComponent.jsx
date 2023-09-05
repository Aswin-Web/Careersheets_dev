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
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div>
     
      <Box>
        <RightSideNavbar />
      </Box>

      {data.length === 0 ? (
        <DefaultText />
      ) : (
        data.map((item, index) => (
          <Container key={index}>
            <Cards data={item} />
            <br />
          </Container>
        ))
      )}
    </div>
  );
};

export default ApplicationStatusComponent;
