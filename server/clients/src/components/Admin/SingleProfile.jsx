import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { EditCollegeList } from "../../redux/reducers/collegeAdminlist";
import { REACT_APP_SERVER_URL } from "../../config";


const SingleProfile = () => {
  const dispatch=useDispatch()
  const collegeList = useSelector((state) => state.collegeAdminList.value);
   let { id } = useParams();
  
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setage(e.target.value)
  }
  
  const User = collegeList.filter((item) => item._id === id);
  const [isVerify, setage] = useState(User[0].collegeVerification);
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
            }}
          >
            <Typography variant="h6" color="initial">
              Name : {User[0].name}
            </Typography>
            <Typography variant="h6" color="initial">
              College Name: {User[0].collegeName}
            </Typography>
            <Typography variant="h6" color="initial">
              Email: {User[0].email}
            </Typography>
            <Typography variant="h6" color="initial">
              Phone: {User[0].contact}
            </Typography>
            <Typography variant="h6" color="initial">
              Status :
              {User[0].collegeVerification ? "Approved" : "Not Approved"}
            </Typography>
            <br />
            <Typography
              variant="body1"
              color="error"
              sx={{
                fontWeight: "bolder",
              }}
            >
              Change Status
            </Typography>
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isVerify}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={false}>Not Verified</MenuItem>
                <MenuItem value={true}>Verify</MenuItem>
              </Select>
            </FormControl>
            <br />

            <Button
              disabled={(User[0].collegeVerification !== isVerify)?false:true}
              variant="contained"
              color="error"
              sx={{
                margin: "1rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                const sendRequest = async () => {
                  if (User[0].collegeVerification !== isVerify) {
                    const data = await axios.put(
                      `${REACT_APP_SERVER_URL + "/admin/"}`,
                      {
                        user_id: User[0]._id,
                        userVerification: isVerify,
                      },{
                      headers:{
                        "Content-type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "admin"
                        )}`,
                      }}
                    );
                    // If the request is success then Edit store and go back
                    if (data.status===200){
                      dispatch(EditCollegeList(User[0]._id));
                       navigate(-1);
                    }
                  }
                };
                sendRequest();
              }}
            >
              {" "}
              Save Changes{" "}
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SingleProfile;
