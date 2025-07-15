import React, { useEffect } from "react";
import CollegeAdminHome from "./CollegeAdminHome";
import classes from "./CollegeAdmin.module.css"
import MainNavigation from "./MainNavigation";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CollegeAdmin = () => {
  const navigate = useNavigate();
  const verification = useSelector((state) => state.auth.value.verification);
  const role = useSelector((state) => state.auth.value.role);

  useEffect(() => {
    if (verification === false && role === "none") {
      return navigate("/");
    }
    if (verification === true && role === "user") {
      return navigate("/user");
    }
  }, []);
  
  return (
    <React.Fragment>
      <div className={classes.home}>
        <MainNavigation />
        <CollegeAdminHome />
      </div>
    </React.Fragment>
  );
};

export default CollegeAdmin;
