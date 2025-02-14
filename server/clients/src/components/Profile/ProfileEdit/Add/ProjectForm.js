import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import classes from "./projectForm.module.css";
import { projectActions } from "../../../../redux/reducers/project-data";
import { REACT_APP_SERVER_URL } from "../../../../config";

const ProjectForm = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [skillItems, setskillItems] = useState([]);
  const [skill, setSkill] = useState([]);
  const [id, setId] = useState("");

  console.log("propspsppssss", props);

  const getAllSkills = async () => {
    const response = await axios.get(
      REACT_APP_SERVER_URL + "/user/platformskills",

      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(response,"Skills From Backend");
    const data = await response.data;

    if (response.status === 200) {
      setskillItems([...response.data.skill]);
      return data;
    }
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  // skills
  function compare(a, b) {
    if (a.skill < b.skill) {
      return -1;
    }
    if (a.skill > b.skill) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    if (props.editdata) {
      const projectData = props.editdata;
      setTitle(projectData.title);
      setDomain(projectData.domain);
      setDescription(projectData.description);
      setSkill(projectData.skills);
      setId(projectData.id);
    }
  }, [props.editdata]);

  const skills = skillItems.sort(compare);

  const postRequest = async () => {
    const response = await axios
      .post(
        REACT_APP_SERVER_URL + "/user/profile/projects/",
        {
          projectTitle: title,
          projectDomain: domain,
          projectDescription: description,
          skill,
          id: props.editdata ? id : "",
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
        if (props.onClose) {
          props.onClose();
        }
        console.log(data.newProject, "sgabiulwr");

        const obj = {
          _id: data.newProject._id,
          projectTitle: data.newProject.projectTitle,
          projectDescription: data.newProject.projectDescription,
          projectDomain: data.newProject.projectDomain,
          projectSkills: data.newProject.projectSkills,
        };

        if (props.editdata) {
          dispatch(projectActions.updateProject({ ...obj }));
        } else {
          dispatch(projectActions.addProject({ ...obj }));
        }
        props.onClose(); 
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

  const inputChangeHandler = (event, values) => {
    // setSkill(values);
    setSkill(values);
    console.log(values);
  };

  return (
    <div>
      <form onSubmit={projectSubmitHandler}>
        <DialogContent sx={{ lineHeight: "25px" }}>
          <DialogContentText>{props.editdata ? "Edit Project" : "Add Project"}</DialogContentText>
          <TextField
            name="projectTitle"
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            variant="standard"
            value={title}
            // sx={{ width: "35.5em" }}
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
            value={domain}
            // sx={{ width: "35.5em" }}
            onChange={domainChangeHandler}
          />{" "}
          <Autocomplete
            multiple
            id="tags-standard"
            options={skills.map((option) => option.skill)}
            onChange={inputChangeHandler}
            value={skill}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Skill"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          {/* <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={skills.map((option) => option.skill)}
            onChange={inputChangeHandler}
            sx={{ width: "fullWidth" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Skill"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          /> */}
          <div className={classes.projectDescription}>
            <TextField
              fullWidth
              name="projectDescription"
              id="outlined-multiline-static"
              label="Project Description"
              multiline
              value={description}
              rows={4}
              placeholder="Description"
              onChange={descriptionChangeHandler}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit">
          {props.editdata ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default ProjectForm;
