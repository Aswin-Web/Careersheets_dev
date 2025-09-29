import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UseAuth from "../../hooks/auth";
import ProfileDetails from "./ProfileDetails";
import { roleActions } from "../../redux/reducers/role-data";
import { REACT_APP_SERVER_URL } from "../../config";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRole = useSelector((state) => state.role.role);
  const token = useSelector((state) => state.auth.value);
  const { displayPicture, name: authName } = UseAuth();

  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [role, setRole] = useState(profileRole || "Student");
  const [editName, setEditName] = useState(authName || "");

  const updateRequest = async () => {
    return await axios.put(
      `${REACT_APP_SERVER_URL}/user/profile/profilerole`,
      { profileRole: role },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const updateNameRequest = async () => {
    return await axios.put(
      `${REACT_APP_SERVER_URL}/user/profile/profilename`,
      { name: editName },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const handleCloseDialog = () => {
    setOpenRoleDialog(false);
    setOpenNameDialog(false);
  };

  const profileSubmitHandler = async (e) => {
    e.preventDefault();
    handleCloseDialog();
    try {
      const { data } = await updateRequest();
      dispatch(roleActions.changeRole(data.role));
    } catch (err) {
      console.log(err);
    }
  };

  const updateNameHandler = async (e) => {
    e.preventDefault();
    handleCloseDialog();
    try {
      const { data } = await updateNameRequest();
      setEditName(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Box xs={{ml:1}} >
        {/* Banner */}
        <Box
          sx={{
            width: "100%",
            height: { xs: 160, sm: 240 },
            borderRadius: 2,
            backgroundImage:
              "url('https://marketplace.canva.com/EAE2cQaUHVA/1/0/1600w/canva-black-minimal-motivation-quote-linkedin-banner-HoRi-2buBWk.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        />

        {/* Profile Card Over Banner */}
        <Card
          sx={{
            maxWidth: "100%",
            mx: "auto",
            mt: -7,
            borderRadius: 3,
            boxShadow: 4,
            width: { xs: "95%", sm: "85%", md: "95%" }, // tighter on xs
            position: "relative",
            zIndex: 2,
          }}
        >
          <CardContent>
            <Grid
              container
              spacing={2}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              direction={{ xs: "column", sm: "row" }} // stack on mobile
            >
              {/* Avatar + Name + Role */}
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: { xs: "left", sm: "center" },
                  flexDirection: { xs: "row", sm: "row" }, // vertical on xs
                  textAlign: { xs: "left", sm: "left" },
                  width: "100%",
                }}
              >
                <Avatar
                  src={displayPicture}
                  sx={{
                    width: { xs: 80, sm: 120 }, // smaller avatar on xs
                    height: { xs: 80, sm: 120 },
                    mb: { xs: 0, sm: 0 },
                    mr: { xs: 0, sm: 1 },
                  }}
                />
                <Box sx={{ mt : { xs:2 }, ml: { xs: 2 } }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={{ xs: "center", sm: "flex-start" }}
                  >
                    <Typography
                      variant="h4" // smaller on xs
                      fontWeight="bold"
                      sx={{ fontSize: { xs: "1.3rem", sm: "2rem" },  }}
                    >
                      {editName || "No Name"}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setOpenNameDialog(true)}
                    >
                      <ModeEditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={{ xs: "left", sm: "flex-start" }}
                  >
                    <Typography
                      variant="h7"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                    >
                      {role}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setOpenRoleDialog(true)}
                    >
                      <ModeEditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>

              {/* Resume Button */}
              <Grid item sx={{ width: { xs: "95%", sm: "auto" } }}>
                <Button
                  fullWidth={true} // full width on mobile
                  variant="contained"
                  onClick={() => navigate("/user/profile/resume/")}
                  sx={{ mt: { xs: 0, sm: 0 }, backgroundColor: "#11144C", "&:hover": { backgroundColor: "#0d1038" }, }}
                >
                  Generate Resume
                </Button>
              </Grid>
            </Grid>
            
          </CardContent>
        </Card>


        {/* Section: Personal Development */}

        {/* Profile Details */}
        <Box sx={{ mt: 2, px: { xs: 2, sm: 4 } }}>
          <Divider sx={{ mb: 1, }} />
          <ProfileDetails />
        </Box>

        {/* Dialogs */}
        <Dialog
          open={openRoleDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm" // controls the base size (xs, sm, md, lg, xl)
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 2,
              width: { xs: "90%", sm: "500px" }, // responsive width
              maxWidth: { xs: "90%", sm: "600px" }, // prevents too wide on web
            },
          }}
        >
          <DialogContent>
            <DialogContentText fontWeight="bold" mb={1}>
              Edit Profile Role:
            </DialogContentText>
            <TextField
              fullWidth
              variant="standard"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Eg. Developer"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={{
                mt: { xs: 0, sm: 0 },
                backgroundColor: "#11144C",
                "&:hover": { backgroundColor: "#0d1038" },
              }}
              onClick={profileSubmitHandler}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
            open={openNameDialog}
            onClose={handleCloseDialog}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              sx: {
                borderRadius: 3,
                p: 2,
                width: { xs: "90%", sm: "500px" },
                maxWidth: { xs: "90%", sm: "600px" },
              },
            }}
          >
            <DialogContent>
              <DialogContentText fontWeight="bold" mb={1}>
                Edit Name:
              </DialogContentText>
              <TextField
                fullWidth
                variant="standard"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                label="New Name"
              />
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: { xs: "flex-end", sm: "flex-end" }, // center on mobile
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#11144C",
                  "&:hover": { backgroundColor: "#0d1038" },
                  px: 4,
                }}
                onClick={updateNameHandler}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>

      </Box>
  );
};

export default Profile;
