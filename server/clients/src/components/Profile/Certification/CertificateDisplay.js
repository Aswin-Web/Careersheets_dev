import React, { useState } from "react";

import {
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Add from "../ProfileEdit/Add/Add";

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
  const [isEdit, setIsEdit] = useState(false);

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

  const generateCertificateHandler = async () => {
    if (props.state === "user") {
      navigate("/user/profile/certification", { state: { data: props } });
    } else {
      navigate("print", { state: { data: props } });
    }
  };

  const editCertificateHandler = async () => {
    console.log("ssssaaaaaaaaaaa", isEdit);
    try {
      setIsEdit(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseAdd = () => {
    setIsEdit(false);
  };

  return (
    <>
      <TableRow sx={{textAlign:"justify"}} key={props._id}>
        <TableCell >{props.certificationName}</TableCell>
        <TableCell>{props.issuedBy}</TableCell>
        <TableCell>
          {new Date(props.certificateIssuedDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }) || "N/A"}
        </TableCell>
        <TableCell>
          {new Date(props.startDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }) || "N/A"}
        </TableCell>
        <TableCell>
          {props.endDate
            ? new Date(props.endDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "-"}
        </TableCell>
        <TableCell>
          {props.expiryDate
            ? new Date(props.expiryDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "-"}
        </TableCell>

        <TableCell>
          {props.approval === "false" ? (
            <>
              <Tooltip title="Certification Approval is Pending">
                {props.issuedBy === "I-Bacus Tech" ||
                props.issuedBy === "Greenestep" ? (
                  <IconButton disabled={true}>
                    <PrintIcon />
                  </IconButton>
                ) : (
                  <></>
                )}

                {props.state === "collegeadmin" ? (
                  <></>
                ) : (
                  <IconButton disabled={true}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Tooltip>
              <Tooltip title="You Can Edit The Information Until The Certificate is Approved">
                <IconButton
                  onClick={editCertificateHandler}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              {props.issuedBy === "I-Bacus Tech" ||
              props.issuedBy === "Greenestep" ? (
                <Tooltip title="Generate Certificate">
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
                    <PrintIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  {props.state === "collegeadmin" ? (
                    <>Issued by Other Oraganization</>
                  ) : (
                    <></>
                  )}
                </>
              )}

              {props.state === "collegeadmin" ? (
                <></>
              ) : (
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
              )}


            </>
          )}
        </TableCell>
      </TableRow>
      {isEdit && (
        <Add Card={"certification"} editdata={props} onCloseEdit={handleCloseAdd} />
      )}
    </>
  );
};

export default CertificateDisplay;
