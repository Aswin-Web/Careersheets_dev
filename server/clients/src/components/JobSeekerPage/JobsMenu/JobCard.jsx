import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Divider,
  CircularProgress
} from "@mui/material";
import React from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link } from "react-router-dom";
import "./JobCard.css";

const JobCard = ({ item, skillofUser, skillOfProject }) => {
  let score = 0;
  let projectScore = 0;

  const JobSkillset = item.SkillsRequired ? item.SkillsRequired.split(",") : [];

  JobSkillset.forEach((skill) => {
    if (skillofUser.toString().toLowerCase().includes(skill.trim().toLowerCase())) {
      score = score + 1;
    }
  });

  JobSkillset.forEach((skill) => {
    if (skillOfProject.toString().toLowerCase().includes(skill.trim().toLowerCase())) {
      projectScore = projectScore + 1;
    }
  });

  const skillMatchPercentage = JobSkillset.length > 0 ? Math.round((score / JobSkillset.length) * 100) : 0;
  const projectMatchPercentage = JobSkillset.length > 0 ? Math.round((projectScore / JobSkillset.length) * 100) : 0;
  const displayPercentage = item.projectLevel ? projectMatchPercentage : skillMatchPercentage;

  const disableApplyButton = skillMatchPercentage < 25;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: '1px solid #e2e8f0',
        bgcolor: 'white',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        '&:hover': {
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
          transform: 'translateY(-2px)',

        }
      }}
    >
      {/* Top Header: Date and Quick View */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: '#64748b' }}>
          <CalendarTodayIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" fontWeight="600">
            {new Date(item.createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
      </Stack>

      {/* Title & Company */}
      <Box sx={{ mb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            variant="h6"
            fontWeight="800"
            sx={{
              color: '#1e293b',
              letterSpacing: '-0.02em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '85%'
            }}
          >
            {item.roleName}
          </Typography>
          <Box
            sx={{
              width: 8,
              height: 8,
              bgcolor: item.isClosed ? '#f87171' : '#10b981',
              borderRadius: '50%'
            }}
          />
        </Stack>
        <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 500 }}>
          {item.companyName}
        </Typography>
      </Box>

      {/* Skill Match Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="subtitle2" fontWeight="700" sx={{ color: '#1e293b' }}>
            Skill Match
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Based on your profile
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={displayPercentage}
            size={70}
            thickness={4.5}
            sx={{ color: displayPercentage < 40 ? '#f87171' : '#1eff00ff' }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" fontWeight="800" sx={{ fontSize: '0.95rem' }}>
              {displayPercentage}%
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2.5, opacity: 0.6 }} />

      {/* Job Details List */}
      <Stack spacing={1.5} sx={{ mb: 3 }}>
        {[
          { icon: <WorkOutlineIcon sx={{ fontSize: 18 }} />, text: `${item.experience} years` },
          { icon: <CurrencyRupeeIcon sx={{ fontSize: 18 }} />, text: item.salary },
          { icon: <ApartmentIcon sx={{ fontSize: 18 }} />, text: item.location },
          { icon: <DateRangeIcon sx={{ fontSize: 18 }} />, text: new Date(item.createdAt).toLocaleDateString() }, // Using createdAt as example deadline if not present
        ].map((detail, idx) => (
          <Stack key={idx} direction="row" alignItems="center" spacing={1.5} sx={{ color: '#475569' }}>
            {detail.icon}
            <Typography variant="body2" fontWeight="500">{detail.text}</Typography>
          </Stack>
        ))}
      </Stack>

      {/* Footer: Application info and View Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" fontWeight="600" sx={{ color: '#94a3b8' }}>
          {item.appliedUsers.length > 0
            ? `${item.appliedUsers.length} Applications received`
            : "None applied"}
        </Typography>
        <Button
          component={Link}
          to={`/user/jobs/${item._id}?disableApplyButton=${disableApplyButton}`}
          variant="contained"
          size="small"
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            bgcolor: '#155dfc',
            px: 2.5,
            boxShadow: 'none',
            '&:hover': { bgcolor: '#0d47a1', boxShadow: 'none' }
          }}
        >
          View
        </Button>
      </Stack>
    </Paper>
  );
};

export default JobCard;
