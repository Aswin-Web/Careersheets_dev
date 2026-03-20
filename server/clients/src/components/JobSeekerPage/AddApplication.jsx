import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import ReusableDate from "./Utils/Date";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AddApplication } from "../../redux/reducers/application.data";
import { ShowNotification } from "../../redux/reducers/notification.data";
import { REACT_APP_SERVER_URL } from "../../config";

export default function FormPropsTextFields(props) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.value);

  // Forms input
  const [company, setcompany] = React.useState("");
  const [designation, setdesignation] = React.useState("");
  const [whereApply, setwhereApply] = React.useState("");
  const [joblink, setjoblink] = React.useState("");
  const [applicationDate, setapplicationDate] = React.useState("");
  const [location, setlocation] = React.useState("");


  const handleDateChange = (date) => {
    setapplicationDate(date);
  };

  console.log("data from ad application", company,designation, whereApply, joblink, applicationDate,location);
  console.log("date", applicationDate);

  const buttonController = () => {
    if (
      company !== "" &&
      designation !== "" &&
      whereApply !== "" &&
      joblink !== "" &&
      applicationDate !== "" &&
      location !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Box
      component="form"
      sx={{
        backgroundColor: "#f4f4f4ff",

        padding: "25px",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Box>
        <Box>
          <Box>
            <TextField
              required
              id="outlined-required"
              label="Company Name"
              placeholder="Google"
              autoFocus
              focused
              onChange={(e) => {
                setcompany(e.target.value);
              }}
            />
            <TextField
              id="outlined-disabled"
              label="Designation"
              placeholder="Software Developer"
              focused
              onChange={(e) => {
                setdesignation(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-read-only-input"
              label="Where Did You Apply"
              placeholder="Linkedin"
              focused
              onChange={(e) => {
                setwhereApply(e.target.value);
              }}
            />
            <TextField
              id="outlined-number"
              label="Job Link "
              type="text"
              placeholder="https://google.com"
              focused
              onChange={(e) => {
                setjoblink(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap:'wrap'
          }}
        >
          <Box>

          <TextField
            id="outlined-number"
            label="Location"
            type="text"
            focused
            onChange={(e) => {
              setlocation(e.target.value);
            }}
            />
            </Box>
          <Box sx={{ marginTop: "-6px" }}>
            <ReusableDate label="Applied Date" value={applicationDate} onChange={handleDateChange} />
          </Box>
        </Box>
      </Box>
      <Button
        disabled={!buttonController()}
        onClick={async (e) => {
          e.preventDefault();
          const response = await axios.post(
            `${REACT_APP_SERVER_URL}/user/application`,
            {
              company,
              designation,
              whereApply,
              joblink,
              applicationDate,
              location,
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 201) {
            dispatch(AddApplication([response.data]));
            props.submitClose();
            dispatch(
              ShowNotification({
                visible: true,
                message: "You have Successfully Added a post",
              })
            );
          }
        }}

        sx={{
          backgroundColor: "#0096FF",
          color: "#fff", // default text color
          "&:hover": {
            backgroundColor: "#1565c0",
          },
          "&.Mui-disabled": {
            backgroundColor: "#0096FF", // light blue background when disabled
            color: "#fff", // keep text white even when disabled
            cursor: "pointer",
            
          },
          px: 3,
          ml:1,
          py: 1.2,
          borderRadius: 2,
          textTransform: "none",
          cursor: "pointer",
        }}

      
>
      
        Save
      </Button>

    </Box>
  );
}
