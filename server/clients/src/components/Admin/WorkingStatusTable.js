import * as React from "react";
import { useState, useEffect } from 'react';
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
import { Box, Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { REACT_APP_SERVER_URL } from "../../config";


export default function WorkingStatusTable() {
    
  const [statusData, setStatusData] = useState([]);

  console.log("Status from admin date", statusData);
  
  useEffect(() => {
    fetchStatusData();
  }, []);

  const fetchStatusData = async (req, res) => {
    try {
        const { data } = await axios.get(
            `${REACT_APP_SERVER_URL + `/user/status/getStatusAdmin`}`,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("admin")}`,
              },
            }
          );
      setStatusData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = async (event,userId) => {
    const approvalStatus = event.target.value;

    try {
        const { data } = await axios.put(
            `${REACT_APP_SERVER_URL + `/user/status/updateApproval/${userId}`}`,
            {approval: approvalStatus},
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("admin")}`,
              },
            }
          );
        console.log("Response from verify",data);
        fetchStatusData();
    } catch (error) {
      console.error('Error fetching data for edit:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>College</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Tips</TableCell>
                <TableCell>Approval Option</TableCell>
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
                  <TableCell>{user.studentName}</TableCell>
                  <TableCell>{user.college}</TableCell>
                  <TableCell>{formatDate(user.date)}</TableCell>
                  <TableCell>{user.views}</TableCell>
                  <TableCell>{user.skills}, {user.tips}</TableCell>
                  <TableCell>
                            <FormControl fullWidth style={{marginTop:"1rem"}}>
                                <InputLabel id="demo-simple-select-label" style={{backgroundColor:"white", padding:"0.1rem"}}>Approval Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={user.approval}
                                    onChange={(event) => handleChange(event,user._id)}
                                >
                                    <MenuItem value="Not Approved">Not Approved</MenuItem>
                                    <MenuItem value="Approved">Approved</MenuItem>
                                </Select>
                            </FormControl>
                  </TableCell>
                  <TableCell>
                    {user.approval==="Approved" ? (
                      <Box
                        sx={{
                          color: "white",
                          padding: "0.5rem",
                          backgroundColor: "green",
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
