
import React from "react";
import classes from "./ProfileCard.module.css";
import { Box } from "@mui/material";

import Add from "../ProfileEdit/Add/Add";
import { Helmet } from "react-helmet-async";

const ProfileCard = (props) => {
  return (
    <div className={classes.profileCard}>
      <Helmet>
        <title>CareerSheets-Profile</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://yt3.googleusercontent.com/JSKcgbOwC9er1na2B_jWU9OsNfouSfm_bs1CASylTw9cHZEycRixrqpJIMoNoU7QpEtPPTWxysw=s176-c-k-c0x00ffffff-no-rj"
        />
      </Helmet>
      <Box display="flex" sx={{ padding: "0.5em" }}>
        <Box sx={{ marginLeft: "auto", display: "flex" }}>
          {props.CardName &&
            props.CardName.toLowerCase().trim() !== "swot analysis" &&
            props.CardName.toLowerCase().trim() !== "soft skills" && (
              <Add Card={props.CardName} />
            )}
        </Box>
      </Box>
      <div className={classes.cardContent}>{props.children}</div>
    </div>
  );
};

export default ProfileCard;
