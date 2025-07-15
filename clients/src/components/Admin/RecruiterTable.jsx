import * as React from "react";
import "./RecruiterTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { REACT_APP_SERVER_URL } from "../../config";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RecruiterTable(props) {
  const dispatch = useDispatch();
  const collegeList = useSelector((state) => state.collegeAdminList.value);
  const [users, setUsers] = React.useState([]);
  const { status, view } = props;

  const requestCollegeAdmin = async () => {
    const { data } = await axios.get(
      `${REACT_APP_SERVER_URL + "/admin/recruiter"}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      }
    );
    setUsers(data.user);
    console.log(data);
  };
  React.useEffect(() => {
    requestCollegeAdmin();
  }, []);
  const handleEnableDisable = async (id) => {
    const { data } = await axios.get(
      `${REACT_APP_SERVER_URL + "/admin/recruiter/verify/" + id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      }
    );
    // setUsers(data.user);
    if (data.isEdited) {
      const modifyUser = users.map((x) => {
        if (x._id === id) {
          return {
            ...x,
            verification: !x.verification,
          };
        }
        return {
          ...x,
        };
      });
      setUsers(modifyUser);
    }
    console.log(data);
  };
  return (
    
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Button</TableCell>

                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell >
                    {user.name}
                  </TableCell>

                  <TableCell >
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEnableDisable(user._id)}>
                      Enable/Disable
                    </Button>
                  </TableCell>
                  <TableCell>
                    {user.verification ? (
                      <Box className="access-granted">Access granted</Box>
                    ) : (
                      <Box className="access-denied">Access Denied</Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
