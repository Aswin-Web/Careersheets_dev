import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import BasicTable from './Table'
import { Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  const navigate=useNavigate()
  return (
    <div>
      <Helmet>
        <title>CareerSheets-Admin</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://yt3.googleusercontent.com/JSKcgbOwC9er1na2B_jWU9OsNfouSfm_bs1CASylTw9cHZEycRixrqpJIMoNoU7QpEtPPTWxysw=s176-c-k-c0x00ffffff-no-rj"
        />
      </Helmet>
      <Container>
        <Box
          sx={{
            margin: "1rem",
            gap: "1rem",
          }}
        >
          <Button variant="outlined" color="error" sx={{ margin: "0 1rem" }}>
            Verify CollegeAdmin
          </Button>
          <Button variant="outlined" color="error">
            Download
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{ margin: "0 1rem" }}
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Box>

        <Box
          sx={{
            minHeight: "80vh",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Dashboard
