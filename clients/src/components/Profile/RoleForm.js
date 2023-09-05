import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

const RoleForm = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const [inputs, setInputs] = useState();

  const updateRequest = async () => {
    const response = await axios
      .put(
        process.env.REACT_APP_SERVER_URL + "/user/profile/profile-role/",
        {
          profileRole: inputs,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.log(error, "@status error"));
    const data = await response.data;

    return data;
  };
  const profileSubmitHandler = (event) => {
    event.preventDefault();

    console.log("submittt");
    updateRequest().catch((err) => console.log(err));
  };

  const inputChangeHandler = (event) => {
    console.log(event.target.value);
    props.role(event.target.value)
    setInputs(event.target.value);
  };


  return (
    <div>
      <form onSubmit={profileSubmitHandler} >
        <DialogContent>
          <DialogContentText>Add profile role</DialogContentText>
          <TextField
            name="profileRole"
            autoFocus
            margin="dense"
            id="name"
            label="Eg.Developer"
            fullWidth
            variant="standard"
            sx={{ width: "15.5em" }}
            onChange={inputChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={props.onClose} type='submit'>
            Add
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default RoleForm;
