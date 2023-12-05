import { Box, Typography } from '@mui/material'
import React from 'react'



const CommingSoon = () => {

    return (
      <div>
        <Box
          sx={{
            padding:"2rem",
            minHeight: "80vh",
        
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" color="initial">
            Coming Soon...!
          </Typography>
          <Typography variant="body1" color="initial">
            Our Developers are working hard to build this and it is in the
            development stage.
          </Typography>
        </Box>
      </div>
    );
}

export default CommingSoon
