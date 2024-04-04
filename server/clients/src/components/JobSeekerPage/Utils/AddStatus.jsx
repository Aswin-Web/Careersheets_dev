import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DropDown from "./Dropdown";
import Cards from "../Cards"
import { Button, Typography } from "@mui/material";
import ReusableDate from "./Date";
import ResuableButton from "./Button";
import Timer from "./Timer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { AddItemToStatus } from "../../../redux/reducers/application.data";
import { ShowNotification } from "../../../redux/reducers/notification.data";
import { REACT_APP_SERVER_URL } from "../../../config";

// Form Submit Handler

const AddStatus = (props) => {
  const dispatch = useDispatch();

  const locations = useLocation();
  let { rowData, applicationId } = locations.state || {};
  
  console.log("Row Data from Addstatus", rowData,applicationId);

  const isEdit = !!rowData;
  
  const infos = useSelector((state) => state.application.value);
  //Token From Redux store
  const token = useSelector((state) => state.auth.value);
  // Passed from Card Component
  // ID is the Application ID
  // author returns User_id
  const { _id, author, finalStatus } = props.info;
  console.log("props from add status", props.info._id)
  /* const { rowData } = props.info;
  const { _id, author, finalStatus } = rowData ?? {}; */


  //console.log("Rowdata",rowData)
  
  // finalStatus the user Entered
  // Input forms
  const [round, setround] = useState(
    finalStatus !== undefined ? Number(finalStatus.round) + 1 : 1
  );
  const [interviewType, setinterviewType] = useState("Written Test");
  const [interviewStatus, setinterviewStatus] = useState("Pending");
  const [interviewMode, setinterviewMode] = useState("");
  const [interviewDate, setinterviewDate] = useState("");
  const [interviewerContact, setcontact] = useState("");
  const [notes, setnotes] = useState("");
  const [data, setdata] = useState({});
  const [interviewerName, setInterviewerName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Perform any additional actions with the selected date
  };

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

  /* const detail = {
    round: round,
    interviewType: interviewType,
    status: interviewStatus,
    date: interviewDate,
    notes: notes,
    postID: _id,
    interviewerName,
    interviewMode,
    author,
    interviewerContact
  }; */

  
  const [formData, setFormData] = useState({
    round: rowData?.round || "",
    interviewType: rowData?.interviewType || "",
    status: rowData?.status || "",
    date: rowData?.date || "",
    notes: rowData?.notes || "",
    interviewerName: rowData?.interviewerName || "",
    interviewerContact: rowData?.interviewerContact || "",
    interviewMode: rowData?.interviewMode || "",
    _id: rowData?._id || ""
  });

  console.log("form data add status", formData)
  
  const prefillForm = () => {
    if (rowData) {
      setround(rowData.round || "");
      setinterviewType(rowData.interviewType || "Written Test");
      setinterviewStatus(rowData.status || "Pending");
      setinterviewMode(rowData.interviewMode || "");
      setinterviewDate(rowData.date || "");
      setcontact(rowData.interviewerContact || "");
      setnotes(rowData.notes || "");
      setInterviewerName(rowData.interviewerName || "");
    }
  };

  useEffect(() => {
    prefillForm(); 
  }, [rowData]);

  //console.log("Details from frontend add status",detail);

  const resetFormFields = () => {
    setround(finalStatus !== undefined ? Number(finalStatus.round) + 1 : 1);
    setinterviewType("Written Test");
    setinterviewStatus("Pending");
    setinterviewMode("");
    setinterviewDate("");
    setcontact("");
    setnotes("");
    setInterviewerName("");
  
    // Update form data state to clear the values
    setFormData({
      round: "",
      interviewType: "Written Test",
      status: "Pending",
      date: "",
      notes: "",
      interviewerName: "",
      interviewerContact: "",
      interviewMode: "",
      _id: ""
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const formattedDate = formatDate(interviewDate);

    const detail = {
      round,
      interviewType,
      status: interviewStatus,
      date: formattedDate,
      notes,
      interviewerName,
      interviewMode,
      interviewerContact
    };
    
    if (isEdit) {
      detail.applicationId = applicationId;
    } else {
      detail.postID = props.info._id; 
      detail.author = props.info.author;
    }

    const url = isEdit ? `${REACT_APP_SERVER_URL}/user/application/editstatus` : `${REACT_APP_SERVER_URL}/user/application`;
    const method = isEdit ? 'put' : 'put'; 
  
    try {
      console.log("Details", detail);

      const response = await axios[method](url, detail, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        dispatch(AddItemToStatus(detail));
        props.handleClose();
        dispatch(
          ShowNotification({
            visible: true,
            message: isEdit ? "You have successfully edited the status..." : "You have successfully added the status...",
          })
        );
        locations.state = {};
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    return () => {
      locations.state = {};
    };
  }, []);

  

  const getOnChange=(e,type)=>{
    console.log(e,"asjhvdjasvdjavs",type);
    console.log(formData)
    if(type==="Status"){
      setFormData((prev)=>({
        ...prev,
        status:e
      }))
    } else if(type ==="Mode"){
      setFormData((prev)=>({
        ...prev,
        interviewMode:e
      }))
    }  
      else{
        setFormData((prev)=>({
          ...prev,
          interviewType:e
        }))
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
              setFormData({ ...formData, round: e.target.value })
              setround(e.target.value);
            }}

          />
          <br />

          <DropDown
            options={["Online", "Offline"]}
            title={"Mode"}
            focused
            value={interviewMode}
            ongetOnChange={getOnChange}
            setdata={setinterviewMode}
          />
          <br/>

          <DropDown
            options={[
              "Written Test",
              "Group Discussion",
              "Technical",
              "HR Manager",
            ]}
            title={"Type"}
            focused
            value={interviewType}
            ongetOnChange={getOnChange}
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
  id="outlined-read-only-input"
  label="Interviewer Name"
  type="text"
  placeholder="Mr. Liyas Thomas"
  value={interviewerName}
  onChange={(e) => {
    setFormData({ ...formData, interviewerName: e.target.value });
    setInterviewerName(e.target.value);
  }}
/>

          <br />
          <TextField
  id="outlined-read-only-input"
  label="Interviewer Contact"
  type="number"
  placeholder="Phone Number"
  value={interviewerContact}
  onChange={(e) => {
    setFormData({ ...formData, interviewerContact: e.target.value });
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
              setFormData({ ...formData, notes: e.target.value });
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
            value={interviewStatus}
            ongetOnChange = {getOnChange}
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
         {/*  <ReusableDate
  label="Enter the date"
  focused
            value={interviewDate}
            onChange={(e) => {
              setFormData({ ...formData, date: e.target.value });
              setinterviewDate(e.target.value);
            }}
            setdata={setinterviewDate}
/> */}
{/* <ReusableDate
  label="Enter the date"
  focused
  value={interviewDate}
  onChange={(date) => {
    // Format the date received before setting it
    const formattedDate = formatDate(date);
    setFormData({ ...formData, date: formattedDate });
    setinterviewDate(formattedDate);
  }}
/> */}
<ReusableDate
  label="Enter the date"
  focused
  value={interviewDate}
  onChange={handleDateChange} 
/>

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