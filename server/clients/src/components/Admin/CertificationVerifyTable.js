import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { REACT_APP_SERVER_URL } from "../../config";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CertificationVerifyTable() {
  const [statusData, setStatusData] = useState([]);

  const token = useSelector((state) => state.auth.value);

  useEffect(() => {
    getCertification();
  }, []);

  const getCertification = async () => {
    const response = await axios
      .get(
        REACT_APP_SERVER_URL + "/user/getCertification",

        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.log(error, "@status error"));

    const data = await response.data.userInfo;
    setStatusData(data);
    console.log("sss", data);
  };

  const handleChange = async (event, userId) => {
    const approvalStatus = event.target.value;

    try {
      const response = await axios.put(
        `${
          REACT_APP_SERVER_URL + `/user/status/updateCertification/${userId}`
        }`,
        { approval: approvalStatus },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        }
      );

      console.log("response", response)
      if(response.status === 200){
        getCertification(); 
      }
      else{
        toast("Failed to update the Approval Status")
      }

      console.log("Response from verify", response.data.data);
    } catch (error) {
      console.error("Error fetching data for edit:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  // Function to calculate average rating
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return sum / ratings.length;
  };

  console.log("ststts", statusData)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell>Certificate Name</TableCell>
                <TableCell>Issued By</TableCell>
                <TableCell>Issued On</TableCell>
                <TableCell>Start Date</TableCell>
                
                  <TableCell>Expiry Date</TableCell>
                <TableCell>Certificate ID</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statusData.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{user.certificationName}</TableCell>
                  <TableCell>{user.issuedBy}</TableCell>
                  <TableCell>{user.certificateIssuedDate}</TableCell>
                  <TableCell>{user.startDate || "N/A"}</TableCell>
                 <TableCell>{user.expiryDate ? user.expiryDate :"-"}</TableCell>
                  <TableCell>{user.certificateId}</TableCell>

                  <TableCell>
                    <FormControl fullWidth style={{ marginTop: "1rem" }}>
                      <InputLabel
                        id="demo-simple-select-label"
                        style={{ backgroundColor: "white", padding: "0.1rem" }}
                      >
                        Approval Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user.approval === "true" ? "Approved" : "Not Approved"}
                        onChange={(event) => handleChange(event, user._id)}
                      >
                        <MenuItem value="Not Approved">Not Approved</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell>
                    {user.approval === "true" ? (
                      <Box
                        sx={{
                          color: "white",
                          padding: "0.5rem",
                          backgroundColor: "green",
                          display: "inline-block",
                        }}
                      >
                        Approved
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "inline-block",
                          color: "white",
                          padding: "0.5rem",
                          backgroundColor: "red",
                        }}
                      >
                        Not Approved
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
