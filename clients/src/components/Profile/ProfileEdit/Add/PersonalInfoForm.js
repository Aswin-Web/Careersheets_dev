import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DialogActions } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { personalActions } from "../../../../redux/reducers/personalInfo";
// LANGUAGES ARRAY
const topLanguages = [
  "Arabic",
  "Bengali",
  "Chinese",
  "English",
  "French",
  "German",
  "Hindi",
  "Indonesian",
  "Italian",
  "Japanese",
  "Kannada",
  "Korean",
  "Malayalam",
  "Tamil",
  "Telugu",
  "Portuguese",
  "Russian",
  "Spanish",
];

const PersonalInfoForm = (props) => {
  const personalState = useSelector((state) => state.personalInfo);
  const token = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const [gender, setGender] = React.useState("");
  const [hometown, setHometown] = React.useState("");
  const [birth, setBirth] = useState("");
  const [fullName, setFullName] = useState("");
  const [arrlanguages, setLanguages] = React.useState([]);

  // user details fetching

  const sendRequest = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/profile`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.log(err));
    const data = await response.data;

    return data;
  };

  useEffect(() => {
    sendRequest()
      .then((data) => {
        // console.log(data.personal[0], "formm");
        const { gender, fullName, dateOfBirth, languages, hometown } =
          data.personal[0];
        setFullName(fullName);
        // console.log("effect:", languages);
        setGender(gender);
        setLanguages(languages);
        setHometown(hometown);
        setBirth(dateOfBirth);
        // dispatch(summaryAction.addSummary({ summary:data.summary }));
      })
      .catch((error) => console.log(error));
  }, []);

  // update request
  const updateRequest = async () => {
    const response = await axios
      .put(
        process.env.REACT_APP_SERVER_URL + "/user/profile/personal/",
        {
          gender,
          hometown,
          birth,
          languages: arrlanguages,
          fullName,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.log(error, "@status error"));
    const data = await response.data;

    return data;
  };

  const formSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      // console.log(arrlanguages, "languages");
      const data = await updateRequest();
      const { gender, fullName, dateOfBirth, languages, hometown } = data;
      // console.log(
      //   gender,
      //   fullName,
      //   dateOfBirth,
      //   languages,
      //   hometown,
      //   "lllllll"
      // );
      dispatch(
        personalActions.addInfo({
          dob: dateOfBirth,
          gender,
          hometown,
          languages,
          fullName,
        })
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // console.log(gender, hometown, birth, languages);

    // dispatch(
    //   personalActions.addInfo({
    //     dob: birth,
    //     gender,
    //     hometown,
    //     languages,
    //     fullName,
    //   })
    // );
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <FormLabel sx={{ color: "#000000" }}>Add Details</FormLabel>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <InputLabel
              htmlFor="filled-adornment-amount"
              sx={{ color: "#1976d2" }}
            >
              Full Name
            </InputLabel>
            <FilledInput
              required
              sx={{ width: "550px" }}
              id="filled-adornment-amount"
              placeholder="Full Name"
              name="Full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div style={{ marginLeft: "20px", marginTop: "20px" }}>
            <FormLabel
              sx={{ color: "#1976d2" }}
              id="demo-radio-buttons-group-label"
            >
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="Gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <div>
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </div>
            </RadioGroup>
          </div>
          {/* HEADING */}

          <div style={{ display: "flex" }}>
            <div>
              <FormLabel
                sx={{ color: "#1976d2", marginLeft: "20px" }}
                id="demo-radio-buttons-group-label"
              >
                Hometown
              </FormLabel>
              <TextField
                sx={{ width: "200px" }}
                value={hometown}
                type="text"
                placeholder="Hometown"
                variant="filled"
                onChange={(e) => {
                  setHometown(e.target.value);
                }}
              />
            </div>
            <div>
              <FormLabel
                sx={{ color: "#1976d2", marginLeft: "20px", marginTop: "50px" }}
                id="demo-radio-buttons-group-label"
              >
                Date of Birth
              </FormLabel>
              <TextField
                sx={{ width: "20px" }}
                value={birth}
                type="date"
                variant="filled"
                onChange={(e) => {
                  setBirth(e.target.value);
                }}
              />
            </div>
          </div>
        </Box>
        <div style={{ marginLeft: "20px" }}>
          {/* LANGUAGES FORM SELECTION */}
          <FormLabel
            sx={{ color: "#1976d2" }}
            id="demo-radio-buttons-group-label"
          >
            Languages Known
          </FormLabel>
          <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={topLanguages}
              value={arrlanguages}
              onChange={(e, values) => {
                setLanguages(values.map((item) => item));
              }}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Select Languages"
                />
              )}
            />
          </Stack>
        </div>
        <DialogActions>
          <Button type="submit" onClick={props.onClose}>
            Save
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
