import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Avatar,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import ScheduleInterview from "./Scheduleint/Scheduleint";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REACT_APP_SERVER_URL } from "../../config";

const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};

const statusOptions = [
  "Applied",
  "Reviewed",
  "HR Screening",
  "Technical Round",
  "Offer Extended",
  "Hired",
  "Not Qualified",
];

const ViewRecruiterJobs = () => {
  const location = useLocation();
  const jobbID = location.pathname.split("/").pop();
  const [currentJob, setCurrentJob] = useState([]);
  const [error, setError] = useState({ isError: false, msg: "" });
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    time: null,
    location: "",
    interviewerName: "",
  });
  // Use separate feedback state for each user
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    if (jobbID) {
      GetJobInfo();
    }
  }, [jobbID]);

  const GetJobInfo = async () => {
    try {
      const jobResponse = await axios.get(
        `${REACT_APP_SERVER_URL}/recruiter/jobs/${jobbID}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("recruiter")}`,
          },
        }
      );

      const appResponse = await axios.get(
        `${REACT_APP_SERVER_URL}/recruiter/job/${jobbID}/applications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("recruiter")}`,
          },
        }
      );

      const jobs = jobResponse.data.allJobs;
      const applications = appResponse.data.applications;

      const mergedJobs = jobs.map((job) => {
        const mergedAppliedUsers = job.appliedUsers.map((appliedUser) => {
          const application = applications.find(
            (app) => app.userId === appliedUser.userId._id
          );
          return {
            ...appliedUser,
            status: application ? application.status : "Applied",
            applicationId: application ? application._id : null,
          };
        });
        return { ...job, appliedUsers: mergedAppliedUsers };
      });

      setCurrentJob(mergedJobs);
    } catch (error) {
      console.error("Error fetching job info:", error);
      setError({ isError: true, msg: "Could not load job data." });
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    if (!applicationId) {
      toast.error("Cannot update status: Application ID is missing.");
      return;
    }
    try {
      await axios.put(
        `${REACT_APP_SERVER_URL}/recruiter/application/${applicationId}/status`,
        { status: newStatus },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("recruiter")}`,
          },
        }
      );
      toast.success("Status updated successfully!");
      setCurrentJob((prevJobs) =>
        prevJobs.map((job) => ({
          ...job,
          appliedUsers: job.appliedUsers.map((user) =>
            user.applicationId === applicationId
              ? { ...user, status: newStatus }
              : user
          ),
        }))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status.");
    }
  };

  const handleScheduleClick = (user) => {
    setSelectedUser(user);
    setScheduleDialogOpen(true);
  };

  const handleScheduleClose = () => {
    setScheduleDialogOpen(false);
    setInterviewDetails({
      date: "",
      time: null,
      location: "",
      interviewerName: "",
    });
  };

  const handleScheduleSave = async () => {
    if (!selectedUser || !currentJob[0]) return;
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/recruiter/schedule-interview`,
        {
          userId: selectedUser.userId._id,
          jobId: currentJob[0]._id,
          ...interviewDetails,
          time: interviewDetails.time ? interviewDetails.time.toISOString() : null,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("recruiter")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Interview scheduled successfully!");
        handleScheduleClose();
      }
    } catch (error) {
      console.error("Failed to schedule interview:", error);
      toast.error("Failed to schedule interview.");
    }
  };

  const handleMarkComplete = (user) => {
    // This function logic seems to be illustrative; implemented as is.
    const candidatePhone = user.userId.phone || "the candidate"; // Assuming phone is available
    const thankYouMessage =
      `Thank you for attending the interview. We appreciate your time and effort!`;
    console.log(
      `Sending thank you message to ${candidatePhone}: ${thankYouMessage}`
    );
    toast.success("Completion marked & thank you message logged.");
  };

  const handleFeedbackChange = (applicationId, value) => {
    setFeedbacks(prev => ({ ...prev, [applicationId]: value }));
  };
  
  const handleSubmitFeedback = async (user) => {
    const feedback = feedbacks[user.applicationId];
    if (!feedback) {
      toast.error("Please provide feedback before submitting.");
      return;
    }
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/recruiter/post-feedback`,
        {
          userId: user.userId._id,
          jobId: currentJob[0]._id,
          feedback,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("recruiter")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Feedback submitted successfully!");
        handleFeedbackChange(user.applicationId, "");
      }
    } catch (error) {
      console.error("Failed to post feedback:", error);
      toast.error("Failed to post feedback");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, 
          gap: 1,
          p: { xs: 1, sm: 2 }, 
        }}
      >
    
        <Box
          sx={{
            width: { xs: "100%", md: "70%" }, 
            minHeight: "80vh",
          }}
        >
          {error.isError && <h1>{error.msg}</h1>}
          {currentJob.length > 0 && !error.isError && (
            <Box
              sx={{
                backgroundColor: "white",
                padding: { xs: 2, md: 3 },
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              <h3>{currentJob[0].roleName}</h3>
              <h4>{currentJob[0].companyName}</h4>
              <Box>
                <Box sx={centerItems}>
                  <WorkOutlineIcon />
                  {currentJob[0].experience}
                </Box>
                <Box sx={centerItems}>
                  <ApartmentIcon />
                  {currentJob[0].companyName}
                </Box>
                <Box sx={centerItems}>
                  <CurrencyRupeeIcon />
                  {currentJob[0].salary}
                </Box>
                <Box sx={centerItems}>
                  <ApartmentIcon />
                  {currentJob[0].location}
                </Box>
                <Box mt={3}>
                  <h3>About Us</h3>
                  <p>{currentJob[0].companyDescription}</p>
                </Box>
                <Box mt={3}>
                  <h3>Job Description</h3>
                  <p>{currentJob[0].JobDescription}</p>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* Applied Users Section (Sidebar) */}
        <Box
          sx={{
            width: { xs: "100%", md: "30%" }, // Full width on mobile, 30% on desktop
            height: { xs: "auto", md: "85vh" }, // Auto height on mobile
            border: "1px solid #ddd",
            borderRadius: "10px",
            overflowY: "auto",
            p: 2,
          }}
        >
          <h3>Applied Users</h3>
          <Box>
            {currentJob[0] && currentJob[0].appliedUsers.length > 0
              ? currentJob[0].appliedUsers
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <Box
                      key={item.applicationId || index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        border: "1px solid #ccc",
                        p: 2,
                        borderRadius: "10px",
                        mb: 2,
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Avatar
                          alt={item.userId.name}
                          src={item.userId.displayPicture}
                        />
                        <Link
                          to={`/recruiter/profile/resume/${currentJob[0]._id}/${item.userId._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <h6 style={{ fontSize: "1rem", margin: 0 }}>
                            {item.userId.name}
                          </h6>
                        </Link>
                        {item.isViewed && <DoneIcon sx={{ color: "green" }} />}
                      </Box>
                      
                      <FormControl fullWidth size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={item.status || "Applied"}
                          label="Status"
                          onChange={(e) =>
                            handleStatusChange(item.applicationId, e.target.value)
                          }
                        >
                          {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {/* Buttons now wrap on small screens */}
                      <Box sx={{ display: "flex", gap: "5px", width: "100%" }}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleScheduleClick(item)}
                        >
                          Schedule Interview
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="secondary"
                          onClick={() => handleMarkComplete(item)}
                        >
                          Mark as Complete
                        </Button>
                      </Box>
    
                      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
                        <TextField
                          label="Interview Feedback"
                          multiline
                          rows={3}
                          value={feedbacks[item.applicationId] || ''}
                          onChange={(e) => handleFeedbackChange(item.applicationId, e.target.value)}
                          fullWidth
                          variant="outlined"
                          size="small"
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ mt: 1}}
                          onClick={() => handleSubmitFeedback(item)}
                        >
                          Submit Feedback
                        </Button>
                      </Box>
                    </Box>
                  ))
              : <p>No applications yet.</p>}
          </Box>
        </Box>
      </Box>

      <ScheduleInterview
        open={scheduleDialogOpen}
        onClose={handleScheduleClose}
        onSave={handleScheduleSave}
        interviewDetails={interviewDetails}
        setInterviewDetails={setInterviewDetails}
      />
    </LocalizationProvider>
  );
};

export default ViewRecruiterJobs;