import React from "react";
import classes from "./Footer.module.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CopyrightIcon from "@mui/icons-material/Copyright";
import logo from "../../images/Careersheets-logo.png";

import { Icon } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <div className={classes.parent}>
      <div className={classes.footerSection}>
        <div className={classes.first}>
          <img src={logo} alt="logo" />
          <p className={classes.slogan}>Empowering Talent to Excel</p>
        </div>
        <div className={classes.footerLinks}>
          <div className={classes.second}>
            <p>
              <a href="#main">Home</a>
            </p>
            <p>
              <Link>Help center</Link>
            </p>
            <p>
              <a href="#reviews">Reviews</a>
            </p>
          </div>
          <div className={classes.third}>
            <p>
              <Link>Services</Link>
            </p>
            <p>
              <Link>About Us</Link>
            </p>
            <p>
              <Link>Contact Us</Link>
            </p>
          </div>
        </div>
      </div>
      <br />
      <hr className={classes.horizontalLine} />
      {/* <div className={classes.socialMediaIcons}>
        <Icon className={classes.icons}>
          <Link target="_blank" to="https://www.facebook.com/">
            <FacebookRoundedIcon sx={{ color: "#3b5998" }} />
          </Link>
        </Icon>
        <Icon className={classes.icons}>
          <Link target="_blank" to="https://twitter.com/">
            <TwitterIcon sx={{ color: "#00acee" }} />
          </Link>
        </Icon>
        <Icon className={classes.icons}>
          <Link target="_blank" to="https://www.instagram.com/">
            <InstagramIcon className={classes.instagram} />
          </Link>
        </Icon>
        <Icon className={classes.icons}>
          <Link target="_blank" to="https://www.linkedin.com/">
            <LinkedInIcon sx={{ color: "#0A66C2" }} />
          </Link>
        </Icon>
      </div> */}
      <div className={classes.last}>
        <p>
          <div>
            <CopyrightIcon sx={{ alignItems: "center" }} />
          </div>
          Copyright {year} .All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
