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
  const [feedback, setFeedback] = useState("");
  const [feedbackPosted, setFeedbackPosted] = useState(false);

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
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/recruiter/schedule-interview`,
        {
          userId: selectedUser.userId._id,
          jobId: currentJob[0]._id,
          ...interviewDetails,
          time: interviewDetails.time.toISOString(),
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("recruiter")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Interview scheduled successfully!");
        handleScheduleClose();
      }
    } catch (error) {
      console.error("Failed to schedule interview:", error);
    }
  };

  const handleMarkComplete = () => {
    if (feedback) {
      setFeedback("");
    }
    const candidatePhone = interviewDetails.candidatePhone;
    const thankYouMessage =
      "Thank you for attending the interview. We appreciate your time and effort!";
    console.log(
      `Sending thank you message to ${candidatePhone}: ${thankYouMessage}`
    );
    toast.success("Thank you message sent");
  };

  const handleSubmitFeedback = async () => {
    if (!feedback) {
      toast.error("Please provide feedback before submitting.");
      return;
    }
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/recruiter/post-feedback`,
        {
          userId: selectedUser.userId._id,
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
        setFeedback("");
      }
    } catch (error) {
      console.error("Failed to post feedback:", error);
      toast.error("Failed to post feedback");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Box display={{ display: "flex", flexDirection: "row-reverse" }}>
        <Box
          sx={{
            width: "25%",
            height: "80vh",
            margin: "1rem",
            padding: "0.5rem",
            border: "1px solid black",
            borderRadius: "10px",
            overflowY: "auto",
          }}
        >
          <h3>Applied Users</h3>
          <Box sx={{ padding: "1rem" }}>
            {currentJob[0]
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
                        border: "1px solid black",
                        padding: "0.5rem",
                        borderRadius: "10px",
                        marginBottom: "0.5rem",
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
                          <h6 style={{ fontSize: "1rem" }}>
                            {item.userId.name.slice(0, 7)}....
                          </h6>
                        </Link>
                        {item.isViewed && <DoneIcon sx={{ color: "green" }} />}
                      </Box>
                      
                      <Box sx={{ width: "100%", mt: 2, mb: 1 }}>
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
                      </Box>

                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleScheduleClick(item)}
                          sx={{ marginTop: "10px" }}
                        >
                          Schedule Interview
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleMarkComplete}
                          sx={{ marginTop: "10px" }}
                        >
                          Mark as Complete
                        </Button>
                      </Box>

                      <Box sx={{ marginTop: "1rem" }}>
                        <TextField
                          label="Interview Feedback"
                          multiline
                          rows={4}
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          fullWidth
                          variant="outlined"
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginTop: "1rem" }}
                          onClick={handleSubmitFeedback}
                        >
                          Submit Feedback
                        </Button>
                      </Box>
                    </Box>
                  ))
              : "None applied"}
          </Box>
        </Box>

        <Box
          sx={{
            padding: "1rem",
            width: "75%",
            minHeight: "80vh",
          }}
        >
          {error.isError ? <h1>{error.msg}</h1> : ""}
          {currentJob.length > 0 && !error.isError && (
            <Box
              sx={{
                backgroundColor: "white",
                padding: "1rem",
                border: "1px solid black",
                margin: "1rem",
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
                <Box>
                  <h3>About Us</h3>
                  <p>{currentJob[0].companyDescription}</p>
                </Box>
                <Box>
                  <h3>Job Description</h3>
                  <p>{currentJob[0].JobDescription}</p>
                </Box>
              </Box>
            </Box>
          )}
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