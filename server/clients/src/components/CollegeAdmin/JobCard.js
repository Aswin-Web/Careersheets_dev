import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Grid, Divider, Button } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";


const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`${job._id}`); 
  };

  

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {job.companyName}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={centerItems}>
            <WorkOutlineIcon />
            <Typography variant="body1">{job.experience} years</Typography>
          </Box>
          <Box sx={centerItems}>
            <CurrencyRupeeIcon />
            <Typography variant="body1">{job.salary}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={centerItems}>
            <ApartmentIcon />
            <Typography variant="body1">{job.location}</Typography>
          </Box>
          <Box sx={centerItems}>
            <DateRangeIcon />
            <Typography variant="body1">
              {new Date(job.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ margin: "1.5rem 0" }} />

      <Box sx={{ marginBottom: "1.5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Job Description
        </Typography>
        <Typography variant="body1">
          {job.JobDescription?.slice(0, 200)}...
        </Typography>
      </Box>

      <Box sx={{ textAlign: "right" }}>
        <Button variant="contained" onClick={handleViewDetails}>
          View Details
        </Button>
      </Box>
    </Paper>
  );
};

export default JobCard;
