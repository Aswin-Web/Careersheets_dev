import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import classes from "./projectForm.module.css";
import { projectActions } from "../../../../redux/reducers/project-data";

const ProjectForm = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [domain, setDomain] = useState();

  const postRequest = async () => {
    const response = await axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/user/profile/projects/",
        {
          projectTitle: title,
          projectDomain: domain,
          projectDescription: description,
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
  const projectSubmitHandler = (event) => {
    event.preventDefault();

    
    postRequest()
      .then((data) => {
        
        const obj = {
          _id:data.newProject._id,
          projectTitle: data.newProject.projectTitle,
          projectDescription: data.newProject.projectDescription,
          projectDomain: data.newProject.projectDomain,
        };
        
        dispatch(projectActions.addProject({...obj}));
      })
      .catch((err) => console.log(err));
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const domainChangeHandler = (event) => {
    setDomain(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <form onSubmit={projectSubmitHandler}>
        <DialogContent>
          <DialogContentText>Add projects</DialogContentText>
          <TextField
            name="projectTitle"
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            variant="standard"
            sx={{ width: "35.5em" }}
            onChange={titleChangeHandler}
          />
          <TextField
            name="projectDomain"
            autoFocus
            margin="dense"
            id="name"
            label="Project Domain"
            placeholder="Eg. Cloud / IOT  "
            fullWidth
            variant="standard"
            sx={{ width: "35.5em" }}
            onChange={domainChangeHandler}
          />

          <div className={classes.projectDescription}>
            <TextField
              fullWidth
              name="projectDescription"
              id="outlined-multiline-static"
              label="Project Description"
              multiline
              rows={4}
              placeholder="Description"
              onChange={descriptionChangeHandler}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default ProjectForm;
