// import { Box, Button, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";

// import ApartmentIcon from "@mui/icons-material/Apartment";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import EditIcon from "@mui/icons-material/Edit";
// import LanguageIcon from "@mui/icons-material/Language";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
// const Cards = (props) => {
//   const {
//     author,
//     company,
//     createdAt,
//     designation,
//     joblink,
//     location,
//     status,
//     updatedAt,
//     whereApply,
//     _id,
//   } = props.info;

//   let ApplyDate = new Date(createdAt).toLocaleDateString()
//   let d = new Date();
//   const [time, settime] = useState({ hour: d.getHours(), min: d.getMinutes() });

//   return (
//     <div>
//       <Box
//         sx={{
//           margin: "10px 0",
//           minHeight: "20vh",
//           width: "80%",
//           margin: "auto",
//           backgroundColor: "#2b3467",
//           borderRadius: "7px",
//           boxShadow: "5px 5px 10px #2C3333",
//           border: "5px solid #f9d923",
//         }}
//       >
//         <Box
//           sx={{
//             padding: "3%",
//             height: "100%",
//             color: "white",
//           }}
//         >
//           {/* <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//             }}
//           >
//             <Button
//               sx={{
//                 color: "white",
//               }}
//             >
//               <AppRegistrationIcon />
//             </Button>
//           </Box> */}
//           <Box
//             sx={{
//               height: "25%",
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <Box>
//               <Typography variant="h6">
//                 <ApartmentIcon /> {company}
//               </Typography>
//               <Typography variant="subtitle1">
//                 <LocationOnIcon />
//                 {location}
//               </Typography>
//             </Box>
//           </Box>
//           <Box
//             sx={{
//               height: "30%",
//               padding: "0 10px",
//               display: "flex",
//               justifyContent: "space-around",
//             }}
//           >
//             <Box>
//               <Typography variant="subtitle1">
//                 Designation: {designation}
//               </Typography>
//               <Box sx={{ display: "flex" }}>
//                 <Typography variant="subtitle1">Application Link:</Typography>
//                 <a
//                   className="linktag"
//                   rel="noopener noreferrer"
//                   href={joblink}
//                   target="_blank"
//                 >
//                   <LanguageIcon />
//                 </a>
//               </Box>
//             </Box>
//             <Box>
//               <Typography variant="subtitle1">Date: {ApplyDate}</Typography>
//               <Typography variant="subtitle1">Origin: {whereApply}</Typography>
//             </Box>
//           </Box>
//           <Box
//             sx={{
//               padding: "10px",
//               height: "30%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Box
//               sx={{
//                 flex: 1,
//                 width: "100%",
//                 textAlign: "center",
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: "bolder",
//                 }}
//               >
//                 {`Round: ${status[status.length - 1].round} ${
//                   status[status.length - 1].interviewType
//                 }`}
//               </Typography>
//             </Box>
//             <Box
//               sx={{
//                 flex: 1,
//                 width: "100%",
//               }}
//             >
//               <Box
//                 sx={{
//                   backgroundColor: "#11144C",
//                   border: "5px Solid #f9d923",
//                   borderRadius: "8px",
//                   display: "flex",
//                   justifyContent: "space-evenly",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box>
//                   <Typography
//                     component="h1"
//                     variant="h5"
//                     sx={{ fontWeight: "bolder" }}
//                   >
//                     Interview Date
//                   </Typography>

//                   <Typography
//                     component="h1"
//                     variant="h6"
//                     sx={{ fontWeight: "bold" }}
//                   >
//                     {new Date(
//                       status[status.length - 1].date
//                     ).toLocaleDateString()}
//                   </Typography>
//                 </Box>
//               </Box>
//               <br />
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Cards;
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from "@mui/material";

import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Cards = (props) => {
  const {
    company,
    createdAt,
    designation,
    joblink,
    location,
    status,
    whereApply,
  } = props.info;

  const [openModal, setOpenModal] = useState(false);

  const latestStatus =
    status && status.length ? status[status.length - 1] : null;

  const ApplyDate = new Date(createdAt).toLocaleDateString();

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case "Selected":
      case "Cleared":
        return "success";
      case "Rejected":
        return "error";
      case "Pending":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <>
      {/* ================= CARD UI ================= */}
      <Box
        sx={{
          width: { xs: "95%", sm: "85%", md: "70%" },
          margin: "20px auto",
          padding: "20px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          color: "white",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              <ApartmentIcon sx={{ mr: 1 }} />
              {company}
            </Typography>
            <Typography variant="body2">
              <LocationOnIcon sx={{ mr: 1 }} />
              {location}
            </Typography>
          </Box>

          {latestStatus && (
            <Chip
              label={latestStatus.status || "Ongoing"}
              color={getStatusColor(latestStatus.status)}
              sx={{ fontWeight: "bold" }}
            />
          )}
        </Box>

        {/* Body */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Role: {designation}
            </Typography>
            <Typography variant="body2">Applied: {ApplyDate}</Typography>
            <Typography variant="body2">Source: {whereApply}</Typography>
          </Box>

          {latestStatus && (
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Round {latestStatus.round} - {latestStatus.interviewType}
              </Typography>
              <Typography variant="body2">
                <CalendarMonthIcon sx={{ mr: 1 }} />
                {new Date(latestStatus.date).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Footer Buttons */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<VisibilityIcon />}
            onClick={() => setOpenModal(true)}
            sx={{
              backgroundColor: "#f9d923",
              color: "#000",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#ffd60a",
              },
            }}
          >
            View Details
          </Button>

          <Button
            variant="outlined"
            href={joblink}
            target="_blank"
            startIcon={<LanguageIcon />}
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": {
                borderColor: "#f9d923",
                color: "#f9d923",
              },
            }}
          >
            View Job
          </Button>
        </Box>
      </Box>

      {/* ================= MODAL ================= */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: "10px",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #1e3c72, #2a5298)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "16px 16px 0 0",
          }}
        >
          Interview Details
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Company</Typography>
          <Typography variant="h6" gutterBottom>
            {company}
          </Typography>

          <Typography variant="subtitle2">Role</Typography>
          <Typography gutterBottom>{designation}</Typography>

          {latestStatus && (
            <>
              <Typography variant="subtitle2">Round</Typography>
              <Typography gutterBottom>
                Round {latestStatus.round} - {latestStatus.interviewType}
              </Typography>

              <Typography variant="subtitle2">Interview Date</Typography>
              <Typography gutterBottom>
                {new Date(latestStatus.date).toLocaleDateString()}
              </Typography>

              <Typography variant="subtitle2">Result</Typography>
              <Typography fontWeight="bold">
                {latestStatus.status || "Pending"}
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOpenModal(false)}
            sx={{
              backgroundColor: "#2b3467",
              borderRadius: "10px",
              px: 4,
              "&:hover": {
                backgroundColor: "#1e3c72",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cards;