
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScheduleInterview = ({
  open,
  onClose,
  onSave,
  interviewDetails,
  setInterviewDetails,
}) => {
  const handleSave = () => {
  
    const candidatePhone = interviewDetails.candidatePhone;

   
    const message = `Your interview is scheduled on ${interviewDetails.date} at ${interviewDetails.location} with ${interviewDetails.interviewerName}. Good luck!`;
    console.log(`Sending message to ${candidatePhone}: ${message}`);

  
    toast.success("Interview Scheduled");

    
    onSave();
  };

  

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Schedule Interview</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={interviewDetails.date}
            onChange={(e) =>
              setInterviewDetails({
                ...interviewDetails,
                date: e.target.value,
              })
            }
          />
          <TimePicker
            label="Time"
            fullWidth
            sx={{ marginTop: "10px" }}
            value={interviewDetails.time}
            onChange={(newValue) =>
              setInterviewDetails({
                ...interviewDetails,
                time: newValue,
              })
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <TextField
            label="Location"
            fullWidth
            sx={{ marginTop: "10px" }}
            value={interviewDetails.location}
            onChange={(e) =>
              setInterviewDetails({
                ...interviewDetails,
                location: e.target.value,
              })
            }
          />
          <TextField
            label="Interviewer Name"
            fullWidth
            sx={{ marginTop: "10px" }}
            value={interviewDetails.interviewerName}
            onChange={(e) =>
              setInterviewDetails({
                ...interviewDetails,
                interviewerName: e.target.value,
              })
            }
          />
          <TextField
            label="Candidate Phone"
            fullWidth
            sx={{ marginTop: "10px" }}
            value={interviewDetails.candidatePhone}
            onChange={(e) =>
              setInterviewDetails({
                ...interviewDetails,
                candidatePhone: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

  
    </>
  );
};

export default ScheduleInterview;
