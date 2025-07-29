import React, { useEffect } from "react";
import classes from "./Main.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/auth";
import { Helmet } from "react-helmet-async";
import { REACT_APP_SERVER_URL } from "../../config";
import Banner_img from "../../images/banner_img.avif"

const Main = () => {
  const navigate = useNavigate();
  const { role, verification } = UseAuth();

  useEffect(() => {
    if (role === "user" && verification === true) navigate("/user");
    else if (role === "collegeadmin" && verification === true)
      navigate("/collegeadmin");
  }, [role, verification, navigate]); 

  const handleClick = () => {
    return window.open(`${REACT_APP_SERVER_URL}/auth/google`, "_self");
  };

  return (
    <div id="main" className={classes.main}>
      <Helmet>
        <title>CareerSheets - Build Your Profile, Find Your Future</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://yt3.googleusercontent.com/JSKcgbOwC9er1na2B_jWU9OsNfouSfm_bs1CASylTw9cHZEycRixrqpJIMoNoU7QpEtPPTWxysw=s176-c-k-c0x00ffffff-no-rj"
        />
      </Helmet>

      <main className={classes.container}>

        <div className={classes.imageContainer}>
          <img
            src="https://images.ctfassets.net/pdf29us7flmy/4WkJUOsDpXs8FuziSMnP6T/82cb8b0cdf309bf3851621768011c1c8/Career_Guide_Photos-2160x1215-GettyImages-1166177942.jpg?w=720&q=100&fm=jpg"
            alt="Person preparing for a job interview and career success"
          />
        </div>

  
        <div className={classes.quote}>
          <h1>Build Your Profile, Find Your Future.</h1>
          <p>
            Effortlessly craft a standout resume, track your skills and
            certifications, and discover job opportunities that perfectly match
            your qualifications.
          </p>
          <Button
            variant="contained"
            size="large"
            sx={{
              margin: { xs: "0 auto", md: "0" }, 
              borderRadius: 6,
              width: "10em",
              height: "3.5em",
              fontSize: "1rem",
            }}
            onClick={handleClick}
          >
            Get Started
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Main;