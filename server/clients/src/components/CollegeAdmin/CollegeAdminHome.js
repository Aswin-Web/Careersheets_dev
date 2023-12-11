import React, { useState } from "react";

import classes from "../CollegeAdmin/CollegeAdminHome.module.css";
// import Leftbar from "./Leftbar"

import StudentCard from "./StudentCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { detailsAction } from "../../redux/reducers/userDetails";
import { collegeAdminAction } from "../../redux/reducers/collegeAdmin-data";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { REACT_APP_SERVER_URL } from "../../config";

const CollegeAdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const details = useSelector((state) => state.userDetail.details);
  const [err, seterr] = useState();

  const sendRequest = async () => {
    const response = await axios
      .get(REACT_APP_SERVER_URL + "/collegeadmin/", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        seterr(err.response.data.message);
        return err.response.data.message;
      });

    if (response === "notselected") {
      navigate("/collegeadmin/selectcollege");
    }

    const data = await response.data;

    return data;
  };

  useEffect(() => {
    sendRequest()
      .then((data) => {
        if (data) {
          
          dispatch(detailsAction.addData(data.userApplication));
          dispatch(collegeAdminAction.addValue(data.collegeAdmin));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  let showDetails=false
  if(details.length!==0){
    showDetails=true
  }

  return (
    <div className={classes.main}>
      <Helmet>
        <title>CareerSheets-CollegeAdmin</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://yt3.googleusercontent.com/JSKcgbOwC9er1na2B_jWU9OsNfouSfm_bs1CASylTw9cHZEycRixrqpJIMoNoU7QpEtPPTWxysw=s176-c-k-c0x00ffffff-no-rj"
        />
      </Helmet>
      {err && (
        <div className={classes.header}>
          <h2>
            College Admin is{" "}
            <span className={classes.notVerified}>not verified...</span>
          </h2>
          <h4> Once our Admin approves you can track your students</h4>
        </div>
      )}
      {/* <Leftbar/> */}

      {showDetails ? (
        details.map((data) => {
          let selected = 0;
          let rejected = 0;
          let pending = 0;
          let cleared = 0;
          data.application.map((app) => {
            {
              /* console.log(app.status[app.status.length - 1]); */
            }
            if (app.status.length !== 0) {
              const { status } = app.status[app.status.length - 1];
              if (status === "Selected") {
                selected = selected + 1;
              } else if (status === "Cleared") {
                cleared = cleared + 1;
              } else if (status === "Pending") {
                pending = pending + 1;
              } else if (status === "Rejected") {
                rejected = rejected + 1;
              }
            }
          });

          return (
            <StudentCard
              key={data.user}
              id={data.user}
              details={data}
              status={{ selected, pending, cleared, rejected }}
            />
          );
        })
      ) : (
        <div className={classes.header}>
          <h2>No users have registered for this college</h2>
          <h4>
            {" "}
            This application is visible only when the user creates an
            application{" "}
          </h4>
        </div>
      )}
    </div>
  );
};

export default CollegeAdminHome;
