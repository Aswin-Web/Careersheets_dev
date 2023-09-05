import React, { useEffect } from "react";
import classes from "./Main.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/auth" 
import {Helmet } from 'react-helmet-async'

const Main = () => {
  const navigate=useNavigate()
  const {role,verification} =UseAuth()

   useEffect(() => {
    if (role=== 'user' && verification=== true) navigate('/user')
    else if (role==='collegeadmin' && verification===true ) navigate("/collegeadmin")
   
   }, []);
   
const handleClick = () => {
  return window.open(
    `${process.env.REACT_APP_SERVER_URL}/auth/google`,
    "_self"
  );
};
  return (
    <div id="main" className={classes.main}>
      
      <Helmet>
        <title>CareerSheets (Beta)</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://yt3.googleusercontent.com/JSKcgbOwC9er1na2B_jWU9OsNfouSfm_bs1CASylTw9cHZEycRixrqpJIMoNoU7QpEtPPTWxysw=s176-c-k-c0x00ffffff-no-rj"
        />
      </Helmet>

      <main className={classes.container}>
        <div className={classes.quote}>
          <h1>Track Your Application </h1>
          <p>
            "One important key to success is self-confidence. An important key
            to self-confidence is preparation."
          </p>
          <Button
            variant="contained"
            size="large"
            sx={{ margin: 1, borderRadius: 10, width: "8em", height: "3em" }}
            onClick={handleClick}
          >
            Login
          </Button>
        </div>

        <div className={classes.image}>
          <img
            src="https://images.ctfassets.net/pdf29us7flmy/4WkJUOsDpXs8FuziSMnP6T/82cb8b0cdf309bf3851621768011c1c8/Career_Guide_Photos-2160x1215-GettyImages-1166177942.jpg?w=720&q=100&fm=jpg"
            alt="JOB INTERVIEW IMG"
          />
        </div>
      </main>
    </div>
  );
};

export default Main;
