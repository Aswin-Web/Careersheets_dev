import React from 'react'
import classes from './Training.Module.css'
import { Box, Typography } from '@mui/material'

const Training = () => {
  return (
    <div>
      <Box sx={{padding:"2rem"}}>
        <Box>
          <Typography variant="h2" color="initial">
            Get Started with CareerSheets...
          </Typography>
          <Typography variant="h6" color="initial">
            You can view the tutorial to get started with the application.
          </Typography>
        </Box>
        <br />
        <Box>
          <iframe
            title="Youtube Demo link"
            width="420"
            height="315"
            src="https://www.youtube.com/embed/U3wUqrjZTPY?playlist=U3wUqrjZTPY&loop=1"
          ></iframe>
        </Box>
      </Box>
    </div>
  );
}

export default Training