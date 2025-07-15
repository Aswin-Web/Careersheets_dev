import { Box, Typography } from '@mui/material'
import React from 'react'
import classes from './Default.module.css'
const DefaultText = () => {
  return (
   <div>
    <Box className={classes.body}>
        <Typography variant='h3'>
            Hello Champ......!
        </Typography>

        <Typography variant='h6'>
           Welcome to CareerSheets. You can add your application by clicking the plus button
        </Typography>
    </Box>
   </div>
  )
}

export default DefaultText
