// import { Box, Button } from "@mui/material";
// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import { Link } from "react-router-dom";
// const centerItems = {
//   display: "flex",
//   justifyContent: "flex-start",
//   alignItems: "center",
//   gap: "10px",
//   margin: "0.5rem 0",
// };

// const AppliedJobCard = ({ item, skillofUser }) => {
//   return (
//     <div className="applied-job-card">
//       <Box
//         key={Math.random() * 0.9999}
//         sx={{
//           backgroundColor: "white",
//           padding: "1rem",
//           border: "1px solid black",
//           display: "inline-block",
//           margin: "1rem",
//           borderRadius: "10px",
//           width:"20vw"
//         }}
//       >
//         {/* Heading */}
//         <Box>
//           <h3>
//             {" "}
//             {item.roleName
//               ? item.roleName.length <= 14
//                 ? item.roleName
//                 : item.roleName.slice(0, 12) + "..."
//               : ""}{" "}
//             <div
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 background: `${item.isClosed ? "red" : "#03C988"}`,
//                 borderRadius: "50%",
//                 display: "inline-block",
//               }}
//             ></div>
//           </h3>
//           <h4>
//             {item.companyName
//               ? item.companyName.length <= 14
//                 ? item.companyName
//                 : item.companyName.slice(0, 14) + "..."
//               : ""}{" "}
//           </h4>
//         </Box>
//         {/* Horizontal Columns */}
//         <Box>
//           <Box className='center-items'>
//             {" "}
//             <WorkOutlineIcon /> {item.experience} years
//           </Box>
//           <Box className='center-items'>
//             <CurrencyRupeeIcon />
//             {item.salary}
//           </Box>
//         </Box>
//         <Box className='center-items'>
//           <ApartmentIcon />
//           {item.location}
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             margin: "0.5rem 0",
//             alignItems: "center",
//           }}
//         >
//           <Box className='center-items'>
//             <DateRangeIcon />
//             {new Date(item.createdAt).toLocaleDateString()}
//           </Box>

//           <Box>
            
//           </Box>
//         </Box>
//         <Box>
//           <p style={{ color: "grey" }}>
//             {`${
//               item.appliedUsers.length !== 0
//                 ? item.appliedUsers.length + " Applications received"
//                 : "None applied"
//             } `}
//           </p>
//           <Link to={`/user/applied/${item._id}`}>
//               <p>View</p>
//             </Link>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default AppliedJobCard;


import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";

const AppliedJobCard = ({ item, skillofUser }) => {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          {/* Heading */}
          <h3 className="card-title">
            {item.roleName
              ? item.roleName.length <= 14
                ? item.roleName
                : item.roleName.slice(0, 12) + "..."
              : ""}
            <span
              className="dot ms-2"
              style={{
                background: `${item.isClosed ? "red" : "#03C988"}`,
              }}
            ></span>
          </h3>
          <h4 className="card-subtitle mb-2 text-muted">
            {item.companyName
              ? item.companyName.length <= 14
                ? item.companyName
                : item.companyName.slice(0, 14) + "..."
              : ""}
          </h4>
          {/* Horizontal Columns */}
          <div className="d-flex justify-content-between mb-2">
            <div className="center-items">
              <WorkOutlineIcon /> {item.experience} years
            </div>
            <div className="center-items">
              <CurrencyRupeeIcon /> {item.salary}
            </div>
          </div>
          <div className="center-items">
            <ApartmentIcon /> {item.location}
          </div>
          <div className="d-flex justify-content-between mb-2">
            <div className="center-items">
              <DateRangeIcon />{new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
          <p className="card-text text-muted">
            {item.appliedUsers.length !== 0
              ? item.appliedUsers.length + " Applications received"
              : "None applied"}
          </p>
          <Link to={`/user/applied/${item._id}`} className="card-link">View</Link>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobCard;
