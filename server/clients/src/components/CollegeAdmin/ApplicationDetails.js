import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { applicationDetailAction } from "../../redux/reducers/applicationDetails";
import { detailsAction } from "../../redux/reducers/userDetails";
///css file///
import classes from "./ApplicationDetails.module.css";
import { REACT_APP_SERVER_URL } from "../../config";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.company}
        </TableCell>
        <TableCell align="right">{row.designation}</TableCell>
        <TableCell align="right">{row.location}</TableCell>
        <TableCell align="right">
          {new Date(row.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell align="right"><Link to={row.joblink} target="__blank">{row.joblink}</Link></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={{fontWeight:"bold"}} variant="h6" gutterBottom component="div">
                Application Status
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight:"bold"}}>Date</TableCell>
                    <TableCell sx={{fontWeight:"bold"}}>Interview Mode</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="right">Interview Type</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="right">Interviewer Name</TableCell>

                    {/* <TableCell align="right">Notes</TableCell> */}
                    <TableCell sx={{fontWeight:"bold"}} align="right">Round</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.status.map((data) => (
                    <TableRow key={data._id}>
                      <TableCell component="th" scope="row">
                        {new Date(data.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{data.interviewMode}</TableCell>
                      <TableCell align="right">{data.interviewType}</TableCell>
                      <TableCell align="right">
                        {data.interviewerName}
                      </TableCell>
                      {/* <TableCell align="right">{data.notes}</TableCell> */}
                      <TableCell align="right">{data.round}</TableCell>
                      <TableCell align="right">{data.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ApplicationDetails() {
  const [user, setUser] = React.useState();
  const applications = useSelector((state) => state.applicationDetail.values);
  const details = useSelector((state) => state.userDetail.details);
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
          dispatch(applicationDetailAction.addDetails(data.applicationDetails));
        }
      })
      .catch((err) => console.log(err));
  }, []);
 
  return (
    <div className={classes.detailsContailer}>
      {user && (
        <div className={classes.applicationHeader}>
          <Avatar
            sx={{ margin: "1em" }}
            alt="Student image"
            src={user[0].author.displayPicture}
          />
          <div>
            <h3>{user[0].author.name}</h3>
            <p>{}</p>
          </div>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead >
            <TableRow >
              <TableCell />
              <TableCell sx={{fontWeight:"bold"}}>Company Name</TableCell>
              <TableCell sx={{fontWeight:"bold"}} align="right">Designation</TableCell>
              <TableCell sx={{fontWeight:"bold"}} align="right">Location</TableCell>
              <TableCell sx={{fontWeight:"bold"}}  align="right">AppliedDate</TableCell>
              <TableCell sx={{fontWeight:"bold"}} align="right">Job Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
