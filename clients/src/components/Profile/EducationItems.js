import React from "react";
import classes from "./ProfileDetails.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { educationActions } from "../../redux/reducers/education-Data";

const EducationItems = (props) => {
  const token = useSelector((state) => state.auth.value);
  const {
    collegeName,
    degree,
    stream,
    graduated,
    graduationYear,
    id,
    registerNumber,
  } = props;

  const navigate = useNavigate();
  const educations = useSelector((state) => state.edu.items);
  const dispatch = useDispatch();
  const deleteRequest = async () => {
    const response = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/user/profile/education/" + id,
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

  const deleteEducationHandler = () => {
    
    deleteRequest()
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        dispatch(educationActions.removeEdu(data.edu._id));
      })
      .then(() => navigate("/user/profile"));
  };

  return (
    <div
      style={{
        // backgroundColor: "#D8D8D8",
        paddingTop: "0",
     
        borderRadius: "10px",
        marginRight: "20px",
       
      }}
    >
      <IconButton
        className={classes.deleteIcon}
        title="Delete Education"
        sx={{ display: "flex", marginLeft: "auto", marginRight: "2rem" }}
        onClick={deleteEducationHandler}
      >
        <DeleteOutlinedIcon />
      </IconButton>
      <h3>{collegeName}</h3>

      <div className={classes.graduationDetails}>
        <h4>Degree : </h4>
        <p> {degree}</p>
      </div>
      <div className={classes.graduationDetails}>
        <h4>Stream : </h4>
        <p> {stream}</p>
      </div>
      <div className={classes.graduationDetails}>
        <h4>Graduated : </h4>
        <p>{graduated}</p>
      </div>
      <div className={classes.graduationDetails}>
        <h4>Graduation Year : </h4>
        <p> {graduationYear}</p>
      </div>
      <div className={classes.graduationDetails}>
        <h4>Register Number : </h4>
        <p>{registerNumber}</p>
      </div>
    </div>
  );
};

export default EducationItems;
