import * as React from "react";
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
import { Box, Grid } from "@mui/material";
import { AddCollegeList } from "../../redux/reducers/collegeAdminlist";
import { useDispatch, useSelector } from "react-redux";
import { REACT_APP_SERVER_URL } from "../../config";

export default function BasicTable(props) {
  const dispatch = useDispatch();
  const collegeList = useSelector((state) => state.collegeAdminList.value);
  const [users, setUsers] = React.useState([]);
  const { status, view } = props;

  const requestCollegeAdmin = async () => {
    if (collegeList.length === 0) {
      const { data } = await axios.get(
        `${REACT_APP_SERVER_URL + "/admin"}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        }
      );
      setUsers(data.user);
      dispatch(AddCollegeList([...data.user]));
    }
  };
  React.useEffect(() => {
    requestCollegeAdmin();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>College</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collegeList.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.collegeName}</TableCell>
                  <TableCell>
                    <Link to={`${user._id}`}>
                      <VisibilityIcon />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {user.collegeVerification ? (
                      <Box
                        sx={{
                          color: "white",
                          padding: "0.5rem",
                          backgroundColor: "green",
                        }}
                      >
                        Verified
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "inline-block",
                          color: "white",
                          padding: "0.5rem",
                          backgroundColor: "red",
                        }}
                      >
                        Not Verified
                      </Box>
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
