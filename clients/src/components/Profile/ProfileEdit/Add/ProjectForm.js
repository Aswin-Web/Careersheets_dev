
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
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const [skillItems, setSkillItems] = useState([]);
  const [skill, setSkill] = useState([]);
  const [id, setId] = useState("");

  const getAllSkills = async () => {
    const response = await axios.get(
      `${REACT_APP_SERVER_URL}/user/platformskills`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      setSkillItems([...response.data.skill]);
    }
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  useEffect(() => {
    if (props.editdata) {
      const projectData = props.editdata;
      setTitle(projectData.title);
      setDomain(projectData.domain);
      setDescription(projectData.description);
      setSkill(projectData.skills);
      setId(projectData.id);
     setStartDate(
       projectData.startDate ? projectData.startDate.split("T")[0] : ""
     );
     setEndDate(projectData.endDate ? projectData.endDate.split("T")[0] : "");
    }
  }, [props.editdata]);



console.log("Formatted Start Date:", startDate);
console.log("Formatted End Date:", endDate);

  const skills = skillItems.sort((a, b) => (a.skill < b.skill ? -1 : 1));

  const postRequest = async () => {
    const response = await axios.post(
      `${REACT_APP_SERVER_URL}/user/profile/projects/`,
      {
        projectTitle: title,
        projectDomain: domain,
        projectDescription: description,
        startDate,
        endDate,
        skill,
        id: props.editdata ? id : "",
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

  const projectSubmitHandler = (event) => {
    event.preventDefault();
    postRequest()
      .then((data) => {
        if (props.onClose) props.onClose();

        const obj = {
          _id: data.newProject._id,
          projectTitle: data.newProject.projectTitle,
          projectDescription: data.newProject.projectDescription,
          projectDomain: data.newProject.projectDomain,
          projectSkills: data.newProject.projectSkills,
          startDate: data.newProject.startDate.split("T")[0], 
          endDate: data.newProject.endDate.split("T")[0], 
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
  


  return (
    <div>
      <form onSubmit={projectSubmitHandler}>
        <DialogContent sx={{ lineHeight: "25px" }}>
          <DialogContentText>
            {props.editdata ? "Edit Project" : "Add Project"}
          </DialogContentText>

          <TextField
            name="projectTitle"
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            name="projectDomain"
            margin="dense"
            label="Project Domain"
            placeholder="Eg. Cloud / IOT"
            fullWidth
            variant="standard"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />

          <TextField
            name="startDate"
            margin="dense"
            label="Project Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="standard"
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
            required
            error={!startDate} 
            helperText={!startDate ? "Start Date is required" : ""}
          />

          <TextField
            name="endDate"
            margin="dense"
            label="Project End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="standard"
            value={endDate || ""}
            onChange={(e) => setEndDate(e.target.value)}
            required
            error={!endDate} 
            helperText={!endDate ? "End Date is required" : ""}
          />

          <Autocomplete
            multiple
            id="tags-standard"
            options={skills.map((option) => option.skill)}
            onChange={(event, values) => setSkill(values)}
            value={skill}
            renderInput={(params) => (
              <TextField {...params} label="Skill" variant="standard" />
            )}
          />

          <div className={classes.projectDescription}>
            <TextField
              fullWidth
              name="projectDescription"
              label="Project Description"
              multiline
              value={description}
              rows={4}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button type="submit">{props.editdata ? "Update" : "Add"}</Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default ProjectForm;



