import React, { useEffect } from "react";
import classes from "./SelectingCollege.module.css";

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

const SelectingCollege = () => {
  const token = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const [collegeName, setCollegeName] = React.useState();
  const [contactError, setContactError] = React.useState();
  const [contact, setContact] = React.useState();
  const [collegeList, setCollegeList] = React.useState();


  ///// GETTING COLLEGE LIST/////
  const sendRequest = async () => {
    const response = await axios.get(
      `${REACT_APP_SERVER_URL}/collegelist`
    );
    const data = response.data;

    return data;
  };
  useEffect(()=>{
    sendRequest()
      .then((data) => {
       
        setCollegeList(data);
      })
      .catch((err) => console.log(err));
  },[])

  console.log(collegeList)

  ///sorting the college list

  function compare(a, b) {
    if (a.name.trim() < b.name.trim()) {
      return -1;
    }
    if (a.name.trim() > b.name.trim()) {
      return 1;
    }
    return 0;
  }

  if (collegeList) {
    collegeList.sort(compare);
  }
  ///college Input///
  const collegeNameHandler = (event, values) => {
    
    setCollegeName(values.name);
  };

  //validating the form///
  let formValid = false;

  if (collegeName && contact) {
    formValid = true;
  }
  ///contact input///
  const contactChangeHandler = (event) => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value !== "" || regex.test(event.target.value)) {
      setContactError(true);
    }
    if (event.target.value === "" || regex.test(event.target.value)) {
      setContact(event.target.value);
      setContactError(false);
    }
  };

  ///API call function to the server///
  const postRequest = async () => {
    const response = await axios
      .post(
        REACT_APP_SERVER_URL + "/collegeadmin/selectcollege",
        {
          college: collegeName,
          contact: contact,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };

  ////form submission and sending the request to server /////
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (formValid) {
     
      postRequest()
      navigate("/collegeadmin")
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
          <h3>College Admin</h3>
          <div className={classes.form}>
            <form onSubmit={formSubmitHandler}>
              <label className={classes.label}>Select College</label>
              <div className={classes.fields}>
                <Autocomplete
                  sx={{
                    width: "31.25em",
                    marginLeft: "6.875em",
                    marginTop: "1em",
                  }}
                  id="combo-box-demo"
                  name="collegeName"
                  options={collegeList}
                  getOptionLabel={(option) => option.name}
                  onChange={collegeNameHandler}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="College"
                      variant="outlined"
                      name="collegeName"
                    />
                  )}
                />
                <br />
                <label className={classes.contact}>Contact</label>
                <TextField
                  sx={{
                    width: "31.25em",
                    marginLeft: "3.125em",
                    marginTop: "1em",
                  }}
                  name="contact"
                  margin="dense"
                  id="name"
                  label="Contact Number"
                  type="text"
                  inputProps={{ maxLength: 12 }}
                  fullWidth
                  variant="outlined"
                  onChange={contactChangeHandler}
                />
                {contactError && (
                  <p className={classes.contactError}>
                    Enter a valid phone Number
                  </p>
                )}
              </div>
              <Button
                disabled={!formValid}
                sx={{ marginLeft: "25em", marginTop: "2em" }}
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

export default SelectingCollege;
