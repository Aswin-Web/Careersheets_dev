import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Stack,
  Divider,
  Grid,
  Chip,
  Avatar
} from "@mui/material";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../../config";

const ViewAppliedJobApplications = () => {
  const [views, setviews] = useState(0);
  const [currentJob, setCurrentJob] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const jobbID = location.pathname.split("/").pop();

  const saveApplyHistory = async () => {
    try {
      const token = localStorage.getItem("user").replace(/"/g, '');
      const data = await axios.get(
        `${REACT_APP_SERVER_URL}/user/appliedjobs/${jobbID}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const view = await axios.get(
        `${REACT_APP_SERVER_URL}/user/history/${jobbID}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setviews(view.data.views);
      setCurrentJob(data.data.jobs[0]);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    saveApplyHistory();
  }, [jobbID]);

  if (!currentJob) return (
    <Box sx={{ py: 10, textAlign: 'center', bgcolor: "#f1f5f9", minHeight: '100vh' }}>
      <Typography variant="h6" color="text.secondary">Loading application details...</Typography>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "#f1f5f9", minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3, textTransform: 'none', fontWeight: 600, color: '#64748b' }}
        >
          Back to Applications
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: "1px solid #eef2f6",
            bgcolor: "#ffffff",
            boxShadow: "0 10px 40px -15px rgba(0,0,0,0.05)"
          }}
        >
          {/* Title & Company */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
            <Box>
              <Typography variant="h4" fontWeight="800" sx={{ color: "#1e293b", letterSpacing: "-0.03em", mb: 0.5, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
                {currentJob.roleName}
              </Typography>
              <Typography variant="body1" sx={{ color: "#64748b", fontWeight: 600 }}>
                {currentJob.companyName}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#94a3b8" }}>
              <VisibilityIcon sx={{ fontSize: 18 }} />
              <Typography variant="caption" fontWeight="700">{views} Views</Typography>
            </Stack>
          </Stack>

          {/* Quick Metadata Row */}
          <Grid container spacing={2} sx={{ mb: 5 }}>
            <Grid item xs={6} sm={3}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#64748b' }}>
                <WorkOutlineIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2" fontWeight="600">{currentJob.experience} Years</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#64748b' }}>
                <CurrencyRupeeIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2" fontWeight="600">{currentJob.salary}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#64748b' }}>
                <LocationOnIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2" fontWeight="600">{currentJob.location}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#64748b' }}>
                <CalendarTodayIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2" fontWeight="600">{new Date(currentJob.updatedAt).toLocaleDateString()}</Typography>
              </Stack>
            </Grid>
          </Grid>

          <Stack spacing={4}>
            {/* About Company */}
            <Box>
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#1e293b', mb: 1 }}>About Company</Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {currentJob.companyDescription}
              </Typography>
            </Box>

            {/* Job Description */}
            <Box>
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#1e293b', mb: 1 }}>Job Description</Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {currentJob.JobDescription}
              </Typography>
            </Box>

            {/* Responsibilities */}
            <Box>
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#1e293b', mb: 1 }}>Responsibilities</Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {currentJob.Responsibilites}
              </Typography>
            </Box>

            {/* Required Skills */}
            <Box>
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#1e293b', mb: 2 }}>Required Skills</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {currentJob.SkillsRequired?.split(',').map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.trim()}
                    variant="outlined"
                    sx={{
                      borderRadius: 10,
                      fontWeight: 600,
                      color: '#64748b',
                      borderColor: '#e2e8f0',
                      fontSize: '0.75rem'
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Additional Details Grid */}
            <Box>
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#1e293b', mb: 2 }}>Additional Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Industry</Typography>
                      <Typography variant="body2" fontWeight="600" sx={{ color: '#334155' }}>{currentJob.IndustryType}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Employment</Typography>
                      <Typography variant="body2" fontWeight="600" sx={{ color: '#334155' }}>{currentJob.employmentType}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Department</Typography>
                      <Typography variant="body2" fontWeight="600" sx={{ color: '#334155' }}>{currentJob.departmentType}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Education</Typography>
                      <Typography variant="body2" fontWeight="600" sx={{ color: '#334155' }}>{currentJob.education}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Stack>

          {/* Status Badge */}
          <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid #f1f5f9' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', width: 44, height: 44 }}>
                <CalendarTodayIcon />
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Application Status</Typography>
                <Typography variant="body1" fontWeight="800" sx={{ color: '#1e293b' }}>
                  Applied on {new Date(currentJob.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ViewAppliedJobApplications;
