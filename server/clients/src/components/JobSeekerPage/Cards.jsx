// import { Box, Button, Typography } from "@mui/material";
// import React, { useState } from "react";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import EditIcon from "@mui/icons-material/Edit";
// import LanguageIcon from "@mui/icons-material/Language";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import Popup from "./Utils/PopupStatus";
// import BasicTable from "./Utils/Table";

// const Cards = (props) => {
//   const [isOpenTable, setIsOpenTable] = useState(false);
//   const { _id, author, status, company, location, designation, whereApply, joblink, updatedAt } = props.data;
//   //console.log("Props from Cards", props.data);
  
//   const finalStatus = status.length ? status[status.length - 1] : null;
  
//   const date = new Date(updatedAt);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Cleared":
//         return "#FF8006";
//       case "Rejected":
//         return "#FF6464";
//       case "Pending":
//         return "#F9D923";
//       case "Selected":
//         return "#49FF00";
//       default:
//         return "grey";
//     }
//   };
//   const color = finalStatus ? getStatusColor(finalStatus.status) : "grey";

//   return (
//     <Box
//       className=""
//       sx={{
//         marginTop: "25px",
//         padding: "10px 0",
//         minHeight: "10vh",
//         width: "100%",
//         backgroundColor: "#2b3467",
//         borderRadius: "7px",
//         boxShadow: "5px 5px 10px #2C3333",
//         border: `5px solid ${color}`
//       }}
//     >
//       <Box
//         sx={{
//           padding: "3%",
//           height: "100%",
//           color: "white",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box>
//             <Typography
//               variant="h6"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 fontWeight: "bold",
//               }}
//             >
//               <ApartmentIcon />
//               &nbsp;{company}
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 fontWeight: "bold",
//               }}
//             >
//               <LocationOnIcon />
//               &nbsp;{location}
//             </Typography>
//           </Box>
//           <Box>
//             <Popup
//               content={<EditIcon />}
//               info={{ _id, author, finalStatus }}
//               title="Edit Post"
//             />
//           </Box>
//         </Box>
//         <Box
//           sx={{
//             height: "30%",
//             padding: "0 10px",
//             display: "flex",
//             justifyContent: "space-around",
//           }}
//         >
//           <Box>
//             <Typography variant="subtitle1">
//               Designation : {designation}
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{ display: "flex", alignItems: "center" }}
//               >
//                 Link &nbsp;
//                 <LanguageIcon /> &nbsp;:
//               </Typography>
//               <a
//                 className="linktag"
//                 rel="noopener noreferrer"
//                 href={joblink}
//                 target="_blank"
//               >
//                 &nbsp; Click here
//               </a>
//             </Box>
//           </Box>
//           <Box>
//             <Typography variant="subtitle1">
//               Last Updated: {date.toLocaleDateString()}
//             </Typography>
//             <Typography variant="subtitle1">Origin: {whereApply}</Typography>
//           </Box>
//         </Box>
//         <Box
//           sx={{
//             padding: "10px",
//             height: "20%",
//           }}
//         >
//           <Typography variant="h5">
//             {finalStatus
//               ? `Round:${finalStatus.round} ${finalStatus.interviewType} ${finalStatus.status}`
//               : `Click the pencil icon to add the status`}
//           </Typography>
//           <Typography variant="subtitle1">
//             Click View button to see more details...
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             height: "25%",
//             display: "flex",
//             justifyContent: "space-around",
//             alignItems: "flex-start",
//             marginTop: "10px",
//           }}
//         >
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#E93B81",
//               "&:hover": {
//                 backgroundColor: "#E93B81",
//               },
//             }}
//             onClick={() => setIsOpenTable(!isOpenTable)}
//           >
//             <VisibilityIcon sx={{ padding: "0 5px" }} />
//             {isOpenTable ? "Hide" : "View"}
//           </Button>
//           <Typography
//             variant="subtitle1"
//             sx={{
//               backgroundColor: `${color}`,
//               padding: "8px",
//               borderRadius: "7px",
//               color:'black',
//             }}
//           >
//             {finalStatus ? `Status: ${finalStatus.status}` : "None"}
//           </Typography>
//         </Box>
//         {/* Table in the Card */}
//         {isOpenTable && <BasicTable status={status} view={isOpenTable} application_id={_id} />}
//       </Box>
//     </Box>
//   );
// };

