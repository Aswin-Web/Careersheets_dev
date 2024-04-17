import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popup from "../Utils/PopupStatus";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import {useSelector,  useDispatch } from "react-redux";
import { DeleteStatus } from "../../../redux/reducers/application.data";
import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { REACT_APP_SERVER_URL } from "../../../config";
import AddStatusComponent from "../Utils/AddStatus";

function createData(
  name,
  calories,
  fat,
  carbs,
  protein
) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable(props) {
  const navigate = useNavigate();
  const [alert, setalert] = useState(false);
  const [round, setround] = useState(-1);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const { _id, author, status, view, application_id } = props;
  
  console.log("Data from table author", props.author);

  const [rowData, setRowData] = useState(null);

  const handleDelete = async (application_id, index) => {
    const response = await axios.post( 
      `${REACT_APP_SERVER_URL}/user/application/removestatus`,
      { post_id: application_id, roundIndex: index },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("user")
          )}`,
        },
      }
    );
    if (response.status === 200) {
      setround(-1);
      dispatch(DeleteStatus(response.data.modify));
    }
  };

  const handleEdit = async (row) => {
    navigate(`/user`, { state: { rowData: row, applicationId: application_id } }); 
    setRowData(row);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={
          view
            ? { display: "flex", marginTop: "10px", backgroundColor: "#accbee" }
            : { display: "none" }
        }
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Round</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status&nbsp;</TableCell>
              <TableCell>Notes&nbsp;</TableCell>
              <TableCell>Interviewer Name&nbsp;</TableCell>
              <TableCell>Interviewer Contact&nbsp;</TableCell>
              <TableCell>Interview Date&nbsp;</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.interviewMode}</TableCell>
                  <TableCell align="left">{row.interviewType}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">
                    {row.notes ? row.notes : "None"}
                  </TableCell>
                  <TableCell align="left">{row.interviewerName}</TableCell>
                  <TableCell align="left">{row.interviewerContact}</TableCell>
                  <TableCell align="left">
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    <DeleteIcon
                      sx={{ display: !alert ? "block" : "none" }}
                      onClick={() => setround(index)}
                    />
                    {index === round ? (
                      <Box sx={{}}>
                        <p>Do you want to delete it</p>
                        <button
                          style={{ textTransform: "capitalize" }}
                          onClick={(e) => handleDelete(application_id, index)}
                        >
                          Delete
                        </button>{" "}
                        <button
                          style={{ textTransform: "capitalize" }}
                          onClick={() => {
                            setround(-1);
                          }}
                        >
                          Cancel
                        </button>
                      </Box>
                    ) : null}
                  </TableCell>
                  <TableCell align="left">
  <Popup
    content={
      <>
        <EditIcon
          sx={{ display: !alert ? "block" : "none" }}
          onClick={() => handleEdit(row)}
        />
        {index === round ? (
          <Box sx={{}}>
            <button
              style={{ textTransform: "capitalize" }}
              onClick={() => handleEdit(row)}
            ></button>{" "}
          </Box>
        ) : null}
      </>
    }
    title="Edit Post"
    info={{ _id, author }}
  />
</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}