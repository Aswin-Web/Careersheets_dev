import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { EditCollegeList } from "../../redux/reducers/collegeAdminlist";
import { REACT_APP_SERVER_URL } from "../../config";

const SingleProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const user = useSelector((state) =>
    state.collegeAdminList.value.find((item) => item._id === id)
  );

 
  const [isVerify, setIsVerify] = useState(user?.collegeVerification);
  const [role, setRole] = useState(user?.role);

  const handleVerificationChange = (e) => {
    setIsVerify(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  
  const handleSaveChanges = async () => {
    const token = localStorage.getItem("admin");

    if (user.role !== role) {
      try {

        const response = await axios.put(
          `${REACT_APP_SERVER_URL}/admin/users/${user._id}/role`,
          { role: role }, 
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert("User role updated successfully!");
          navigate(-1);
        }
      } catch (error) {
        console.error("Failed to update user role:", error);
        alert("Error: Could not update user role.");
      }
      return;
    }

    if (user.collegeVerification !== isVerify) {
      try {
        const response = await axios.put(
          `${REACT_APP_SERVER_URL}/admin/`,
          {
            user_id: user._id,
            userVerification: isVerify, 
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          dispatch(EditCollegeList({ id: user._id, isVerified: isVerify }));
          alert("User verification status updated!");
          navigate(-1);
        }
      } catch (error) {
        console.error("Failed to update verification status:", error);
        alert("Error: Could not update verification status.");
      }
    }
  };


  if (!user) {
    return (
      <Box sx={{ padding: "1rem" }}>
        <Typography variant="h5" color="error">User not found.</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
            <ArrowBackIcon /> Back
        </Button>
      </Box>
    );
  }
  

  const isChanged = user.collegeVerification !== isVerify || user.role !== role;

  return (
    <div>
      <Box sx={{ padding: "1rem" }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon /> Back
        </Button>
        <Box>
          <Box
            sx={{
              margin: "1rem",
              padding: "1rem",
              border: "1px solid grey",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography variant="h6">College Name: {user.collegeName}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Typography variant="h6">Phone: {user.contact}</Typography>
            <Typography variant="h6">
              Current Status: {user.collegeVerification ? "Approved" : "Not Approved"}
            </Typography>
            <br />
            
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={role}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value="collegeadmin">College Admin</MenuItem>
                <MenuItem value="user">Job Seeker</MenuItem>
              </Select>
            </FormControl>
            <br />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="status-select-label">Change Verification Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={isVerify}
                label="Change Verification Status"
                onChange={handleVerificationChange}
              >
                <MenuItem value={true}>Approve</MenuItem>
                <MenuItem value={false}>Not Approved</MenuItem>
              </Select>
            </FormControl>
            <br />

            <Button
              disabled={!isChanged}
              variant="contained"
              color="error"
              sx={{ marginTop: "2rem" }}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SingleProfile;