import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const RightSideBar = () => {
  return (
    <Box
      id='right_id'
      sx={{
        width: "100%",
        maxWidth: "1400px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%"
      }}
    >
      <Outlet />
    </Box>
  );
}

export default RightSideBar;
