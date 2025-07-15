import * as React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

import Dialog from "@mui/material/Dialog";
import EducationForm from "./EducationForm";

import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StatusForm from "./StatusForm";
import Skillform from "./Skillform";
import CertificationForm from "./CertificationForm";
import ProjectForm from "./ProjectForm";
import axios from "axios";

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
  const [certification, setCertification] = React.useState(false);

  const sendRequest = async () => {
    const response = await axios.get(`${REACT_APP_SERVER_URL}/collegelist`);
    const data = response.data;

    return data;
  };

  React.useEffect(() => {
    sendRequest()
      .then((data) => {
        setList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickOpen = (event) => {
    setOpen(true);

    if (props.Card === "education") {
      setEducation(true);
    }
    if (props.Card === "certification") {
      setCertification(true);
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

    if (props.onCloseEdit) {
      props.onCloseEdit(); 
    }
  };

  React.useEffect(() => {
    console.log("Add component mounted or updated", props.editdata, props.Card, open);
    if (props.editdata && props.Card) {
      setOpen(true);
      setEducation(props.Card === "education");
      setCertification(props.Card === "certification");
      setStatus(props.Card === "status");
      setSkills(props.Card === "skills");
      setProject(props.Card === "project");
      setAbout(props.Card === "Summary");
      setInfo(props.Card === "info");
    }
  }, [props.editdata, props.Card]);


  return (
    <div>
      {!props.editdata && (
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
      )}

      <Dialog open={open} onClose={handleClose}>
        {education && list  && (
          <EducationForm
            data={list}
            onClose={handleClose}
            editdata={props.editdata}
          />
        )}
        {status && <StatusForm onClose={handleClose} />}
        {skills && <Skillform onClose={handleClose} editdata={props.editdata}/>}
        {project && <ProjectForm onClose={handleClose} editdata={props.editdata} />}
        {about && <SummaryForm onClose={handleClose} />}
        {info && <PersonalInfoForm onClose={handleClose} />}
        {certification && <CertificationForm onClose={handleClose} editdata={props.editdata} />}

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
