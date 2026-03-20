// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Grid,
//   Box,
//   Typography,
//   IconButton,
//   MenuItem,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { AddItemToStatus } from "../../../redux/reducers/application.data";
// import { ShowNotification } from "../../../redux/reducers/notification.data";
// import { REACT_APP_SERVER_URL } from "../../../config";

// const AddStatus = (props) => {
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const rowData = props.rowData || location.state?.rowData;
//   const applicationId =
//     props.applicationId || location.state?.applicationId;

//   const isEdit = !!rowData;

//   const token = useSelector((state) => state.auth.value);
//   const { finalStatus } = props.info || {};

//   // -------------------- STATES --------------------
//   const [round, setRound] = useState(1);
//   const [interviewType, setInterviewType] = useState("Written Test");
//   const [interviewStatus, setInterviewStatus] = useState("Pending");
//   const [interviewMode, setInterviewMode] = useState("Online");
//   const [interviewDate, setInterviewDate] = useState("");
//   const [interviewerContact, setContact] = useState("");
//   const [notes, setNotes] = useState("");
//   const [interviewerName, setInterviewerName] = useState("");

//   // -------------------- PREFILL --------------------
//   useEffect(() => {
//     if (rowData) {
//       setRound(rowData.round);
//       setInterviewType(rowData.interviewType || "Written Test");
//       setInterviewStatus(rowData.status || "Pending");
//       setInterviewMode(rowData.interviewMode || "Online");
//       setInterviewDate(rowData.date || "");
//       setContact(rowData.interviewerContact || "");
//       setNotes(rowData.notes || "");
//       setInterviewerName(rowData.interviewerName || "");
//     } else if (finalStatus) {
//       setRound(Number(finalStatus.round) + 1);
//     }
//   }, [rowData, finalStatus]);

//   // -------------------- VALIDATION --------------------
//   const buttonController = () => {
//     return (
//       interviewType &&
//       interviewDate &&
//       interviewerName &&
//       interviewMode
//     );
//   };

//   // -------------------- SUBMIT --------------------
//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const detail = {
//       round,
//       interviewType,
//       status: interviewStatus,
//       date: interviewDate,
//       notes,
//       interviewerName,
//       interviewMode,
//       interviewerContact,
//     };

//     if (isEdit) {
//       detail.applicationId = applicationId;
//       detail._id = rowData._id;
//     } else {
//       detail.postID = props.info?._id;
//       detail.author = props.info?.author;
//     }

//     const url = isEdit
//       ? `${REACT_APP_SERVER_URL}/user/application/editstatus`
//       : `${REACT_APP_SERVER_URL}/user/application`;

//     try {
//       const response = await axios.put(url, detail, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 201) {
//         dispatch(AddItemToStatus(detail));
//         dispatch(
//           ShowNotification({
//             visible: true,
//             message: isEdit
//               ? "Status updated successfully!"
//               : "Status added successfully!",
//           })
//         );
//         props.handleClose();
//       }
//     } catch (error) {
//       console.error("Error submitting:", error);
//     }
//   };

//   // -------------------- UI --------------------
//   return (
//     <Dialog
//       open={props.open}
//       onClose={props.handleClose}
//       fullWidth
//       maxWidth="xs"
//       PaperProps={{
//         sx: {
//           borderRadius: "20px",
//           width: "420px",
//           overflow: "hidden",
//         },
//       }}
//     >
//       {/* HEADER */}
//       <Box
//         sx={{
//           p: 3,
//           borderBottom: "1px solid #eee",
//           position: "relative",
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="600"
//           sx={{ color: "#1e3c72" }}
//         >
//           {isEdit ? `Update Round ${round}` : `Add Round ${round}`}
//         </Typography>

//         <Typography
//           variant="body2"
//           sx={{ color: "#6b7280", mt: 0.5 }}
//         >
//           Keep track of your interview progress.
//         </Typography>

//         <IconButton
//           onClick={props.handleClose}
//           sx={{ position: "absolute", right: 12, top: 12 }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       {/* CONTENT */}
//       <DialogContent sx={{ p: 3 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Interview Round"
//               size="small"
//               fullWidth
//               disabled
//               value={round}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               select
//               label="Interview Type"
//               fullWidth
//               size="small"
//               value={interviewType}
//               onChange={(e) =>
//                 setInterviewType(e.target.value)
//               }
//             >
//               <MenuItem value="Written Test">
//                 Written Test
//               </MenuItem>
//               <MenuItem value="Technical">
//                 Technical
//               </MenuItem>
//               <MenuItem value="HR Manager">
//                 HR Round
//               </MenuItem>
//               <MenuItem value="Group Discussion">
//                 Group Discussion
//               </MenuItem>
//             </TextField>
//           </Grid>

