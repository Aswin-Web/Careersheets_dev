import { Box, Button, Typography, Container } from "@mui/material";
import React from "react";
import Card from "./UserSchduleCards";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import CalendarIllustration from "../../images/3991819.jpg";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Stack } from "@mui/material";
const Main = () => {
  // Total Application From User
  const applicationData = useSelector((state) => state.application.value);

  // This is used to identify the last status of the application is pending. If pending it will be displayed in the schedule component
  const scheduleApplication = applicationData.filter((application) => {
    const statusArray = application.status;
    if (statusArray && statusArray.length !== 0) {
      const isPending = statusArray[statusArray.length - 1].status;
      if (
        isPending === "Pending" &&
        new Date(statusArray[statusArray.length - 1].date) >=
        new Date(new Date().setDate(new Date().getDate() - 1))
      )
        return true;
    }
    return false;
  });

  const sortedApplications = [...scheduleApplication].sort((a, b) => {
    const lengthA = a.status.length
    const lengthB = b.status.length;
    const date1 = new Date(a.status[lengthA - 1].date)
    const date2 = new Date(b.status[lengthB - 1].date);
    return date1 - date2;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {sortedApplications.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
            textAlign: "center",
            gap: 3
          }}
        >
          <Box
            component="img"
            src={CalendarIllustration}
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
          <Box sx={{ maxWidth: 600 }}>
            <Typography
              variant="h3"
              fontWeight="800"
              sx={{
                background: "#000000ff",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
                fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Hey Champ....!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Currently You don't have any scheduled events.Set the Date....!

            </Typography>
            {/* <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Stay proactive! Start adding your job applications and schedule your next career milestone.
            </Typography> */}
            <Link to="/user" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                startIcon={<EventNoteIcon />}
                sx={{
                  backgroundColor: "#1b2affff",
                  padding: "12px 32px",
                  fontSize: "1.1rem",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 14px 0 rgba(51, 0, 255, 1)",
                  "&:hover": {
                    backgroundColor: "#3029ffff",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(233, 0, 100, 0.23)",
                  },
                }}
              >
                Add Event
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
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
              Scheduled Events
            </Typography>
            <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500, maxWidth: 800, mx: 'auto' }}>
              Stay on top of your upcoming interviews, tests, and milestones.
            </Typography>
          </Box>
          <Stack spacing={3} alignItems="center">
            {sortedApplications.map((item, index) => (
              <Box key={item._id || index} sx={{ width: '100%', maxWidth: 800 }}>
                <Card info={item} />
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default Main;
