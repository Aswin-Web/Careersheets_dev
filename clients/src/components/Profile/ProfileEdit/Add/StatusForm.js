import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { statusActions } from "../../../../redux/reducers/status-data";
import axios from "axios";

const StatusForm = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const [inputs, setInputs] = useState();

  const updateRequest = async () => {
    const response = await axios
      .put(
        process.env.REACT_APP_SERVER_URL + "/user/profile/status/",
        {
          status: inputs,
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
  const statusFormSubmitHandler = (event) => {
    event.preventDefault();


    updateRequest().catch((err) => console.log(err));
    dispatch(statusActions.changeStatus(inputs));
  };

  const inputChangeHandler = (event) => {
    setInputs(event.target.value);
  };

  return (
    <div>
      <form onSubmit={statusFormSubmitHandler}>
        <DialogTitle>Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              name="Status"
              autoFocus
              margin="dense"
              id="name"
              label="Eg.Working"
              fullWidth
              variant="standard"
              sx={{ width: "35.5em" }}
              onChange={inputChangeHandler}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} type="submit">
            Change
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default StatusForm;
