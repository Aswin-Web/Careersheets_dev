import { Box, Container } from "@mui/material";
import React from "react";
import Cards from "./Cards";
import RightSideNavbar from "./RightTopMenu";
import DefaultText from "./DefaultText";
import { useSelector } from "react-redux";
import ReactGA from "react-ga";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
const ApplicationStatusComponent = () => {
  const data = useSelector((state) => state.application.value);
  console.log("Data", data);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h3"
          fontWeight="800"
          sx={{
            color: '#1e293b',
            letterSpacing: '-0.03em',
            mb: 1.5,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Application Tracking
        </Typography>
        <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500, maxWidth: 800, mx: 'auto' }}>
          {data.length === 0
            ? "You haven't started any applications yet. Track your progress here!"
            : `You are currently tracking ${data.length} active applications.`}
        </Typography>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: -100, right: 0, display: { xs: 'none', md: 'block' } }}>
          <RightSideNavbar />
        </Box>

        <Stack spacing={4} alignItems="center">
          {data.length === 0 ? (
            <DefaultText />
          ) : (
            data.map((item, index) => (
              <Box key={index} sx={{ width: '100%', maxWidth: 1000 }}>
                <Cards data={item} />
              </Box>
            ))
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default ApplicationStatusComponent;