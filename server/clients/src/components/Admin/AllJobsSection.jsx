// import { Box, Button, Typography } from "@mui/material";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import Axios from "axios";
// import { AddJobs } from "../../redux/reducers/AllJobDetails";
// import { Link } from "react-router-dom";

// const AllJobsSection = () => {
//   const allJobs = useSelector((state) => state.allJobs.value);
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   console.log("Working")
//   //   NetworkRequest();
//   // },[]);
//   // const NetworkRequest = async () => {
//   //   const { data } = await Axios.get(
//   //     `${process.env.REACT_APP_SERVER_URL + "/admin/jobs"}`,
//   //     {
//   //       headers: {
//   //         "Content-type": "application/json",
//   //         Authorization: `Bearer ${localStorage.getItem("admin")}`,
//   //       },
//   //     }
//   //   );
//   //   console.log(data.allJobs)
//   //   dispatch(AddJobs(data.allJobs));
//   // };

//   const centerItems = {
//     display: "flex",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     gap: "10px",
//     margin: "0.5rem 0",
//   };

//   return (
//     <>
//       <Typography
//         variant="h5"
//         sx={{
//           margin: "1rem",
//           fontWeight: "600",
//         }}
//       >
//         The Applications You have Created
//       </Typography>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         {allJobs.length !== 0 ? (
//           allJobs.map((item, index) => (
//             <Box
//               key={Math.random() * 0.9999}
//               sx={{
//                 width: "100%",
//                 backgroundColor: "white",
//                 padding: "1rem",
//                 border: "1px solid black",
//                 // display: "inline-block",
//                 margin: "0.5rem 0",
//                 borderRadius: "10px",
//               }}
//             >
//               {/* Heading */}
//               <Box>
//                 <h3>
//                   {" "}
//                   {item.roleName
//                     ? item.roleName.length <= 14
//                       ? item.roleName
//                       : item.roleName.slice(0, 12) + "..."
//                     : ""}{" "}
//                   <div
//                     style={{
//                       width: "10px",
//                       height: "10px",
//                       background: `${item.isClosed ? "red" : "#03C988"}`,
//                       borderRadius: "50%",
//                       display: "inline-block",
//                     }}
//                   ></div>
//                 </h3>
//                 <h4>
//                   {/* {item.companyName} */}
//                   {item.companyName
//                     ? item.companyName.length <= 14
//                       ? item.companyName
//                       : item.companyName.slice(0, 14) + "..."
//                     : ""}{" "}
//                 </h4>
//               </Box>
//               {/* Horizontal Columns */}
//               <Box>
//                 <Box sx={centerItems}>
//                   {" "}
//                   <WorkOutlineIcon /> {item.experience} years
//                 </Box>
//                 <Box sx={centerItems}>
//                   <CurrencyRupeeIcon />
//                   {item.salary}
//                 </Box>
//               </Box>
//               <Box sx={centerItems}>
//                 <ApartmentIcon />
//                 {item.location}
//               </Box>
//               <Box
//                 sx={{
//                   margin: "0.5rem 0",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box sx={centerItems}>
//                   <DateRangeIcon />
//                   {new Date(item.createdAt).toLocaleDateString()}
//                 </Box>
//                 {/* <Box>
//                   <Link to={`/admin/jobs/${item._id}`}>
//                     <Button>View</Button>
//                   </Link>
//                 </Box> */}
//               </Box>
//               <Box>
                
//                 Views:
//                 <Box sx={{display:"flex",gap:"8px"}}>
//                   <p style={{ color: "grey" }}>
//                   all:{item.allViews}
//                   </p>
//                   <p style={{ color: "grey" }}>
//                   unique:{item.uniqueViews}
//                   </p>
//                 </Box>
//                 <p style={{ color: "grey" }}>
//                   {`${
//                     item.appliedUsers.length !== 0
//                       ? item.appliedUsers.length + " Applications received"
//                       : "None applied"
//                   } `}
//                 </p>
//                 <Link to={`/admin/jobs/${item._id}`}>
//                   <p>View</p>
//                 </Link>
//               </Box>
//             </Box>
//           ))
//         ) : (
//           <></>
//         )}
//       </Box>
//     </>
//   );
// };

// export default AllJobsSection;


import { Button, Typography } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Axios from "axios";
import { AddJobs } from "../../redux/reducers/AllJobDetails";
import { Link } from "react-router-dom";

import { WhatsappShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'react-toastify';

  
const AllJobsSection = () => {
  const allJobs = useSelector((state) => state.allJobs.value);
  console.log("all jobs", allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    // NetworkRequest();
  }, []);

  const generateJobUrl = (jobId) => {
    const baseUrl = 'https://www.app.careersheets.in/user/jobs/';
    return baseUrl + jobId;
  }

  const handleCopy =() =>{
    toast("Copied to Clipboard");
  }

  return (
    <>
      <Typography variant="h5" className="mt-4 mb-3 fw-bold">
        The Applications You have Created
      </Typography>
      
      <div className="row">
        {allJobs.length !== 0 ? (
          allJobs.map((item, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 col-sm-12 mb-3"
            >
              <div className="p-3 border rounded">
                <h3 className="mb-2">
                  {item.roleName
                    ? item.roleName.length <= 14
                      ? item.roleName
                      : item.roleName.slice(0, 12) + "..."
                    : ""}{" "}
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      background: `${item.isClosed ? "red" : "#03C988"}`,
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></span>
                </h3>
                <h4>
                  {item.companyName
                    ? item.companyName.length <= 14
                      ? item.companyName
                      : item.companyName.slice(0, 14) + "..."
                    : ""}
                </h4>
                <div className="d-flex align-items-center mb-2">
                  <WorkOutlineIcon />
                  <span className="ms-1">{item.experience} years</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <CurrencyRupeeIcon />
                  <span className="ms-1">{item.salary}</span>
                </div>
                <div className="mb-2">
                  <ApartmentIcon />
                  <span className="ms-1">{item.location}</span>
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <DateRangeIcon />
                  <span className="ms-1">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mb-2 d-flex gap-2">
                  <p style={{ color: "grey" }}>all:{item.allViews}</p>
                  <p style={{ color: "grey" }}>unique:{item.uniqueViews}</p>
                </div>
                <p style={{ color: "grey" }}>
                  {item.appliedUsers.length !== 0
                    ? item.appliedUsers.length + " Applications received"
                    : "None applied"}
                </p>
                 { item.isClosed !== true && ( 
                 <div className="d-flex gap-2">
                  <WhatsappShareButton url={generateJobUrl(item._id)}>
                    <Button variant="contained" color="primary">
                      Share on Whatsapp
                    </Button>
                  </WhatsappShareButton>
                  <CopyToClipboard text={generateJobUrl(item._id)}>
                    <Button variant="contained" color="primary" onClick={handleCopy}>
                      Copy Link
                    </Button>
                  </CopyToClipboard>
                </div>
              )}

                <br />
                <Link to={`/admin/jobs/${item._id}`}>
                  <Button variant="contained" color="primary">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="body1">No jobs available.</Typography>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default AllJobsSection;
