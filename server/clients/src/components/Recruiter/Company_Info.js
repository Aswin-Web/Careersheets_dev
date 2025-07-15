import React, { Profiler, useEffect } from "react";
import classes from "./Company_Info.module.css";

///mui///
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import axios from "axios";
///redux///
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REACT_APP_SERVER_URL } from "../../config";

////component function////

const Company_Info = () => {
  const token = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState({
    employeeName: "",
    employeePosition: "",
    companyName: "",
    contactNumber: "",
  });
  const [contactError, setContactError] = React.useState({
    isError: false,
    msg: "",
  });

  ///// GETTING COLLEGE LIST/////

  const GetRecruiterInfo = async () => {
    const response = await axios
      .get(REACT_APP_SERVER_URL + "/recruiter/profile", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("recruiter")}`,
        },
      })
      .catch((err) => setContactError({ isError: true, msg: err.msg }));
    const data = await response.data;
    console.log(data);
    setProfile({
      employeeName: data.info.employeeName,
      employeePosition: data.info.employeePosition,
      companyName: data.info.companyName,
      contactNumber: data.info.contactNumber,
    });
    return data;
  };

  useEffect(() => {
    GetRecruiterInfo();
  }, []);

  //validating the form///
  let formValid = false;

  ///API call function to the server///
  const postRequest = async () => {
    const response = await axios
      .post(
        REACT_APP_SERVER_URL + "/recruiter/profile",
        {
          ...profile,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("recruiter")}`,
          },
        }
      )
      .catch((err) => setContactError({ isError: true, msg: err.msg }));
    const data = await response.data;
    console.log(data);
    setContactError({ isError: false });
    navigate("/recruiter");
    return data;
  };

  ////form submission and sending the request to server /////
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (
      (profile.companyName &&
        profile.contactNumber &&
        profile.employeeName &&
        profile.employeePosition) !== ""
    ) {
      postRequest();
    }
  };
  return (
    <React.Fragment>
      <div className={classes.full}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqRe34P0nKF0Euaz4DLlj3WN4rcAuZGHnUicHoa8B2V5AqgEGfK3eX9ZekUcX3e_jRlm8&usqp=CAU"
          alt="College admim-img"
        />
        <div className={classes.card}>
          <h3>Profile</h3>
          <div className={classes.form}>
            <form onSubmit={formSubmitHandler}>
              <div className={classes.fields}>
                {/* <label className={classes.contact}>Employee Name</label> */}
                <TextField
                  sx={{
                    width: "31.25em",
                    marginLeft: "3.125em",
                    marginTop: "1em",
                  }}
                  name="contact"
                  margin="dense"
                  id="name"
                  label="Employee Name"
                  value={profile.employeeName}
                  type="text"
                  inputProps={{ maxLength: 25 }}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setProfile({
                      employeePosition: profile.employeePosition,
                      employeeName: e.target.value,
                      contactNumber: profile.contactNumber,
                      companyName: profile.companyName,
                    });
                  }}
                />
                <br />
                {/* <label className={classes.contact}>Position</label> */}
                <TextField
                  sx={{
                    width: "31.25em",
                    marginLeft: "3.125em",
                    marginTop: "1em",
                  }}
                  name="contact"
                  margin="dense"
                  id="name"
                  label="Position"
                  value={profile.employeePosition}
                  type="text"
                  inputProps={{ maxLength: 25 }}
                  fullWidth
                  variant="outlined"
                  onChange={(e) =>
                    setProfile({
                      employeePosition: e.target.value,
                      employeeName: profile.employeeName,
                      contactNumber: profile.contactNumber,
                      companyName: profile.companyName,
                    })
                  }
                />
                <br />
                {/* <label className={classes.contact}>Phone</label> */}
                <TextField
                  sx={{
                    width: "31.25em",
                    marginLeft: "3.125em",
                    marginTop: "1em",
                  }}
                  name="contact"
                  margin="dense"
                  id="name"
                  label="Company Name"
                  value={profile.companyName}
                  type="text"
                  inputProps={{ maxLength: 25 }}
                  fullWidth
                  variant="outlined"
                  onChange={(e) =>
                    setProfile({
                      employeePosition: profile.employeePosition,
                      employeeName: profile.employeeName,
                      contactNumber: profile.contactNumber,
                      companyName: e.target.value,
                    })
                  }
                />
                <br />
                {/* <label className={classes.contact}>Company Name</label> */}
                <TextField
                  sx={{
                    width: "31.25em",
                    marginLeft: "3.125em",
                    marginTop: "1em",
                  }}
                  name="contact"
                  value={profile.contactNumber}
                  margin="dense"
                  id="name"
                  label="Contact Number"
                  type="text"
                  inputProps={{ maxLength: 25 }}
                  fullWidth
                  variant="outlined"
                  onChange={(e) =>
                    setProfile({
                      employeeName: profile.employeeName,
                      employeePosition: profile.employeePosition,
                      companyName: profile.companyName,
                      contactNumber: e.target.value,
                    })
                  }
                />
                {contactError.isError && (
                  <p className={classes.contactError}>{contactError.msg}</p>
                )}
              </div>
              <Button
                disabled={
                  (profile.companyName &&
                    profile.contactNumber &&
                    profile.employeeName &&
                    profile.employeePosition) !== ""
                    ? false
                    : true
                }
                sx={{ margin: "2em", marginTop: "2em" }}
                className={classes.button}
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Company_Info;
