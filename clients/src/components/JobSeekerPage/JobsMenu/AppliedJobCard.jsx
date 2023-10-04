import { Box, Button } from "@mui/material";
import React from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";
const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};

const AppliedJobCard = ({ item, skillofUser }) => {
  
  return (
    <div >
      <Box
        key={Math.random() * 0.9999}
        sx={{
          backgroundColor: "white",
          padding: "1rem",
          border: "1px solid black",
          display: "inline-block",
          margin: "1rem",
          borderRadius: "10px",
        }}
      >
        {/* Heading */}
        <Box>
          <h3>
            {" "}
            {item.roleName}{" "}
            <div
              style={{
                width: "10px",
                height: "10px",
                background: `${item.isClosed ? "red" : "#03C988"}`,
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></div>
          </h3>
          <h4>{item.companyName}</h4>
        </Box>
        {/* Horizontal Columns */}
        <Box>
          <Box sx={centerItems}>
            {" "}
            <WorkOutlineIcon /> {item.experience} years
          </Box>
          <Box sx={centerItems}>
            <CurrencyRupeeIcon />
            {item.salary}
          </Box>
        </Box>
        <Box sx={centerItems}>
          <ApartmentIcon />
          {item.location}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0.5rem 0",
            alignItems: "center",
          }}
        >
          <Box sx={centerItems}>
            <DateRangeIcon />
            {new Date(item.createdAt).toLocaleDateString()}
          </Box>

          <Box>
            <Link to={`/user/applied/${item._id}`}>
              <Button>View</Button>
            </Link>
          </Box>
        </Box>
        <Box>
          <p style={{ color: "grey" }}>
            {`${
              item.appliedUsers.length !== 0
                ? item.appliedUsers.length + " Applications received"
                : "None applied"
            } `}
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default AppliedJobCard;
