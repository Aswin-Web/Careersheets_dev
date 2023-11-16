import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import { object, string } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";

import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { DisAbleJobs, updateJobs } from "../../redux/reducers/AllJobDetails";
import Skillform from "../Profile/ProfileEdit/Add/Skillform";
import SkillAdminform from "./SkillAdminForm";

const EditJobOppourtunity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, seterrors] = useState({
    errors: false,
    message: "",
  });
  const [showEmailusers, setshow] = useState(false);
  const [emailUsers, setEmailUsers] = useState([]);
  const [skills, setSkills] = useState(["a"]);

  const GenerateSkills = (skill) => {
    // setjobss({...allJobs,SkillsRequired:skill})
    // setSkills(skill);
  };
  const location = useLocation();
  const jobbID = location.pathname.split("/").pop();
  const allJobs = useSelector((state) => state.allJobs.value);
  // const currentJob = allJobs.filter((x) => x._id === jobbID);
  const [currentJob, setjobss] = useState({
    IndustryType: "AShwin",
    JobDescription: "",
    Responsibilites: "",
    SkillsRequired: "",
    companyAddress: "",
    companyDescription: "",
    companyName: "",
    createdAt: "",
    departmentType: "",
    education: "",
    employmentType: "",
    experience: "",
    isClosed: "",
    location: "",
    roleName: "",
    role_Category: "",
    salary: "",
    pincode: "",
    projectSwitch: false,
  });
  const [addedSkills, setaddedSkills] = useState([]);
  const [inputs, setInputs] = useState();
  const [skillItems, setskillItems] = useState([]);
  // const [projectSwitch, setProjectSwitch] = useState(false);

  const handleDelete = (skill) => {
    const deleteSkill = addedSkills.filter((x) => x !== skill);
    setaddedSkills([...deleteSkill]);
    setjobss({ ...currentJob, SkillsRequired: deleteSkill.toString() });
  };
  const inputChangeHandler = (event, values) => {
    setInputs(values);
  };

  const isAddbtn = false;
  const token = useSelector((state) => state.auth.value);

  const getAllSkills = async () => {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/user/platformskills",

      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(response,"Skills From Backend");
    const data = await response.data;

    if (response.status === 200) {
      setskillItems([...response.data.skill]);
      return data;
    }
  };

  const GetCurrentJob = async (info) => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL + `/admin/jobs/${jobbID}`}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      }
    );

    if (data.status === 200) {
      // console.log(currentJob[0]._id);
      setjobss({ ...data.data.job[0] });
      console.log(data.data.job[0].SkillsRequired, "hdssfuish");
      setSkills(data.data.job[0].SkillsRequired);

      setaddedSkills([...data.data.job[0].SkillsRequired.split(",")]);
    }
    // navigate("/admin/jobs");

    // dispatch(AddJobs(data.allJobs));
  };
  console.log(skills);
  console.log(currentJob);
  useEffect(() => {
    GetCurrentJob();
    getAllSkills();
  }, []);
  console.log(currentJob[0]);

  const NetworkRequest = async (info) => {
    const data = await axios.put(
      `${process.env.REACT_APP_SERVER_URL + `/admin/jobs/${jobbID}`}`,
      info,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      }
    );

    if (data.status === 200) {
      console.log(currentJob._id);
      dispatch(
        updateJobs({
          job_id: data.data.job._id,
          jobDetails: data.data.job,
        })
      );
    }
    navigate("/admin/jobs");

    // dispatch(AddJobs(data.allJobs));
  };

  const JobDisable = async () => {
    console.log(currentJob);
    try {
      const data = await axios.put(
        `${
          process.env.REACT_APP_SERVER_URL +
          `/admin/jobs/disable/${currentJob._id}`
        }`,
        {
          // This is the input Element REQ..BODY
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        }
      );

      console.log(data);
      if (data.status === 200) {
        dispatch(
          DisAbleJobs({
            _id: data.data.job._id,
            job: data.data.job,
          })
        );
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(addedSkills, "new skills");
  const skillFormSubmitHandler = () => {
    // props.onClose

    if (true) {
      setaddedSkills((prev) => {
        if (prev.length !== 0) {
          const newArray = prev.filter((x) => x === inputs);
          if (newArray.length === 0) {
            setjobss({
              ...currentJob,
              SkillsRequired: [...prev, inputs].toString(),
            });
            return [...prev, inputs];
          } else {
            setjobss({ ...currentJob, SkillsRequired: prev.toString() });
            return prev;
          }
        } else {
          setjobss({ ...currentJob, SkillsRequired: inputs.toString() });
          return [...[inputs]];
        }
      });
      //   setInputs("")
    }
  };

  // return <></>
  // const formik = useFormik({
  //   initialValues:
  //     currentJob.length === -1
  //       ? {
  //           IndustryType: currentJob[0].IndustryType,
  //           JobDescription: currentJob[0].JobDescription,
  //           Responsibilites: currentJob[0].Responsibilites,
  //           SkillsRequired: currentJob[0].SkillsRequired,
  //           companyAddress: currentJob[0].companyAddress,
  //           companyDescription: currentJob[0].companyDescription,
  //           companyName: currentJob[0].companyName,
  //           createdAt: currentJob[0].createdAt,
  //           departmentType: currentJob[0].departmentType,
  //           education: currentJob[0].education,
  //           employmentType: currentJob[0].employmentType,
  //           experience: currentJob[0].experience,
  //           isClosed: currentJob[0].isClosed,
  //           location: currentJob[0].location,
  //           roleName: currentJob[0].roleName,
  //           role_Category: currentJob[0].role_Category,
  //           salary: currentJob[0].salary,
  //           pincode: currentJob[0].pincode,
  //         }
  //       : {
  //           IndustryType: "AShwin",
  //           JobDescription: "",
  //           Responsibilites: "",
  //           SkillsRequired: "",
  //           companyAddress: "",
  //           companyDescription: "",
  //           companyName: "",
  //           createdAt: "",
  //           departmentType: "",
  //           education: "",
  //           employmentType: "",
  //           experience: "",
  //           isClosed: "",
  //           location: "",
  //           roleName: "",
  //           role_Category: "",
  //           salary: "",
  //           pincode: "",
  //         },
  // validationSchema: { userSchema },

  //   onSubmit: (values) => {
  //     // console.log(values);
  //     values.SkillsRequired = skills;

  //     if (
  //       values.IndustryType !== "" &&
  //       values.JobDescription !== "" &&
  //       values.Responsibilites !== "" &&
  //       values.SkillsRequired !== "" &&
  //       values.companyAddress !== "" &&
  //       values.companyDescription !== "" &&
  //       values.companyName !== "" &&
  //       values.departmentType !== "" &&
  //       values.education !== "" &&
  //       values.employmentType !== "" &&
  //       values.experience !== "" &&
  //       values.location !== "" &&
  //       values.roleName !== "" &&
  //       values.role_Category !== "" &&
  //       values.salary !== "" &&
  //       values.pincode !== ""
  //     ) {
  //       NetworkRequest(values);
  //       // navigate("/admin/jobs");
  //       return seterrors({
  //         errors: false,
  //         message: "Every fields are inserted properly",
  //       });
  //     } else {
  //       return seterrors({
  //         errors: false,
  //         message: "*Some fields are not inserted properly",
  //       });
  //     }
  //   },
  // });

  const handleSubmit = () => {
    if (
      currentJob.IndustryType !== "" &&
      currentJob.JobDescription !== "" &&
      currentJob.Responsibilites !== "" &&
      currentJob.SkillsRequired !== "" &&
      currentJob.companyAddress !== "" &&
      currentJob.companyDescription !== "" &&
      currentJob.companyName !== "" &&
      currentJob.departmentType !== "" &&
      currentJob.education !== "" &&
      currentJob.employmentType !== "" &&
      currentJob.experience !== "" &&
      currentJob.location !== "" &&
      currentJob.roleName !== "" &&
      currentJob.role_Category !== "" &&
      currentJob.salary !== "" &&
      currentJob.pincode !== ""
    ) {
      NetworkRequest(currentJob);
      navigate("/admin/jobs");
      return seterrors({
        errors: false,
        message: "Every fields are inserted properly",
      });
    } else {
      return seterrors({
        errors: false,
        message: "*Some fields are not inserted properly",
      });
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL + `/admin/getUsers`}`,
        {
          skills: currentJob.SkillsRequired,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin")}`,
          },
        }
      );
      if (data.status === 200) {
        console.log(data);
        setshow(true);
        setEmailUsers([...data.data.userlist]);
        console.log(emailUsers);
      }
    } catch (error) {}
  };

  // switch label for project-skill-level job

  const label = { inputProps: { "aria-label": "off" } };
  const switchHandler = (event) => {
    // setProjectState(event.target.checked)
    console.log(event);
    setjobss({ ...currentJob, projectSwitch: event.target.checked });
  };
  console.log(currentJob.projectSwitch);
  return (
    <Box sx={{ padding: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem",
        }}
      >
        <Button
          sx={{
            marginRight: "0",
            color: "red",
            border: "1px solid black",
          }}
          onClick={() => {
            JobDisable();
            //   console.log(data)
            //   navigate("/admin/jobs")
          }}
        >
          {currentJob.isClosed
            ? "Turn On Incomming Application"
            : "Turn Off Incomming Application"}
        </Button>
      </Box>
      <TextField
        fullWidth
        id="companyName"
        name="companyName"
        label="Company Name"
        value={currentJob.companyName}
        onChange={(e) =>
          setjobss({ ...currentJob, companyName: e.target.value })
        }
        // onBlur={formik.handleBlur}
      />
      <br />
      <br />
      <TextField
        fullWidth
        name="roleName"
        label="Designation"
        type="text"
        value={currentJob.roleName}
        onChange={(e) => setjobss({ ...currentJob, roleName: e.target.value })}
      />
      <br />
      <br />
      <TextField
        fullWidth
        name="location"
        label="Company Location"
        type="text"
        value={currentJob.location}
        onChange={(e) => setjobss({ ...currentJob, location: e.target.value })}
      />
      <br />
      <br />
      <TextField
        fullWidth
        name="companyAddress"
        label="Company Address"
        type="text"
        value={currentJob.companyAddress}
        onChange={(e) =>
          setjobss({ ...currentJob, companyAddress: e.target.value })
        }
      />
      <br />
      <br />
      <TextField
        fullWidth
        name="pincode"
        label="Pincode"
        type="text"
        value={currentJob.pincode}
        onChange={(e) => setjobss({ ...currentJob, pincode: e.target.value })}
      />
      <br />
      <br />
      <Typography variant="h5">Job Description</Typography>
      <TextareaAutosize
        name="JobDescription"
        label="Company Description"
        style={{ width: "60vw", height: "40vh" }}
        type="text"
        value={currentJob.JobDescription}
        onChange={(e) =>
          setjobss({ ...currentJob, JobDescription: e.target.value })
        }
      />
      <br />
      <br />
      <Typography variant="h5">Company Description</Typography>
      <TextareaAutosize
        name="companyDescription"
        label="Company Description"
        style={{ width: "60vw", height: "40vh" }}
        type="text"
        value={currentJob.companyDescription}
        onChange={(e) =>
          setjobss({ ...currentJob, companyDescription: e.target.value })
        }
      />
      <br />
      <br />
      <Typography variant="h5">Responsibilities</Typography>
      <br />
      <br />
      <TextareaAutosize
        rows={100}
        cols={100}
        style={{ width: "60vw", height: "40vh" }}
        name="Responsibilites"
        label="Responsibilities"
        type="text"
        value={currentJob.Responsibilites}
        onChange={(e) =>
          setjobss({ ...currentJob, Responsibilites: e.target.value })
        }
      />
      {/*  */}
      <br />
      <br />
      <TextField
        fullWidth
        name="SkillsRequired"
        label="Skills Required"
        type="text"
        disabled
        value={currentJob.SkillsRequired}
        // onChange={formik.handleChange}
      />
      <br />
      {/* <SkillAdminform
        SkillValues={availableskills.split(",")}
        getSkills={GenerateSkills}
      /> */}
      {/* ------------------------------------------------------------------------------------ */}
      {/* GET SKILLS */}
      <div>
        <form
        //   onSubmit={skillFormSubmitHandler}
        >
          <DialogTitle>Add skills</DialogTitle>
          {currentJob.SkillsRequired.split(",").length !== 0 ? (
            <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
              {currentJob.SkillsRequired.split(",").map((x, key) => {
                return (
                  <div
                    style={{
                      border: "1px solid grey",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "3px",
                      margin: "2px",
                      gap: "5px",
                    }}
                    key={key}
                  >
                    <p>{x}</p>
                    <p
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(x);
                      }}
                      style={{ color: "red", fontWeight: "bolder" }}
                    >
                      X
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
          <DialogContent>
            <DialogContentText>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={skillItems.map((option) => option.skill)}
                onChange={inputChangeHandler}
                sx={{ width: "500px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skill"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={isAddbtn}
              onClick={() => {
                skillFormSubmitHandler();
              }}
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "35px" }}>
        <p>
          Show Jobs on project level is{" "}
          {currentJob.projectSwitch ? (
            <span style={{ fontWeight: "bold" }}>Enabled</span>
          ) : (
            <span style={{ fontWeight: "bold" }}>Disabled</span>
          )}
          .
        </p>
        <FormControlLabel
          sx={{ marginTop: "-12px" }}
          control={
            <Switch
              checked={currentJob.projectSwitch}
              onChange={switchHandler}
            />
          }
        />
      </div>
      {/* --------------------------------------------------------------------------------------- */}
      <br />
      <TextField
        fullWidth
        name="experience"
        label="Experience"
        type="number"
        value={currentJob.experience}
        onChange={(e) =>
          setjobss({ ...currentJob, experience: e.target.value })
        }
      />
      <br />
      <br />
      <TextField
        fullWidth
        name="employmentType"
        label="Employment Type"
        type="text"
        value={currentJob.employmentType}
        onChange={(e) =>
          setjobss({ ...currentJob, employmentType: e.target.value })
        }
      />
      <br />
      <br />
      <TextField
        fullWidth
        name="role_Category"
        label="Category"
        type="text"
        value={currentJob.role_Category}
        onChange={(e) =>
          setjobss({ ...currentJob, role_Category: e.target.value })
        }
      />
      <br />
      <br />
      <TextField
        fullWidth
        name="salary"
        label="Salary"
        type="text"
        value={currentJob.salary}
        onChange={(e) => setjobss({ ...currentJob, salary: e.target.value })}
      />
      <br />
      <br />
      <TextField
        fullWidth
        name="education"
        label="Education"
        type="text"
        value={currentJob.education}
        onChange={(e) => setjobss({ ...currentJob, education: e.target.value })}
      />
      <br />
      <br />
      <TextField
        fullWidth
        name="departmentType"
        label="Department Type"
        type="text"
        value={currentJob.departmentType}
        onChange={(e) =>
          setjobss({ ...currentJob, departmentType: e.target.value })
        }
      />
      <br />
      <br />
      <TextField
        fullWidth
        name="IndustryType"
        label="Industrial Type"
        type="text"
        value={currentJob.IndustryType}
        onChange={(e) =>
          setjobss({ ...currentJob, IndustryType: e.target.value })
        }
      />{" "}
      <br />
      <br />
      {errors.error === true ? (
        <p style={{ color: "green" }}>{errors.message}</p>
      ) : (
        <p style={{ color: "red" }}>{errors.message}</p>
      )}
      <br />
      <Button variant="contained" onClick={() => handleGetAllUsers()}>
        {" "}
        Generate Users{" "}
      </Button>
      <p>
        This will generate the users with the same skillset you are looking for
        the oppourtunity
        <Button onClick={() => setshow(!showEmailusers)}>
          {showEmailusers ? "Hide" : "Show"}
        </Button>
      </p>
      <div hidden={showEmailusers ? false : true}>
        {emailUsers.length !== 0 ? (
          <>
            <ol>
              {emailUsers.map((el, index) => (
                <li key={index}>{el.name}</li>
              ))}
            </ol>
          </>
        ) : (
          <p>No users present with the skillset</p>
        )}
      </div>
      <br />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </Box>
  );
};

export default EditJobOppourtunity;
