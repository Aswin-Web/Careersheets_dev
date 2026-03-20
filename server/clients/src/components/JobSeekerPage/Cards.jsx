import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Avatar,
  Chip
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Popup from "./Utils/PopupStatus";
import BasicTable from "./Utils/Table";

const StatusCircle = ({ active, completed, rejected, icon, label, statusText }) => {
  const color = rejected ? "#ef4444" : active ? "#155dfc" : completed ? "#155dfc" : "#f1f5f9";
  const iconColor = active || completed || rejected ? "#ffffff" : "#adb5bd";
  const textColor = rejected ? "#ef4444" : active ? "#155dfc" : "#1e293b";
  const statusColor = rejected ? "#ef4444" : active ? "#155dfc" : "#64748b";

  return (
    <Stack alignItems="center" spacing={1} sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <Box
        sx={{
          width: { xs: 44, sm: 64 },
          height: { xs: 44, sm: 64 },
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: color,
          border: active ? "2px solid #155dfc" : "none",
          boxShadow: active ? "0 0 0 4px rgba(21, 93, 252, 0.1)" : "none",
          transition: "all 0.3s ease",
          zIndex: 2
        }}
      >
        {React.cloneElement(icon, { sx: { fontSize: { xs: 20, sm: 28 }, color: iconColor } })}
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="caption"
          fontWeight="700"
          sx={{
            color: textColor,
            display: 'block',
            fontSize: { xs: '0.6rem', sm: '0.75rem' },
            lineHeight: 1.2
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="caption"
          fontWeight="600"
          sx={{
            color: statusColor,
            fontSize: { xs: '0.5rem', sm: '0.65rem' },
            textTransform: 'uppercase',
            opacity: 0.8
          }}
        >
          {statusText}
        </Typography>
      </Box>
    </Stack>
  );
};

const Cards = (props) => {
  const [view, setView] = React.useState(false);
  const { _id, author, status, company, location, designation } = props.data;

  // Mapping stages to status history
  const stages = [
    { label: "Applied", icon: <CheckIcon />, key: "Applied" },
    { label: "Portfolio Review", icon: <DescriptionIcon />, key: "Portfolio" },
    { label: "Written Test", icon: <AssignmentTurnedInIcon />, key: "Written" },
    { label: "Interview", icon: <GroupsIcon />, key: "Interview" },
    { label: "Offer", icon: <EmojiEventsIcon />, key: "Offer" }
  ];

  const getStageProgress = (statusList) => {
    if (!statusList || statusList.length === 0) return { currentIndex: 0, stageStatus: "DONE" };

    // Check if any status indicates they are selected
    const hasSelected = statusList.some(s => String(s.status || "").toLowerCase() === "selected");
    if (hasSelected) return { currentIndex: 4, stageStatus: "DONE" };

    const lastStat = statusList[statusList.length - 1];
    const typeStr = String(lastStat.interviewType || "").toLowerCase();
    const roundStr = String(lastStat.round || "").toLowerCase();
    const statStr = String(lastStat.status || "").toLowerCase();

    if (statStr === "selected" || typeStr.includes("offer")) return { currentIndex: 4, stageStatus: "DONE" };

    let baseIndex = 0;
    if (typeStr.includes("hr") || typeStr.includes("technical") || typeStr.includes("group") || typeStr.includes("interview")) baseIndex = 3;
    else if (typeStr.includes("written") || typeStr.includes("test") || typeStr.includes("assessment")) baseIndex = 2;
    else if (typeStr.includes("portfolio") || typeStr.includes("screening")) baseIndex = 1;
    else {
      const roundNum = parseInt(roundStr, 10);
      if (!isNaN(roundNum)) {
        baseIndex = Math.min(Math.max(roundNum, 1), 3);
      }
    }

    if (statStr === "cleared") {
      return { currentIndex: baseIndex, stageStatus: "DONE" };
    } else if (statStr === "rejected") {
      return { currentIndex: baseIndex, stageStatus: "REJECTED" };
    } else {
      return { currentIndex: baseIndex, stageStatus: "IN PROGRESS" };
    }
  };

  const currentStageInfo = getStageProgress(status);
  const currentStageIndex = currentStageInfo.currentIndex;

  // Helper to determine status for each stage
  const getStageStatus = (stageLabel) => {
    const thisStageIdx = stages.findIndex(s => s.label === stageLabel);
    if (thisStageIdx < currentStageIndex) return "DONE";
    if (thisStageIdx === currentStageIndex) return currentStageInfo.stageStatus;
    return "WAIT";
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 4 },
        mb: 3,
        borderRadius: 4,
        border: "1px solid #eef2f6",
        bgcolor: "#ffffff",
        transition: "all 0.3s ease",
        width: "100%",
        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
        "&:hover": {
          boxShadow: "0 12px 40px -12px rgba(0,0,0,0.08)",
          borderColor: "#e2e8f0"
        }
      }}
    >
      {/* Header Section */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={3}
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={{ xs: 1.5, sm: 2.5 }} alignItems="flex-start" sx={{ width: "100%" }}>
          <Avatar
            variant="rounded"
            sx={{
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
              color: "#155dfc",
              fontWeight: 800,
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              borderRadius: 3.5,
              border: '1px solid #f1f5f9',
              flexShrink: 0
            }}
          >
            {company ? company[0] : "?"}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 0.5, flexWrap: "wrap", rowGap: 1 }}>
              <Typography variant="h6" fontWeight="800" sx={{ color: "#1e293b", letterSpacing: "-0.02em", lineHeight: 1.2, wordBreak: "break-word" }}>
                {designation}
              </Typography>
              {status && status.length > 0 && (
                <Chip
                  label={status[status.length - 1].status || "Ongoing"}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    height: 24,
                    fontSize: '0.75rem',
                    bgcolor: status[status.length - 1].status === 'Selected' || status[status.length - 1].status === 'Cleared' ? 'rgba(16, 185, 129, 0.1)' :
                      status[status.length - 1].status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(21, 93, 252, 0.1)',
                    color: status[status.length - 1].status === 'Selected' || status[status.length - 1].status === 'Cleared' ? '#10b981' :
                      status[status.length - 1].status === 'Rejected' ? '#ef4444' : '#155dfc'
                  }}
                />
              )}
            </Stack>
            <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 0.5, sm: 1 } }}>
              <Box component="span" sx={{ color: "#1e293b", wordBreak: 'break-word' }}>{company}</Box>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'block' }, width: 4, height: 4, borderRadius: '50%', bgcolor: '#cbd5e1', flexShrink: 0 }} />
              <Box component="span" sx={{ wordBreak: 'break-word' }}>{location}</Box>
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Popup
            info={{ _id, author, finalStatus: status.length ? status[status.length - 1] : null }}
            title="Edit Status"
            content={
              <Button
                fullWidth
                variant="outlined"
                startIcon={<EditIcon sx={{ fontSize: 18 }} />}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2.5,
                  fontWeight: 700,
                  color: '#64748b',
                  borderColor: '#e2e8f0',
                  px: 2.5,
                  '&:hover': { borderColor: '#155dfc', color: '#155dfc', bgcolor: 'transparent' }
                }}
              >
                Edit
              </Button>
            }
          />
          <Button
            fullWidth
            onClick={() => setView(!view)}
            variant={view ? "outlined" : "contained"}
            disableElevation
            startIcon={view ? <VisibilityIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
            sx={{
              textTransform: 'none',
              borderRadius: 2.5,
              fontWeight: 700,
              bgcolor: view ? 'transparent' : '#155dfc',
              color: view ? '#155dfc' : 'white',
              borderColor: view ? '#155dfc' : 'transparent',
              px: 3,
              '&:hover': {
                bgcolor: view ? 'rgba(21, 93, 252, 0.05)' : '#0b4cd4',
                borderColor: view ? '#155dfc' : 'transparent'
              }
            }}
          >
            {view ? "Hide" : "Details"}
          </Button>
        </Stack>
      </Stack>

      {/* Timeline Section */}
      <Box sx={{ position: 'relative', px: { xs: 1, sm: 4 }, py: 1 }}>
        {/* Connector Line Container */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 22, sm: 32 },
            left: { xs: '15%', sm: '12%' },
            right: { xs: '15%', sm: '12%' },
            height: 2,
            bgcolor: '#f1f5f9',
            zIndex: 0
          }}
        >
          {/* Active/Progress Line */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: currentStageIndex >= 0 ? `${(currentStageIndex / (stages.length - 1)) * 100}%` : '0%',
              height: '100%',
              bgcolor: '#155dfc',
              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              '&::after': {
                content: '""',
                position: 'absolute',
                right: 0,
                top: -3,
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#155dfc',
                boxShadow: '0 0 0 4px rgba(21, 93, 252, 0.1)'
              }
            }}
          />
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ position: 'relative', zIndex: 1 }}>
          {stages.map((stage) => {
            const s = getStageStatus(stage.label);
            return (
              <StatusCircle
                key={stage.label}
                active={s === "IN PROGRESS"}
                completed={s === "DONE"}
                rejected={s === "REJECTED"}
                icon={stage.icon}
                label={stage.label}
                statusText={s}
              />
            );
          })}
        </Stack>
      </Box>

      {/* Expansion Table Section */}
      <Box sx={{ mt: view ? 4 : 0, transition: 'all 0.3s ease' }}>
        <BasicTable
          _id={_id}
          author={author}
          status={status}
          view={view}
          application_id={_id}
        />
      </Box>
    </Paper>
  );
};

export default Cards;
