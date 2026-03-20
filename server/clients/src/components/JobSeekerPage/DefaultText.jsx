import { Typography, Stack, Container } from '@mui/material'
import React from 'react'

const DefaultText = () => {
  return (
    <Container maxWidth="md">
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "40vh", textAlign: "center", py: 8 }}
      >
        <Typography
          variant="h3"
          fontWeight="800"
          sx={{
            color: '#1e293b',
            letterSpacing: '-0.03em',
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Hello Champ!
        </Typography>

        <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500, maxWidth: 600 }}>
          Welcome to CareerSheets. You can start tracking your journey by adding your first application using the plus button.
        </Typography>
      </Stack>
    </Container>
  )
}

export default DefaultText;
