// import React from 'react'
// import classes from './Training.Module.css'
// import { Box, Typography } from '@mui/material'

// const Training = () => {
//   return (
//     <div>
//       <Box sx={{padding:"2rem"}}>
//         <Box>
//           <Typography variant="h2" color="initial">
//             Get Started with CareerSheets...
//           </Typography>
//           <Typography variant="h6" color="initial">
//             You can view the tutorial to get started with the application.
//           </Typography>
//         </Box>
//         <br />
//         <Box>
//           <iframe
//             title="Youtube Demo link"
//             width="420"
//             height="315"
//             src="https://www.youtube.com/embed/U3wUqrjZTPY?playlist=U3wUqrjZTPY&loop=1"
//           ></iframe>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default Training


import React from 'react'
import { Box, Typography, Container, Paper } from '@mui/material'

const Training = () => {
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
          Get Started with CareerSheets
        </Typography>
        <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500, maxWidth: 800, mx: 'auto', px: { xs: 2, md: 0 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Watch this tutorial to master the features and accelerate your job search.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 4,
          border: '1px solid #eef2f6',
          overflow: 'hidden',
          maxWidth: 900,
          mx: 'auto',
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)"
        }}
      >
        <Box
          sx={{
            position: 'relative',
            pt: '56.25%', // 16:9 Aspect Ratio
            width: '100%',
          }}
        >
          <iframe
            title="Youtube Demo link"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
              borderRadius: '12px'
            }}
            src="https://www.youtube.com/embed/U3wUqrjZTPY?playlist=U3wUqrjZTPY&loop=1"
            allowFullScreen
          />
        </Box>
      </Paper>
    </Container>
  );
}

export default Training;
