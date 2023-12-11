import * as React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

import Dialog from "@mui/material/Dialog";
import EducationForm from "./EducationForm";

import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StatusForm from "./StatusForm";
import Skillform from "./Skillform";
import ProjectForm from "./ProjectForm";
import axios from "axios";
// import { isAbsoluteUrl } from "next/dist/shared/lib/utils";
import SummaryForm from "./SummaryForm";
import PersonalInfoForm from "./PersonalInfoForm";
import { REACT_APP_SERVER_URL } from "../../../../config";

export default function Add(props) {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState();
  const [about, setAbout] = React.useState(false);
  const [education, setEducation] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [skills, setSkills] = React.useState(false);
  const [project, setProject] = React.useState(false);
  const [info, setInfo] = React.useState(false);

  ///// GETTING COLLEGE LIST/////
  const sendRequest = async () => {
    const response = await axios.get(
      `${REACT_APP_SERVER_URL}/collegelist`
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
    if (props.Card === "Summary") {
      setAbout(true);
    }
    if (props.Card === "info") {
      setInfo(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        {(props.Card === "Summary") | (props.Card === "info") ? (
          <EditIcon />
        ) : (
          ""
        )}
        {(props.Card !== "Summary") & (props.Card !== "info") ? (
          <AddIcon />
        ) : (
          ""
        )}
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        {education && <EducationForm data={list} onClose={handleClose} />}
        {status && <StatusForm onClose={handleClose} />}
        {skills && <Skillform onClose={handleClose} />}
        {project && <ProjectForm onClose={handleClose} />}
        {about && <SummaryForm onClose={handleClose} />}
        {info && <PersonalInfoForm onClose={handleClose} />}

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
