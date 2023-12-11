import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DropDown from "./Dropdown";
import { Button, Typography } from "@mui/material";
import ReusableDate from "./Date";
import ResuableButton from "./Button";
import Timer from "./Timer";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddItemToStatus } from "../../../redux/reducers/application.data";
import { ShowNotification } from "../../../redux/reducers/notification.data";
import { REACT_APP_SERVER_URL } from "../../../config";

// Form Submit Handler

const AddStatus = (props) => {
  const dispatch = useDispatch();

  const infos = useSelector((state) => state.application.value);
  //Token From Redux store
  const token = useSelector((state) => state.auth.value);
  // Passed from Card Component
  // ID is the Application ID
  // author returns User_id
  const { _id, author, finalStatus } = props.info;
  // finalStatus the user Entered
  // Input forms
  const [round, setround] = useState(
    finalStatus !== undefined ? Number(finalStatus.round) + 1 : 1
  );
  const [interviewType, setinterviewType] = useState("Written Test");
  const [interviewStatus, setinterviewStatus] = useState("Pending");
  const [interviewMode, setinterviewMode] = useState("Offline");
  const [interviewDate, setinterviewDate] = useState("");
  const [interviewerContact, setcontact] = useState("");
  const [notes, setnotes] = useState("");
  const [data, setdata] = useState({});
  const [interviewerName, setInterviewerName] = useState("");
  const [open, setOpen] = React.useState(false);

  const buttonController = () => {
    if (
      (round !== "" &&
        interviewType !== "" &&
        
        interviewDate !== "",
      interviewerName !== "",
      interviewMode !== "")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const detail = {
    round: round,
    interviewType: interviewType,
    status: interviewStatus,
    date: `${interviewDate}`,
    notes: notes,
    postID: _id,
    interviewerName,
    interviewMode,
    author,
    interviewerContact
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    // Backend Update Call
    const response = await axios.put(
      `${REACT_APP_SERVER_URL}/user/application`,
      detail,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 201) {
      dispatch(AddItemToStatus(detail));
      props.handleClose();
      dispatch(
        ShowNotification({
          visible: true,
          message: "You have successfully added the status...",
        })
      );
    }
  };

  return (
    <div>
      <Box
        sx={{
          margin: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",

            gap: "3",
          }}
        >
          <TextField
            id="outlined-read-only-input"
            label="Round"
            type="number"
            placeholder="Round No"
            focused
            disabled
            value={round}
            sx={{ marginRight: "10px", flex: 1 }}
            onChange={(e) => {
              setround(e.target.value);
            }}
          />
          <br />
          <DropDown
            options={["Online", "Offline"]}
            title={"Mode"}
            focused
            setdata={setinterviewMode}
          />
          <br />

          <DropDown
            options={[
              "Written Test",
              "Group Discussion",
              "Technical",
              "HR Manager",
            ]}
            title={"Type"}
            focused
            setdata={setinterviewType}
          />

          <br />
        </Box>

        <Box
          sx={{
            width: "100%",
            marginTop: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            gap: "3",
          }}
        >
          {/*  */}

          <TextField
            sx={{}}
            id="outlined-read-only-input"
            label="Interviewer Name"
            placeholder="Mr. Liyas Thomas"
            onChange={(e) => {
              setInterviewerName(e.target.value);
            }}
          />
          <br />
          <TextField
            id="outlined-read-only-input"
            label="Interviewer Contact"
            type="number"
            placeholder="Phone Number"
            sx={{}}
            onChange={(e) => {
              setcontact(e.target.value);
            }}
          />
          <br />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1rem 0",
          }}
        >
          <TextField
            id="outlined-read-only-input"
            label="Notes (Optional)"
            placeholder="Please write the important Notes"
            multiline
            rows={4}
            value={notes}
            sx={{
              flex: "1",
              width: "90%",
              paddingRight: "5%",
            }}
            onChange={(e) => {
              setnotes(e.target.value);
            }}
          />
          <DropDown
            sx={{
              marginTop: "10px",
            }}
            options={["Pending", "Cleared", "Rejected", "Selected"]}
            title={"Status"}
            focused
            setdata={setinterviewStatus}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "1rem 0",
          }}
        >
          <ReusableDate label="Enter the date" onchange={setinterviewDate} />
        </Box>

        <Button
          onClick={submitHandler}
          disabled={buttonController() ? false : true}
        >
          Add Status
        </Button>
      </Box>
    </div>
  );
};

export default AddStatus;
