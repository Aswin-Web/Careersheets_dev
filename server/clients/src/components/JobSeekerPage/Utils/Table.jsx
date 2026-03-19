import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popup from "../Utils/PopupStatus";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteStatus } from "../../../redux/reducers/application.data";
import { Box } from "@mui/material";
import { useState } from "react";
import { REACT_APP_SERVER_URL } from "../../../config";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

export default function BasicTable(props) {
  const [round, setround] = useState(-1);
  const dispatch = useDispatch();
  const { _id, author, status, view, application_id } = props;

  console.log("Data from table author", props.author);
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

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={
          view
            ? {
              display: "flex",
              marginTop: "1.5rem",
              backgroundColor: "#f4f4f4ff", // Very light grey/blue
              borderRadius: 3,
              border: "1px solid #e2e8f0",
              overflow: 'hidden'
            }
            : { display: "none" }
        }
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f1f5f9' }}>
              <TableCell sx={{ fontWeight: 800, color: '#475569', py: 2 }}>Round</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', py: 2 }}>Mode</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', py: 2 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', py: 2 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', py: 2 }}>Notes</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', py: 2 }}>Interviewer</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', py: 2 }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', py: 2 }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 800, color: '#475569', py: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.02)' }
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#64748b', fontWeight: 500 }}>{row.interviewMode}</TableCell>
                  <TableCell align="left" sx={{ color: '#64748b', fontWeight: 500 }}>{row.interviewType}</TableCell>
                  <TableCell align="left">
                    <Box sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 10,
                      display: 'inline-block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      bgcolor: row.status === 'Cleared' || row.status === 'Selected' ? 'rgba(16, 185, 129, 0.1)' : row.status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                      color: row.status === 'Cleared' || row.status === 'Selected' ? '#10b981' : row.status === 'Rejected' ? '#ef4444' : '#64748b'
                    }}>
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {row.notes ? row.notes : "—"}
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#1e293b', fontWeight: 600 }}>{row.interviewerName}</TableCell>
                  <TableCell align="left" sx={{ color: '#64748b' }}>{row.interviewerContact}</TableCell>
                  <TableCell align="left" sx={{ color: '#64748b', fontWeight: 500 }}>
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                      <Popup
                        content={
                          <IconButton size="small" sx={{ color: '#155dfc', '&:hover': { bgcolor: 'rgba(21, 93, 252, 0.08)' } }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        }
                        title="Edit Status"
                        info={{ _id, author, rowData: row, applicationId: application_id }}
                      />
                      <IconButton
                        size="small"
                        sx={{ color: '#ef4444', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.08)' } }}
                        onClick={() => setround(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                    {index === round ? (
                      <Box sx={{
                        position: 'absolute',
                        right: 16,
                        mt: 1,
                        p: 1.5,
                        bgcolor: 'white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        borderRadius: 2,
                        zIndex: 10,
                        border: '1px solid #fee2e2'
                      }}>
                        <Typography variant="caption" display="block" sx={{ mb: 1, fontWeight: 700, color: '#ef4444' }}>Delete Round {index + 1}?</Typography>
                        <Stack direction="row" spacing={1}>
                          <Button size="small" variant="contained" color="error" sx={{ textTransform: 'none', px: 1, minWidth: 0 }} onClick={() => handleDelete(application_id, index)}>Confirm</Button>
                          <Button size="small" variant="outlined" sx={{ textTransform: 'none', px: 1, minWidth: 0 }} onClick={() => setround(-1)}>Back</Button>
                        </Stack>
                      </Box>
                    ) : null}
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