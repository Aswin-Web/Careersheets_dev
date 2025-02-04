import React, {useRef} from "react";

import {
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GenerateIcon from "@mui/icons-material/Save";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { certificateActions } from "../../../redux/reducers/certificationInfo";
import { REACT_APP_SERVER_URL } from "../../../config";


const CertificateDisplay = (props) => {
  console.log("props from display", props);
  const token = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const certificateRef = useRef(null);

  const id = props.id;

  const deleteCertificaterequest = async () => {
    const response = await axios.delete(
      REACT_APP_SERVER_URL + "/user/deleteCertification/" + id,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    console.log("delete response", data);

    return data;
  };

  const deleteCertificateHandler = () => {
    deleteCertificaterequest()
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        dispatch(
          certificateActions.removeCertificate(data.existingCertificate._id)
        );
        navigate("/user/profile");
      });
  };

  const generateCertificateHandler = async() => {
    navigate("/user/profile/certification", { state: { data: props } });
  };

  return (
    <TableRow key={props._id}>
      <TableCell>{props.certificationName}</TableCell>
      <TableCell>{props.issuedBy}</TableCell>
      <TableCell>{props.certificateIssuedDate}</TableCell>
      <TableCell>{props.startDate || "N/A"}</TableCell>
      <TableCell>{props.expiryDate ? props.expiryDate : "-"}</TableCell>
      <TableCell>{props.certificateId}</TableCell>
      <TableCell>
        {props.approval === "false" ? (
          <Typography variant="body2" color="textSecondary">
            Approval Pending
          </Typography>
        ) : (
          <>
          
          {(props.issuedBy === "I-Bacus Tech" || props.issuedBy === "Greenestep") ? (<Tooltip title="Generate Certificate">
            <IconButton
              color="error"
              onClick={generateCertificateHandler}
              sx={{
                "&:hover": {
                  backgroundColor: "#CEE5D0",
                  color: "error",
                },
              }}
            >
              <GenerateIcon />
            </IconButton>
            </Tooltip>) :(<></>) }
           
          
            <Tooltip title="Delete Certificate">
            <IconButton
              color="error"
              onClick={deleteCertificateHandler}
              sx={{
                "&:hover": {
                  backgroundColor: "#CEE5D0",
                  color: "error",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
            </Tooltip>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CertificateDisplay;
