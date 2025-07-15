import React from "react";

import classes from "./Leftbar.module.css";
import Sideview from "./sideview";
import HomeIcon from "@mui/icons-material/Home";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";

const Sidebar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.elements}>
        <HomeIcon />
        <p>Home</p>
      </div>
      <div className={classes.elements}>
        <WysiwygIcon />
        <p>STUDENT STATUS</p>
      </div>
      <div className={classes.elements}>
        <WysiwygIcon />
        <p>STUDENT STATUS</p>
      </div>
    </div>
  );
};

export default Sidebar;
