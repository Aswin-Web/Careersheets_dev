import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { green } from "@mui/material/colors";
import axios from "axios";
import { updateJobs } from "../../redux/reducers/AllJobDetails";

const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};

const JobDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const jobbID = location.pathname.split("/").pop();
  const allJobs = useSelector((state) => state.allJobs.value);
  let currentJob = allJobs.filter((x) => x._id === jobbID);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showEmailusers, setshow] = useState(false);
  const [emailUsers, setEmailUsers] = useState([]);
  const [emailres, setemailres] = useState("");
  const [btn, setbtn] = useState(false);
  const [searchusers, setsearchusers] = useState([]);
  const [selectedEmailusers, setselectedEmailusers] = useState([]);

  let applied = [];
  if (currentJob.length !== 0) {
    let a = currentJob[0].appliedUsers;
    let b = [...a];
    applied = b.reverse();
  }
  // console.log(applied);
  const handleGetAllUsers = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL + `/admin/getUsers`}`,
        {
          skills: currentJob[0].SkillsRequired,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        }
      );
      if (data.status === 200) {
        // console.log(data);
        setshow(true);
        setEmailUsers([...data.data.userlist]);
        // console.log(emailUsers);
      }
    } catch (error) {}
  };
  console.log(selectedEmailusers)
  const handleTransmitSelectedEmail = async () => {
    try {
      setbtn(!btn);
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL + `/admin/transmitmail`}`,
        {
          skill: currentJob[0].SkillsRequired,
          companyName: currentJob[0].companyName,
          role: currentJob[0].roleName,
          selectedUsers: selectedEmailusers,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        }
      );

      if (data.status === 200) {
        setemailres(data.data.msg);
        // console.log(data);
        // setshow(true);
        // setEmailUsers([...data.data.userlist]);
        // console.log(emailUsers);
      } else {
        setemailres(data.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransmitEmail = async () => {
    try {
      setbtn(!btn);
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL + `/admin/transmitmail`}`,
        {
          skill: currentJob[0].SkillsRequired,
          companyName: currentJob[0].companyName,
          role: currentJob[0].roleName,
          selectedUsers: [],
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        }
      );

      if (data.status === 200) {
        setemailres(data.data.msg);
        // console.log(data);
        // setshow(true);
        // setEmailUsers([...data.data.userlist]);
        // console.log(emailUsers);
      } else {
        setemailres(data.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SearchUser = async () => {
    const data = await axios.post(
      `${
        process.env.REACT_APP_SERVER_URL +
        `/admin/finduser?find=${searchKeyword}`
      }`,
      { jobbID: currentJob[0]._id },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      }
    );
    console.log(data);
    if (data.status === 200) {
      setsearchusers([...data.data]);
    }
  };
  const AddRecruitersToJobs = async (user_id) => {
    try {
      // setbtn(!btn);
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL + `/admin/addrecruiter`}`,
        {
          recruiter: user_id,
          jobbID: currentJob[0]._id,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        }
      );

      if (data.status === 200) {
        dispatch(
          updateJobs({
            job_id: data.data.job._id,
            jobDetails: data.data.job,
          })
        );
        setsearchusers([]);
      } else {
        // setemailres(data.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const RemoveRecruitersToJobs = async (user_id) => {
    try {
      // setbtn(!btn);
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL + `/admin/removerecruiter`}`,
        {
          recruiter: user_id,
          jobbID: currentJob[0]._id,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        }
      );
      // console.log(data);
      if (data.status === 200) {
        // console.log(data.data.job)
        dispatch(
          updateJobs({
            job_id: data.data.job._id,
            jobDetails: data.data.job,
          })
        );
      } else {
        // setemailres(data.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEmailUsers = (e, user) => {
    // console.log(user);
    if (selectedEmailusers.length === 0) {
      setselectedEmailusers([user]);
    } else {
      const isUser = selectedEmailusers.filter((x) => x.id === e.target.name);
      if (isUser.length !== 0) {
        const deleteUser = selectedEmailusers.filter(
          (x) => x.id !== e.target.name
        );
        setselectedEmailusers([...deleteUser]);
      } else {
        setselectedEmailusers([...selectedEmailusers, user]);
      }
    }
  };
  // console.log(selectedEmailusers, "REFER");
  return (
    <Box display={{ display: "flex", flexDirection: "row-reverse" }}>
      <Box
        sx={{
          width: "25%",
          Height: "80vh",
          margin: "1rem",
          padding: "0.5rem",
          border: "1px solid black",
          borderRadius: "10px",
        }}
      >
        <h3>Applied Users</h3>
        <Box
          sx={{
            padding: "1rem",
          }}
        >
          {currentJob[0] !== undefined ? (
            applied.map((item, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent:'space-between',
                  alignItems: "center",
                  border: "1px solid black ",
                  padding: "0.5rem",
                  borderRadius: "10px",
                  marginBottom: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    width: "30%",
                  }}
                >
                  <Avatar
                    alt={item.userId.name}
                    src={item.userId.displayPicture}
                  />
                </Box>
                <Box
                  sx={{
                    width: "70%",
                  }}
                >
                  <h6
                    style={{
                      fontSize: "1rem",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <Link
                      to={`/admin/profile/resume/${currentJob[0]._id}/${item.userId._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={() => {
                        if (!item.isViewed) {
                          const pageViewed = async () => {
                            const response = await axios
                              .post(
                                `${process.env.REACT_APP_SERVER_URL}/admin/user/view`,
                                {
                                  userId: item.userId._id,
                                  jobId: currentJob[0]._id,
                                },
                                {
                                  headers: {
                                    "Content-type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "admin"
                                    )}`,
                                  },
                                }
                              )
                              .catch((err) => console.log(err));
                          };
                          pageViewed();
                        }
                      }}
                    >
                      {item.userId.name.slice(0, 7)}....
                    </Link>
                  </h6>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                  {/* {item.isWishlisted ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "red" }} />
                  )} */}

                  {item.isViewed ? <DoneIcon sx={{ color: "green" }} /> : <></>}

                  {/* <DoneIcon sx={{ color: "green" }} /> */}
                  {/* <FavoriteBorderIcon sx={{ color: "red" }} /> */}
                </Box>
              </Box>
            ))
          ) : (
            <p> None applied </p>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          padding: "1rem",
          width: "75%",
          minHeight: "80vh",
        }}
      >
        {currentJob.length !== 0 ? (
          <Box
            sx={{
              backgroundColor: "white",
              padding: "1rem",
              border: "1px solid black",

              margin: "1rem",
              borderRadius: "10px",
            }}
          >
            {/* Heading */}
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <h3>{currentJob[0].roleName}</h3>
                <Button
                  sx={{
                    color: "black",
                    border: "1px solid black",
                  }}
                  onClick={() => navigate(`/admin/edit/${currentJob[0]._id}`)}
                >
                  Edit
                </Button>
              </Box>
              <h4>{currentJob[0].companyName}</h4>
            </Box>
            {/* Horizontal Columns */}
            <Box>
              <Box sx={centerItems}>
                {" "}
                <WorkOutlineIcon />
                {currentJob[0].experience} years
              </Box>
              <Box sx={centerItems}>
                <CurrencyRupeeIcon />
                {currentJob[0].salary}
              </Box>
            </Box>
            <Box sx={centerItems}>
              <ApartmentIcon />
              {currentJob[0].location}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0.5rem 0",
                alignItems: "center",
              }}
            >
              <Box sx={centerItems}>
                <DateRangeIcon />
                {new Date(currentJob[0].createdAt).toLocaleDateString()}
              </Box>
              {/* <Box>
            <Button>View</Button>
          </Box> */}
            </Box>
            {/* About Us */}
            <Box>
              <h3>About Us</h3>
              <br />
              <p>{currentJob[0].companyDescription}</p>
              <br />
            </Box>
            {/* Job Description */}
            <Box>
              <h3>Job Description</h3>
              <br />
              <p>{currentJob[0].JobDescription}</p>
              <br />

              <br />
              <Box>
                <h4>Responsibilities : </h4>
                <p> {currentJob[0].Responsibilites}</p>
              </Box>
              <br />
              <Box>
                <Typography
                  sx={{
                    display: "inline-block",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Skills :{" "}
                </Typography>
                <Typography variant="p">
                  {" "}
                  {currentJob[0].SkillsRequired}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    display: "inline-block",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Role :{" "}
                </Typography>
                <Typography variant="p"> {currentJob[0].roleName}</Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    display: "inline-block",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Industry Type :{" "}
                </Typography>
                <Typography variant="p">
                  {" "}
                  {currentJob[0].IndustryType}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    display: "inline-block",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Department :{" "}
                </Typography>
                <Typography variant="p">
                  {currentJob[0].departmentType}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    display: "inline-block",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Employment Type:
                </Typography>
                <Typography variant="p">
                  {" "}
                  {currentJob[0].employmentType}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    display: "inline-block",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Education UG:
                </Typography>
                <Typography variant="p"> {currentJob[0].education}</Typography>
              </Box>
              <Box
                sx={{
                  margin: "10px",
                }}
              >
                <Button variant="contained" onClick={() => handleGetAllUsers()}>
                  {" "}
                  View Jobseekers{" "}
                </Button>
                <p>
                  This will generate the users with the same skillset you are
                  looking for the oppourtunity
                  <Button onClick={() => setshow(!showEmailusers)}>
                    {showEmailusers ? "Hide" : "Show"}
                  </Button>
                </p>
                <div hidden={showEmailusers ? false : true}>
                  {emailUsers.length !== 0 ? (
                    <>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h6> Sl.no </h6>
                        <h6>Candidate Name</h6>
                        <h6>View Resume</h6>
                        <h6>Checkbox</h6>
                      </li>
                      <ol>
                        {emailUsers.map((el, index) => (
                          <li
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <h6> {index + 1} </h6>
                            <h6>{el.name}</h6>
                            <h6>
                              <Link
                                to={`/admin/profile/resume/${currentJob[0]._id}/${el.id}`}
                                target="_blank"
                                style={{
                                  textDecoration: "none",
                                  color: "green",
                                }}
                              >
                                Resume*
                              </Link>
                            </h6>
                            <input
                              type="checkbox"
                              onChange={(e) => handleAddEmailUsers(e, el)}
                              name={el.id}
                            ></input>
                          </li>
                        ))}
                      </ol>
                      <div>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleTransmitEmail()}
                          disabled={btn}
                        >
                          Send Mail to all Individual's
                        </Button>
                        <Button
                          sx={{ margin: "1rem" }}
                          variant="contained"
                          color="success"
                          onClick={() =>  handleTransmitSelectedEmail()}
                          disabled={
                            selectedEmailusers.length === 0 ? true : false
                          }
                        >
                          Send Mail to Selected Individual's (
                          {selectedEmailusers.length})
                        </Button>
                        {emailres !== "" ? (
                          <p style={{ color: "green", margin: "10px" }}>
                            {emailres}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  ) : (
                    <p>No users present with the skillset</p>
                  )}
                </div>
              </Box>
              <Box>
                <h5>Recruiter access</h5>
                {currentJob[0].recruitersInfo.map((el, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        margin: "1rem",
                      }}
                    >
                      <h1>
                        <Avatar src={el.displayPicture} />
                      </h1>

                      <h5>{el.name}</h5>
                      <Button
                        variant="contained"
                        sx={{
                          color: "white",
                          bgcolor: "Red",
                        }}
                        onClick={() => RemoveRecruitersToJobs(el._id)}
                      >
                        {" "}
                        Remove
                      </Button>
                    </Box>
                  );
                })}
              </Box>
              <Button> Add Recruiters</Button>
              <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <TextField
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Button variant="contained" onClick={() => SearchUser()}>
                  Search
                </Button>
              </Box>
              {searchusers.length !== 0 ? (
                searchusers.map((el, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        margin: "1rem",
                      }}
                    >
                      <h1>
                        <Avatar src={el.displayPicture} />
                      </h1>

                      <h5>{el.name}</h5>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => AddRecruitersToJobs(el._id)}
                      >
                        {" "}
                        Add
                      </Button>
                    </Box>
                  );
                })
              ) : (
                <p> No Recruiters Found</p>
              )}
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default JobDetails;
