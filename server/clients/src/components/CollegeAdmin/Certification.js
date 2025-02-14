import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { applicationDetailAction } from "../../redux/reducers/applicationDetails";
import CertificateDisplay from "../Profile/Certification/CertificateDisplay";
///css file///
import classes from "./ApplicationDetails.module.css";
import { REACT_APP_SERVER_URL } from "../../config";
import { certificateActions } from "../../redux/reducers/certificationInfo";

export default function Certification() {
  const [user, setUser] = React.useState();
  const [certificate, setCertificate] = React.useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = useSelector((state) => state.auth.value);

  const sendRequest = async () => {
    const response = await axios.get(
      REACT_APP_SERVER_URL + "/collegeadmin/" + id,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    return data;
  };

  React.useEffect(() => {
    sendRequest()
      .then((data) => {
        if (data) {
          setUser(data.applicationDetails);
          setCertificate(data.certificationInfo);
          dispatch(applicationDetailAction.addDetails(data.applicationDetails));
          dispatch(
            certificateActions.getCertifications(data.certificationInfo)
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{margin:"2rem"}}>
      {user && (
        <div style={{ display: "flex", alignItems: "center",  }}>
            <Avatar alt="Student image" src={user[0].author.displayPicture} />
            <h3 style={{margin:"1rem"}}>{user[0].author.name}</h3>
        </div>
      )}

      <Table
        sx={{
          borderCollapse: "collapse",
          width: "100%",
          backgroundColor: "white",
          width:"98%",
          marginTop:"1rem"
        }}
      >
        <TableHead sx={{ backgroundColor: "#CEE5D0" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", width: "14%" }}>
              Certificate Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", width: "14%" }}>
              Issued By
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", width: "14%" }}>
              Issued On
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", width: "14%" }}>
              Start Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", width: "14%" }}>
              Expiry Date
            </TableCell>

            <TableCell sx={{ fontWeight: "bold", width: "16%" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certificate?.length > 0 ? (
            <>
              {certificate.map((item) => (
                <CertificateDisplay
                  key={item._id}
                  id={item._id}
                  certificationName={item.certificationName}
                  issuedBy={item.issuedBy}
                  certificateIssuedDate={item.certificateIssuedDate}
                  startDate={item.startDate}
                  expiryDate={item.expiryDate}
                  certificateId={item.certificateId}
                  approval={item.approval}
                  name={user[0].author.name}
                  state={"collegeadmin"}
                />
              ))}{" "}
            </>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
