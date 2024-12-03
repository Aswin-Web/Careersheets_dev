import React from "react";
import classes from "./ProfileDetails.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { projectActions } from "../../redux/reducers/project-data";
import { REACT_APP_SERVER_URL } from "../../config";

const ProjectItems = (props) => {
  const token = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = props.id;

  const deleteRequest = async () => {
    const response = await axios.delete(
      REACT_APP_SERVER_URL + "/user/profile/projects/" + id,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;

    return data;
  };

  const deleteProjectHandler = () => {
    deleteRequest()
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        dispatch(projectActions.removeProject(data.existingProject._id));
        navigate("/user/profile");
      });
  };
  return (
    <div
      style={{
        backgroundColor: "#CEE5D0",
        paddingTop: "0",
        padding: "1em",
        borderRadius: "10px",
        marginRight: "20px",
        marginBottom: "1em",
      }}
    >
      <IconButton
        className={classes.deleteIcon}
        title="Delete Project"
        sx={{ display: "flex", marginLeft: "auto", marginRight: "2rem" }}
        onClick={deleteProjectHandler}
      >
        <DeleteOutlinedIcon />
      </IconButton>
      <div>
        <h3 style={{ fontSize: "1.53rem" }}>{props.title}</h3>
      </div>
      <div className={classes.graduationDetails}>
        <h4>Domain : </h4>
        <p> {props.domain}</p>
      </div>

      <div>
        <h4>Skills Used:</h4>
        <div style={{display:"flex"}}>{props.skills && props.skills.map((skill,index) => <p key={index}>{skill}</p>)}</div>
      </div>

      <div>
        <h4>Project Description:-</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default ProjectItems;



