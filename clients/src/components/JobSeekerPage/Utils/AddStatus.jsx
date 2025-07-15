import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DropDown from "./Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { AddItemToStatus } from "../../../redux/reducers/application.data";
import { ShowNotification } from "../../../redux/reducers/notification.data";
import { REACT_APP_SERVER_URL } from "../../../config";

const AddStatus = (props) => {
  const dispatch = useDispatch();
  const locations = useLocation();
  let { rowData, applicationId } = locations.state || {};

  const isEdit = !!rowData;

  // Token From Redux store
  const token = useSelector((state) => state.auth.value);

  const {finalStatus } = props.info;

  console.log("row Data", rowData);
  console.log("final status", finalStatus);


  // States
  const [round, setround] = useState(() => {
    if (finalStatus === null || finalStatus === undefined) {
      if (rowData){
        return Number(rowData.round);
      }
      return 1;
    } else {
      return Number(finalStatus.round)+1;
    }
  });

  const [interviewType, setinterviewType] = useState("Written Test");
  const [interviewStatus, setinterviewStatus] = useState("Pending");
  const [interviewMode, setinterviewMode] = useState("");
  const [interviewDate, setinterviewDate] = useState(null);
  const [interviewerContact, setcontact] = useState("");
  const [notes, setnotes] = useState("");
  const [interviewerName, setInterviewerName] = useState("");

  // Form Data State
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

  const prefillForm = () => {
    if (rowData) {
      setround(rowData.round || "");
      setinterviewType(rowData.interviewType || "Written Test");
      setinterviewStatus(rowData.status || "Pending");
      setinterviewMode(rowData.interviewMode || "");
      setinterviewDate(rowData.date || null);
      setcontact(rowData.interviewerContact || "");
      setnotes(rowData.notes || "");
      setInterviewerName(rowData.interviewerName || "");
    }
  };

  useEffect(() => {
    prefillForm();
  }, [rowData]);

  const buttonController = () => {
    if (
      round !== "" &&
      interviewType !== "" &&
      interviewDate !== "" &&
      interviewerName !== "" &&
      interviewMode !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    /* let formattedDate = null;
    if (interviewDate instanceof Date) {
      formattedDate = `${interviewDate.getFullYear()}-${(
        interviewDate.getMonth() + 1
      ).toString().padStart(2, '0')}-${interviewDate.getDate().toString().padStart(2, '0')}`;
    } */

    let formattedDate = null;
    if (interviewDate instanceof Date && !isNaN(interviewDate)) {
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };

      try {
        const offsetMinutes = interviewDate.getTimezoneOffset();
        const adjustedDate = new Date(interviewDate.getTime() - (offsetMinutes * 60 * 1000));
        let resultDate = adjustedDate.toLocaleString('en-US', options);
        resultDate = resultDate.replace(/,/g, '');
    
        const timeZoneAbbrFormat = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' });
        const timeZoneAbbr = timeZoneAbbrFormat.formatToParts(adjustedDate).find(part => part.type === 'timeZoneName').value;
    
        const timeZoneNameFormat = Intl.DateTimeFormat('en-US', { timeZoneName: 'long' });
        const timeZoneName = timeZoneNameFormat.formatToParts(adjustedDate).find(part => part.type === 'timeZoneName').value;
    
        console.log("1", timeZoneAbbr);
        console.log("2", timeZoneName);
    
        formattedDate = resultDate + ' ' + timeZoneAbbr + ' (' + timeZoneName + ')';
        
    } catch (error) {
        console.error('Error formatting date:', error);
    }
       }     else {
    console.error('Invalid date provided:', interviewDate);
  }

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
      detail._id = formData._id;
    } else {
      detail.postID = props.info._id;
      detail.author = props.info.author;
    }

    const url = isEdit ? `${REACT_APP_SERVER_URL}/user/application/editstatus` : `${REACT_APP_SERVER_URL}/user/application`;
    const method = isEdit ? 'put' : 'put';

    try {
      const response = await axios[method](url, detail, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("hshshhshhs", response)

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
        //window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getOnChange = (e, type) => {
    if (type === "Status") {
      setFormData((prev) => ({
        ...prev,
        status: e
      }));
    } else if (type === "Mode") {
      setFormData((prev) => ({
        ...prev,
        interviewMode: e
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        interviewType: e
      }));
    }
  };

  return (
    <div>
      <Box sx={{ margin: "1rem" }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "3" }}>
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
          <DropDown
            options={["Online", "Offline"]}
            title={"Mode"}
            focused
            value={interviewMode}
            ongetOnChange={getOnChange}
            setdata={setinterviewMode}
          />
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
        </Box>

        <Box sx={{ width: "100%", marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "3" }}>
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
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
          <TextField
            id="outlined-read-only-input"
            label="Notes (Optional)"
            placeholder="Please write the important Notes"
            multiline
            rows={4}
            value={notes}
            sx={{ flex: "1", width: "90%", paddingRight: "5%" }}
            onChange={(e) => {
              setFormData({ ...formData, notes: e.target.value });
              setnotes(e.target.value);
            }}
          />
          <DropDown
            sx={{ marginTop: "10px" }}
            options={["Pending", "Cleared", "Rejected", "Selected"]}
            title={"Status"}
            focused
            value={interviewStatus}
            ongetOnChange={getOnChange}
            setdata={setinterviewStatus}
          />
        </Box>

        <Box>
          <label style={{ marginRight: "1rem", fontSize: "1rem" }}>Interview Date</label>
          <DatePicker
            selected={interviewDate}
            onChange={(date) => {
              setinterviewDate(date);
              setFormData({ ...formData, date });
            }}
          />
        </Box>

        <Button onClick={submitHandler} disabled={buttonController() ? false : true}>
          {isEdit ? "Edit Status" : "Add Status"}
        </Button>
      </Box>
    </div>
  );
};

export default AddStatus;