import React, {  useState, useEffect } from "react";
import classes from "./ProfileDetails.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { educationActions } from "../../redux/reducers/education-Data";
import { REACT_APP_SERVER_URL } from "../../config";
import Add from "./ProfileEdit/Add/Add";

const EducationItems = (props) => {
  const [isEdit, setIsEdit] = useState(false);

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
      REACT_APP_SERVER_URL + "/user/profile/education/" + id,
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

  const editEducationHandler = async () => {
    console.log("ssssaaaaaaaaaaa", isEdit)
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
        // backgroundColor: "#D8D8D8",
        paddingTop: "0",

        borderRadius: "10px",
        marginRight: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <IconButton
          className={classes.editIcon}
          title="Edit Education"
          onClick={editEducationHandler}
        >
          <EditOutlinedIcon />
        </IconButton>

        <IconButton
          className={classes.deleteIcon}
          title="Delete Education"
          onClick={deleteEducationHandler}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </div>

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
      {isEdit && <Add Card={"education"} editdata={props} onCloseEdit={handleCloseAdd}/>}
    </div>
  );
};

export default EducationItems;
