import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DialogActions, FormLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { summaryAction } from "../../../../redux/reducers/summary-data";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "../../../../config";

const AboutForm = (props) => {
  const summaryValue = useSelector((state) => state.summary.summary);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const [summary, setSummary] = React.useState();
  const summaryChangeHandler = (e) => {
    setSummary(e.target.value);
  };

  //USER FETCHING
  const sendRequest = async () => {
    const response = await axios
      .get(`${REACT_APP_SERVER_URL}/user/profile`, {
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
        setSummary(data.summary)
        // dispatch(summaryAction.addSummary({ summary:data.summary }));
      })
      .catch((error) => console.log(error));
  }, []);

  // API REQUEST TO ADD SUMMARY
  const updateRequest = async () => {
    const response = await axios
      .put(
        REACT_APP_SERVER_URL + "/user/profile/summary/",
        {
          summary,
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

  const formSubimt = async (e) => {
    e.preventDefault();
    try {
      const data = await updateRequest();
      dispatch(summaryAction.addSummary({ summary }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={formSubimt}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, width: "50ch", height: "10ch" },
        }}
        noValidate
        autoComplete="off"
      >
      <FormLabel sx={{textAlign:"center",marginTop:"50px", color:"#000"}}><p>Profile Summary</p></FormLabel>
        <TextField
          name="summary"
          variant="standard"
          onChange={summaryChangeHandler}
          sx={{backgroundColor:"#F0F0F0",borderRadius:"10px",padding:"8px"}}
          multiline
          value={summary}
          rows={5}
          placeholder="Type....."
        />
      </Box>
      <DialogActions>
        <Button type="submit" onClick={props.onClose}>
          Save
        </Button>
      </DialogActions>
    </form>
  );
};

export default AboutForm;
