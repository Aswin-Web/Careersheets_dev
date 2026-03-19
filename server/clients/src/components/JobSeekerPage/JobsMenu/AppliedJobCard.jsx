import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Divider,
  Avatar
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";

const AppliedJobCard = ({ item, skillofUser }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #eef2f6",
        bgcolor: "#ffffff",
        transition: "all 0.3s ease",
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        "&:hover": {
          boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)",
          borderColor: "#e2e8f0",
          transform: "translateY(-4px)"
        }
      }}
    >
      {/* Top Header */}
      <Stack direction="row" spacing={2} sx={{ mb: 2.5 }} alignItems="flex-start">
        <Avatar
          variant="rounded"
          sx={{
            width: 48,
            height: 48,
            bgcolor: "#f8fafc",
            color: "#155dfc",
            fontWeight: 800,
            borderRadius: 2.5,
            border: '1px solid #f1f5f9'
          }}
        >
          {item.companyName ? item.companyName[0] : "?"}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="800" sx={{ color: "#1e293b", letterSpacing: "-0.01em", fontSize: '1.1rem' }}>
              {item.roleName}
            </Typography>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: item.isClosed ? "#ef4444" : "#10b981",
                boxShadow: item.isClosed ? "0 0 0 4px rgba(239, 68, 68, 0.1)" : "0 0 0 4px rgba(16, 185, 129, 0.1)"
              }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
            {item.companyName}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2.5, borderColor: '#f1f5f9' }} />

      {/* Details Grid */}
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={1.5}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ color: "#64748b" }}>
            <WorkOutlineIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" fontWeight="500">{item.experience} Years Exp</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ color: "#64748b" }}>
            <CurrencyRupeeIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" fontWeight="500">{item.salary}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ color: "#64748b" }}>
            <LocationOnIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" fontWeight="500">{item.location}</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Footer Actions */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3, pt: 2, borderTop: '1px solid #f8fafc' }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "#94a3b8" }}>
          <CalendarTodayIcon sx={{ fontSize: 14 }} />
          <Typography variant="caption" fontWeight="600">
            {new Date(item.createdAt).toLocaleDateString()}
          </Typography>
        </Stack>

        <Button
          component={Link}
          to={`/user/applied/${item._id}`}
          size="small"
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            px: 2,
            color: '#155dfc',
            '&:hover': { bgcolor: 'rgba(21, 93, 252, 0.05)' }
          }}
        >
          View Details
        </Button>
      </Stack>
    </Paper>
  );
};

export default AppliedJobCard;
