import React from "react";
import classes from "./Profile.module.css";
import ProfileDetails from "./ProfileDetails";
import UseAuth from "../../hooks/auth";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { useDispatch, useSelector } from "react-redux";
import RoleForm from "./RoleForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { roleActions } from "../../redux/reducers/role-data";
import { personalActions } from "../../redux/reducers/personalInfo";
import { REACT_APP_SERVER_URL } from "../../config";
import { event } from "react-ga";



const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRole = useSelector((state) => state.role.role);
  const { displayPicture } = UseAuth();
  const [openRoleDialog, setOpenRoleDialog] = React.useState(false);
  const [openNameDialog, setOpenNameDialog] = React.useState(false);
  const [role, setRole] = React.useState();
  const [editName, setEditName] = React.useState();
  const name = editName || UseAuth().name;
  const token = useSelector((state) => state.auth.value);


  const updateRequest = async () => {
    const response = await axios
      .put(
        `${REACT_APP_SERVER_URL}/user/profile/profilerole`,
        {
          profileRole: role,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.log(error, "@status error"));

    console.log(response, "response");

    return response;
  };

  const updateNameRequest = async() => {
    const response =  await axios
      .put(
        `${REACT_APP_SERVER_URL}/user/profile/profilename`,
        { name: editName },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.log(error, "@status error"));

    console.log(response, "response");

    return response;
  };

  const handleEditRole = () => {
    setOpenRoleDialog(true);
  };

  const handleEditName = () => {
    setOpenNameDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenRoleDialog(false);
    setOpenNameDialog(false);
  };

  const roleChangeHandler = (event) => {
    console.log(event.target.value);
    setRole(event.target.value);
  };

  const nameChangeHandler = (event) =>{
    console.log(event.target.value);
    setEditName(event.target.value);
  };

  const profileSubmitHandler = (event) => {
    event.preventDefault();
    handleCloseDialog();
    console.log("submitted");
    updateRequest()
      .then((data) => {
        let userRole = data.data.role;
        dispatch(roleActions.changeRole(userRole));
      })
      .catch((err) => console.log(err));
  };
  
  const updateNameHandler = (event) => {
    event.preventDefault();
    handleCloseDialog();
    console.log("Name editted sucessfully");
    updateNameRequest()
    .then((data) =>{
      let userName = data.data.name;
      setEditName(userName);
    })
    .catch((err) => console.log(err));
  }

  const generateResumeHandler = async() => {
   
    navigate("/user/profile/resume/")
    // console.log("clicked");
  };


  return (
    <div className={classes.Container}>
      <div className={classes.head}>
        <div className={classes.topCard}>
          <img
            src="https://marketplace.canva.com/EAE2cQaUHVA/1/0/1600w/canva-black-minimal-motivation-quote-linkedin-banner-HoRi-2buBWk.jpg"
            alt="backgroung"
          />
        </div>
        <div className={classes.heading}>
          <div className={classes.mainProfile}>
            <div className={classes.profilePic}>
              <img src={displayPicture} alt="profile" />
            </div>
            <div className={classes.naming}>
              <div>
              {name ? (
                  <span style={{fontSize:"2rem", fontWeight:"bold"}}>{name}</span>
                ) : (
                  <p>None</p>
                )}
                <Button
                  sx={{ marginBottom: "2em" }}
                  variant="standard"
                  onClick={handleEditName}
                >
                  <ModeEditIcon />
                </Button>
              </div>
              <div className={classes.profileRole}>
                {profileRole ? (
                  <p placeholder="profile-role">{profileRole}</p>
                ) : (
                  <p>Student</p>
                )}
                <Button
                  sx={{ marginBottom: "2em" }}
                  variant="standard"
                  onClick={handleEditRole}
                >
                  <ModeEditIcon />
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.resume}>
            <Button
              sx={{ padding: "12px" }}
              variant="contained"
              onClick={generateResumeHandler}
            >
              Generate Resume
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={openRoleDialog || openNameDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText>
            {openRoleDialog ? "Add profile role" : "Edit Name"}
          </DialogContentText>
          <TextField
            name={openRoleDialog ? "profileRole" : "name"}
            autoFocus
            margin="dense"
            id="name"
            label={openRoleDialog ? "Eg. Developer" : "New Name"}
            fullWidth
            variant="standard"
            sx={{ width: "17.5em" }}
            onChange={openRoleDialog ? roleChangeHandler : nameChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={openRoleDialog ? profileSubmitHandler : updateNameHandler} type="submit">
            {openRoleDialog ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <hr />

      <div>
        <ProfileDetails />
      </div>
    </div>
  );
};



export default Profile;