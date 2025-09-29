
import React, { useState, useEffect } from "react";
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
  const [projectData, setProjectData] = useState({
    startDate: "",
    endDate: "",
  });

  const id = props.id;
  let startDate = props.startDate;
  let endDate = props.endDate;

  if (startDate) {
    startDate = startDate.split("T")[0];
  }
  if (endDate) {
    endDate = endDate.split("T")[0];
  }

  console.log("ProjectItems - startDate:", startDate);
  console.log("ProjectItems - endDate:", endDate);

  const deleteRequest = async () => {
    const response = await axios.delete(
      `${REACT_APP_SERVER_URL}/user/profile/projects/${id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
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

  const editProjectHandler = () => {
    setIsEdit(true);
  };

  const handleCloseAdd = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    if (props.startDate && props.endDate) {
      setProjectData({
        startDate: props.startDate.split("T")[0],
        endDate: props.endDate.split("T")[0],
      });
    }
  }, [props.startDate, props.endDate]);

  return (
    <div
      style={{
        backgroundColor: "#CCCCFF",
        padding: "1em",
        borderRadius: "10px",
        marginRight: "20px",
        marginBottom: "1em",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
        <p>{props.domain}</p>
      </div>

     
      {props.startDate && props.endDate && (
        <div>
          <h4>Project Duration:</h4>
          <p>
            From: {projectData.startDate} To: {projectData.endDate}
          </p>
        </div>
      )}

      <div>
        <h4>Skills Used:</h4>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {props.skills &&
            props.skills.map((skill, index) => (
              <p key={index} style={{ marginRight: "5px" }}>
                {skill}
              </p>
            ))}
        </div>
      </div>

      <div>
        <h4>Project Description:</h4>
        <p style={{textAlign: "justify"}}>{props.description}</p>
      </div>

      {isEdit && (
        <Add Card={"project"} editdata={props} onCloseEdit={handleCloseAdd} />
      )}
    </div>
  );
};

export default ProjectItems;