//           {/* TWO COLUMN */}
//           <Grid item xs={6}>
//             <TextField
//               label="Interviewer Name"
//               size="small"
//               fullWidth
//               value={interviewerName}
//               onChange={(e) =>
//                 setInterviewerName(e.target.value)
//               }
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               label="Contact"
//               size="small"
//               fullWidth
//               value={interviewerContact}
//               onChange={(e) =>
//                 setContact(e.target.value)
//               }
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               type="datetime-local"
//               label="Interview Date"
//               size="small"
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//               value={interviewDate}
//               onChange={(e) =>
//                 setInterviewDate(e.target.value)
//               }
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               select
//               label="Current Status"
//               size="small"
//               fullWidth
//               value={interviewStatus}
//               onChange={(e) =>
//                 setInterviewStatus(e.target.value)
//               }
//             >
//               <MenuItem value="Pending">Pending</MenuItem>
//               <MenuItem value="Cleared">Cleared</MenuItem>
//               <MenuItem value="Rejected">Rejected</MenuItem>
//               <MenuItem value="Selected">Selected</MenuItem>
//             </TextField>
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               label="Internal Notes"
//               size="small"
//               multiline
//               rows={3}
//               fullWidth
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>

//       {/* FOOTER */}
//       <DialogActions sx={{ p: 3, pt: 1 }}>
//         <Button
//           fullWidth
//           variant="contained"
//           onClick={submitHandler}
//           disabled={!buttonController()}
//           sx={{
//             borderRadius: "10px",
//             textTransform: "none",
//             fontWeight: 600,
//             background:
//               "linear-gradient(90deg,#2563eb,#1e40af)",
//             "&:hover": {
//               background:
//                 "linear-gradient(90deg,#1e40af,#1e3a8a)",
//             },
//           }}
//         >
//           {isEdit
//             ? "Update Interview Round"
//             : "Save Interview Round"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddStatus;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Divider,
  InputAdornment,
} from "@mui/material";

// Icons

import CloseIcon from "@mui/icons-material/Close";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import NotesIcon from "@mui/icons-material/Notes";
import BadgeIcon from "@mui/icons-material/Badge";

// Redux & Routing
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { AddItemToStatus } from "../../../redux/reducers/application.data";
import { ShowNotification } from "../../../redux/reducers/notification.data";
import { REACT_APP_SERVER_URL } from "../../../config";

