import React, { useState } from "react";
import classes from "./ProfileDetails.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { projectActions } from "../../redux/reducers/project-data";
import { REACT_APP_SERVER_URL } from "../../config";
import Add from "./ProfileEdit/Add/Add";

const ProjectItems = (props) => {
  const token = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

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

  const editProjectHandler = async () => {
    console.log("ssssaaaaaaaaaaa", isEdit);
    try {
      setIsEdit(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseAdd = () => {
    setIsEdit(false);
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
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <IconButton
          className={classes.editIcon}
          title="Edit Project"
          onClick={editProjectHandler}
        >
          <EditOutlinedIcon />
        </IconButton>

        <IconButton
          className={classes.deleteIcon}
          title="Delete Project"
          onClick={deleteProjectHandler}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </div>

      <div>
        <h3 style={{ fontSize: "1.53rem" }}>{props.title}</h3>
      </div>
      <div className={classes.graduationDetails}>
        <h4>Domain : </h4>
        <p> {props.domain}</p>
      </div>

      <div>
        <h4>Skills Used:</h4>
        <div style={{ display: "flex" }}>
          {props.skills &&
            props.skills.map((skill, index) => <p key={index}>{skill}</p>)}
        </div>
      </div>

      <div>
        <h4>Project Description:-</h4>
        <p>{props.description}</p>
      </div>

      {isEdit && (
        <Add Card={"project"} editdata={props} onCloseEdit={handleCloseAdd} />
      )}
    </div>
  );
};

export default ProjectItems;
