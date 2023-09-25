import React from "react";
import classes from "./Profile.module.css";
import ProfileDetails from "./ProfileDetails";
import UseAuth from "../../hooks/auth";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { useDispatch, useSelector } from "react-redux";
import RoleForm from "./RoleForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//MUI///
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { roleActions } from "../../redux/reducers/role-data";

// import { pipeline } from '@xenova/transformers';


const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRole = useSelector((state) => state.role.role);
  const { name, displayPicture } = UseAuth();
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState();
  const token = useSelector((state) => state.auth.value);
  // const userData = useSelector((state) => state.data.value);

  const updateRequest = async () => {
    const response = await axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/user/profile/profilerole`,
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const roleChaneHandler = (event) => {
    console.log(event.target.value);
    setRole(event.target.value);
  };

  const profileSubmitHandler = (event) => {
    event.preventDefault();
    handleClose();
    console.log("submitted");
    updateRequest()
      .then((data) => {
        let userRole = data.data.role;
        dispatch(roleActions.changeRole(userRole));
      })
      .catch((err) => console.log(err));
  };

 

  const generateResumeHandler = async() => {
    // let poet = await pipeline(
    //   "text2text-generation",
    //   "Xenova/LaMini-Flan-T5-783M"
    // );
    // let result = await poet("Write me a love poem about cheese.", {
    //   max_new_tokens: 200,
    //   temperature: 0.9,
    //   repetition_penalty: 2.0,
    //   no_repeat_ngram_size: 3,
  
    //   // top_k: 20,
    //   // do_sample: true,
    // });
    // console.log(result)
    // navigate("/user/profile/resume/")
    console.log("clicked");
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
              <h2>{name}</h2>
              <div className={classes.profileRole}>
                {profileRole ? (
                  <p placeholder="profile-role">{profileRole}</p>
                ) : (
                  <p>Student</p>
                )}
                <Button
                  sx={{ marginBottom: "2em" }}
                  variant="standard"
                  onClick={handleClickOpen}
                >
                  <ModeEditIcon />
                </Button>
                <Dialog open={open} onClose={handleClose}></Dialog>
              </div>
              <div>
                <Dialog open={open} onClose={handleClose}>
                  <DialogContent>
                    <DialogContentText>Add profile role</DialogContentText>
                    <TextField
                      name="profileRole"
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Eg.Developer"
                      fullWidth
                      variant="standard"
                      sx={{ width: "17.5em" }}
                      onChange={roleChaneHandler}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={profileSubmitHandler} type="submit">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
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
        {/* <div className={classes.bio}>
          <h3>Bio:</h3>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.{" "}
          </p>
        </div> */}
      </div>

      <hr />

      <div>
        <ProfileDetails />
      </div>
    </div>
  );
};

export default Profile;