// export default Cards;

import { Box, Button, Typography, Divider, Chip } from "@mui/material";
import React, { useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import LanguageIcon from "@mui/icons-material/Language";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Popup from "./Utils/PopupStatus";
import BasicTable from "./Utils/Table";

const Cards = (props) => {
  const [isOpenTable, setIsOpenTable] = useState(false);
  const { _id, author, status, company, location, designation, whereApply, joblink, updatedAt } = props.data;

  const finalStatus = status.length ? status[status.length - 1] : null;
  const date = new Date(updatedAt);

  const getStatusColor = (status) => {
    switch (status) {
      case "Cleared":
        return "#FF8006";
      case "Rejected":
        return "#FF6464";
      case "Pending":
        return "#F9D923";
      case "Selected":
        // return "#49FF00";
        return "#2AAA8A";
      default:
        return "grey";
    }
  };
  const color = finalStatus ? getStatusColor(finalStatus.status) : "grey";

  return (
    <Box
      sx={{
        marginTop: "25px",
        padding: "20px",
        width: "100%",
        backgroundColor: "#2b3467",
        borderRadius: "6px",
        boxShadow: "5px 5px 15px rgba(0,0,0,0.4)",
        // borderLeft: `8px solid ${color}`,
        border : `6px solid ${color}`,
        color: "white",
      }}
    >
      {/* Top Row: Company + Edit */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
            <ApartmentIcon sx={{ mr: 1 }} /> {company}
          </Typography>
          <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon sx={{ mr: 1 }} /> {location}
          </Typography>
        </Box>
        <Popup  content={<EditIcon sx={{ cursor: "pointer" }} />} info={{ _id, author, finalStatus }} title="Edit Post" />
      </Box>

      <Divider sx={{ my: 2, borderBottomWidth: 3, bgcolor: "rgba(255,255,255,0.2)" }} />

      {/* Job Info */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography variant="body1">Designation: <strong>{designation}</strong></Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <LanguageIcon sx={{ mr: 1 }} />
            <a href={joblink} target="_blank" rel="noopener noreferrer" className="linktag" style={{ color: "#61dafb", textDecoration: "underline" }}>
              Click here
            </a>
          </Box>
        </Box>
        <Box textAlign={{ xs: "left", sm: "right" }}>
          <Typography variant="body2">Last Updated: {date.toLocaleDateString()}</Typography>
          <Typography variant="body2">Origin: {whereApply}</Typography>
        </Box>
      </Box>

      {/* <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.2)" }} /> */}

      {/* Status */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {finalStatus
            ? `Round: ${finalStatus.round} - ${finalStatus.interviewType} - ${finalStatus.status}`
            : "Click the pencil icon to add the status"}
        </Typography>
        <Chip
          label={finalStatus ? `Status: ${finalStatus.status}` : "None"}
          sx={{
            backgroundColor: color,
            color: "black",
            fontWeight: "bold",
          }}
        />
      </Box>

      {/* Actions */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-start", gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#E93B81",
            "&:hover": { backgroundColor: "#E93B81" },
          }}
          onClick={() => setIsOpenTable(!isOpenTable)}
        >
          <VisibilityIcon sx={{ mr: 1 }} />
          {isOpenTable ? "Hide" : "View"}
        </Button>
      </Box>

      {/* Table */}
      {isOpenTable && <Box mt={2}><BasicTable status={status} view={isOpenTable} application_id={_id} /></Box>}
    </Box>
  );
};

export default Cards;

