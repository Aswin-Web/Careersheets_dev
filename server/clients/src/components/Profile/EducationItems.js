import React, { useState } from "react";
import {
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { educationActions } from "../../redux/reducers/education-Data";
import { REACT_APP_SERVER_URL } from "../../config";
import Add from "./ProfileEdit/Add/Add";
import "./EducationItems.css";

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
    return response.data;
  };

  const deleteEducationHandler = () => {
    deleteRequest()
      .catch((err) => console.log(err))
      .then((data) => {
        dispatch(educationActions.removeEdu(data.edu._id));
      })
      .then(() => navigate("/user/profile"));
  };

  const editEducationHandler = () => setIsEdit(true);
  const handleCloseAdd = () => setIsEdit(false);

  return (
    <div
      style={{ 
        marginBottom: "10px",
      }}
    >
      {/* Header with Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        <h3 style={{ margin: 0 }}>{collegeName}</h3>
        <div>
          <IconButton onClick={editEducationHandler} title="Edit Education">
            <EditOutlinedIcon sx={{mr:1}} />
          </IconButton>
          <IconButton onClick={deleteEducationHandler} title="Delete Education">
            <DeleteOutlinedIcon sx={{mr:4}} />
          </IconButton>
        </div>
      </div>

      {/* Details */}
      {/* <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div style={{ flex: "1 1 45%" }}>
          <p style={{ margin: "0", fontSize: "14px", color: "gray" }}>Degree:</p>
          <p style={{ margin: "4px 0" }}>{degree}</p>
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <p style={{ margin: "0", fontSize: "14px", color: "gray" }}>Stream:</p>
          <p style={{ margin: "4px 0" }}>{stream}</p>
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <p style={{ margin: "0", fontSize: "14px", color: "gray" }}>
            Graduated:
          </p>
          <p style={{ margin: "4px 0" }}>{graduated}</p>
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <p style={{ margin: "0", fontSize: "14px", color: "gray" }}>
            Graduation Year:
          </p>
          <p style={{ margin: "4px 0" }}>{graduationYear}</p>
        </div>

        <div style={{ flex: "1 1 100%" }}>
          <p style={{ margin: "0", fontSize: "14px", color: "gray" }}>
            Register Number:
          </p>
          <p style={{ margin: "4px 0" }}>{registerNumber}</p>
        </div>
      </div> */}

      <div className="education-container">
        <div className="education-item">
          <p className="education-label">Degree:</p>
          <p className="education-value">{degree}</p>
        </div>

        <div className="education-item">
          <p className="education-label">Stream:</p>
          <p className="education-value">{stream}</p>
        </div>

        <div className="education-item">
          <p className="education-label">Graduated:</p>
          <p className="education-value">{graduated}</p>
        </div>

        <div className="education-item">
          <p className="education-label">Graduation Year:</p>
          <p className="education-value">{graduationYear}</p>
        </div>

        <div className="education-item full-width">
          <p className="education-label">Register Number:</p>
          <p className="education-value">{registerNumber}</p>
        </div>
      </div>



      {/* Edit Dialog */}
      {isEdit && (
        <Add Card="education" editdata={props} onCloseEdit={handleCloseAdd} />
      )}
    </div>
  );
};

export default EducationItems;