const AddStatus = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const rowData = props.rowData || location.state?.rowData;
  const applicationId = props.applicationId || location.state?.applicationId;
  const isEdit = !!rowData;

  const token = useSelector((state) => state.auth.value);
  const { finalStatus } = props.info || {};

  // --- State ---
  const [round, setRound] = useState(1);
  const [interviewType, setInterviewType] = useState("Written Test");
  const [interviewStatus, setInterviewStatus] = useState("Pending");
  const [interviewMode, setInterviewMode] = useState("Online");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewerContact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [interviewerName, setInterviewerName] = useState("");

  useEffect(() => {
    if (rowData) {
      setRound(rowData.round);
      setInterviewType(rowData.interviewType || "Written Test");
      setInterviewStatus(rowData.status || "Pending");
      setInterviewMode(rowData.interviewMode || "Online");
      setInterviewDate(rowData.date || "");
      setContact(rowData.interviewerContact || "");
      setNotes(rowData.notes || "");
      setInterviewerName(rowData.interviewerName || "");
    } else if (finalStatus) {
      setRound(Number(finalStatus.round) + 1);
    }
  }, [rowData, finalStatus]);

  const buttonController = () => {
    return interviewType && interviewDate && interviewerName && interviewMode;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const detail = {
      round,
      interviewType,
      status: interviewStatus,
      date: interviewDate,
      notes,
      interviewerName,
      interviewMode,
      interviewerContact,
    };

    if (isEdit) {
      detail.applicationId = applicationId;
      detail._id = rowData._id;
    } else {
      detail.postID = props.info?._id;
      detail.author = props.info?.author;
    }

    const url = isEdit
      ? `${REACT_APP_SERVER_URL}/user/application/editstatus`
      : `${REACT_APP_SERVER_URL}/user/application`;

    try {
      const response = await axios.put(url, detail, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        dispatch(AddItemToStatus(detail));
        dispatch(
          ShowNotification({
            visible: true,
            message: isEdit
              ? "Status updated successfully!"
              : "Status added successfully!",
          })
        );
        props.handleClose();
      }
    } catch (error) {
      console.error("Error submitting:", error);
      dispatch(
        ShowNotification({
          visible: true,
          message: "Something went wrong. Please try again.",
          severity: "error"
        })
      );
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          background: "#fcfdfe",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* HEADER SECTION */}
      <Box
        sx={{
          p: 2.5,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#ffffff",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              backgroundColor: "#eff6ff",
              p: 1,
              borderRadius: "10px",
              display: "flex",
            }}
          >
            <EventNoteIcon sx={{ color: "#2563eb" }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ lineHeight: 1 }}>
              Interview Details
            </Typography>
            <Typography variant="h6" fontWeight="800" sx={{ color: "#1e293b" }}>
              {isEdit ? `Update Round ${round}` : `Add Round ${round}`}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={props.handleClose}
          sx={{ color: "#94a3b8", "&:hover": { color: "#ef4444", bgcolor: "#fef2f2" } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3, mt: 1 }}>
        <Grid container spacing={2.5}>
          {/* Interview Type */}
          <Grid item xs={12} sm={8}>
            <TextField
              select
              label="Interview Type"
              size="small"
              fullWidth
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon fontSize="small" sx={{ color: "#2563eb" }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="Written Test">Written Test</MenuItem>
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="HR Manager">HR Round</MenuItem>
              <MenuItem value="Group Discussion">Group Discussion</MenuItem>
            </TextField>
          </Grid>

          {/* Interview Mode */}
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Mode"
              size="small"
              fullWidth
              value={interviewMode}
              onChange={(e) => setInterviewMode(e.target.value)}
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="In-Person">In-Person</MenuItem>
              <MenuItem value="Telephonic">Telephonic</MenuItem>
            </TextField>
          </Grid>

          {/* Interviewer Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Interviewer Name"
              placeholder="John Doe"
              size="small"
              fullWidth
              value={interviewerName}
              onChange={(e) => setInterviewerName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact / Email"
              placeholder="example@company.com"
              size="small"
              fullWidth
              value={interviewerContact}
              onChange={(e) => setContact(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon fontSize="small" sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Date Picker */}
          <Grid item xs={12} sm={6}>
            <TextField
              type="datetime-local"
              label="Schedule Date & Time"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
          </Grid>

          {/* Status Selection */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Current Result"
              size="small"
              fullWidth
              value={interviewStatus}
              onChange={(e) => setInterviewStatus(e.target.value)}
              sx={{
                '& .MuiSelect-select': {
                  fontWeight: 600,
                  color: interviewStatus === 'Cleared' ? '#16a34a' : interviewStatus === 'Rejected' ? '#dc2626' : '#2563eb'
                }
              }}
            >
              <MenuItem value="Pending"> Pending</MenuItem>
              <MenuItem value="Cleared"> Cleared</MenuItem>
              <MenuItem value="Rejected"> Rejected</MenuItem>
              <MenuItem value="Selected"> Selected</MenuItem>
            </TextField>
          </Grid>

          {/* Notes */}
          <Grid item xs={12}>
            <TextField
              label="Internal Interview Notes"
              placeholder="Add key takeaways from the interview..."
              size="small"
              multiline
              rows={4}
              fullWidth
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                    <NotesIcon fontSize="small" sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <Divider sx={{ borderStyle: "dashed" }} />

      <DialogActions sx={{ p: 3, bgcolor: "#ffffff" }}>
        <Button
          fullWidth
          variant="contained"
          disabled={!buttonController()}
          onClick={submitHandler}
          sx={{
            textTransform: "none",
            fontSize: "0.95rem",
            fontWeight: 700,
            borderRadius: "12px",
            py: 1.4,
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
            background: "linear-gradient(135deg,#2563eb 0%,#1e40af 100%)",
            "&:hover": {
              background: "linear-gradient(135deg,#1e40af 0%,#1e3a8a 100%)",
              boxShadow: "0 6px 16px rgba(37, 99, 235, 0.3)",
            },
            "&.Mui-disabled": {
              background: "#e2e8f0",
              color: "#94a3b8",
            }
          }}
        >
          {isEdit ? "Update Interview Record" : "Confirm & Save Round"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStatus;