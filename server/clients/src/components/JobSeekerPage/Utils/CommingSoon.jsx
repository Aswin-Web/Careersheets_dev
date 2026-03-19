import { Box, Typography, Stack, Container } from '@mui/material'
import React from 'react'
import wishlist from "../../../images/3271760.jpg"
const CommingSoon = () => {
  return (
    <Container maxWidth="md">
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "60vh", textAlign: "center", py: 8 }}
      >
       <Box
            component="img"
            src={wishlist}
            alt="Calendar Illustration"
            sx={{
              width: "100%",
              maxWidth: 350,
              height: "auto",
              filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.1))",
              mb: 2,
              borderRadius: "20px"
            }}
          />
        <Typography
          variant="h3"
          fontWeight="800"
          sx={{
            color: '#1e293b',
            letterSpacing: '-0.03em',
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Coming Soon!
        </Typography>

        <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500, maxWidth: 600 }}>
          Our developers are working hard to build this feature. Stay tuned for exciting updates!
        </Typography>
      </Stack>
    </Container>
  );
}

export default CommingSoon;
