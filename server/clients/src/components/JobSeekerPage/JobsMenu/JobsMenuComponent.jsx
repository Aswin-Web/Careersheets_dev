import { Box, Typography, Grid, Container } from "@mui/material";
import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

const JobsMenuComponent = () => {
  const allJobs = useSelector((state) => state.allJobsUser.value);
  const skillOfUser = useSelector((state) => state.skill.skills);
  const skills = skillOfUser.map((x) => x.skill);
  const userProject = useSelector((state) => state.project.items);
  const skillOfProject = userProject.map((x) => x.projectSkills);

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
          Recommended Jobs
        </Typography>
        <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500, maxWidth: 800, mx: 'auto' }}>
          {allJobs.length === 0
            ? "We didn't find any matching jobs for your skills. Please ensure your profile lists all your skills."
            : `Based on your skillset, we found ${allJobs.length} opportunities for you.`}
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {allJobs.map((item) => (
          <Grid item xs={12} sm={6} lg={4} key={item._id}>
            <JobCard
              item={item}
              skillofUser={skills}
              skillOfProject={skillOfProject}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobsMenuComponent;
