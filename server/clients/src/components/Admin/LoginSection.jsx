import {
  Box,
  FormLabel,
  Input,
  Divider,
  Button,
  FormGroup,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REACT_APP_SERVER_URL } from "../../config";

const LoginSection = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendRequest=async ()=>{
      const data=await axios.post(`${REACT_APP_SERVER_URL + "/admin/login"}`, {
        adminName: username,
        adminPassword: password,
      });
      
      if (data.status===200){
        localStorage.setItem("admin",data.data.token );
        return navigate('/admin/verify')
      }
    }
    sendRequest()
  };

  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            minHeight: "60%",
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <Input onChange={(e) => setUsername(e.target.value)} />

            <Divider />
            <br />
            <FormLabel>Password</FormLabel>
            <Input type='password' onChange={(e) => setpassword(e.target.value)} />
            <br />
            <Box
              sx={{
                margin: "10px",
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined" color="error" onClick={handleSubmit}>
                Login
              </Button>
            </Box>
          </FormGroup>
        </Box>
      </Box>
    </div>
  );
};

export default LoginSection;
