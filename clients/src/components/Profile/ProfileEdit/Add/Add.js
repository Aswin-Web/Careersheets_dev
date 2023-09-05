import * as React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import EducationForm from "./EducationForm";

import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StatusForm from "./StatusForm";
import Skillform from "./Skillform";
import ProjectForm from "./ProjectForm";
import axios from "axios";

export default function Add(props) {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState();

  const [education, setEducation] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [skills, setSkills] = React.useState(false);
  const [project, setProject] = React.useState(false);
  


  ///// GETTING COLLEGE LIST/////
  const sendRequest = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/collegelist`
    );
    const data = response.data;

    return data;
  };


  const handleClickOpen = (event) => {
    sendRequest()
      .then((data) => {
        
        setList(data);
      })
      .catch((err) => console.log(err));
    setOpen(true);

    if (props.Card === "education") {
      setEducation(true);
    }
    if (props.Card === "status") {
      setStatus(true);
    }
    if (props.Card === "skills") {
      setSkills(true);
    }
    if (props.Card === "project") {
      setProject(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        {education && <EducationForm data={list} onClose={handleClose} />}
        {status && <StatusForm onClose={handleClose} />}
        {skills && <Skillform onClose={handleClose} />}
        {project && <ProjectForm  onClose={handleClose} />}

        <Button
          sx={{ marginLeft: "auto", marginRight: "5em", bottom: "3.2em" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Dialog>
    </div>
  );
}
