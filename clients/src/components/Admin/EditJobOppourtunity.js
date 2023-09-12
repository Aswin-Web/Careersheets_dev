import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import { object, string } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { DisAbleJobs, updateJobs } from "../../redux/reducers/AllJobDetails";

const EditJobOppourtunity = () => {
  const navigate = useNavigate();
  const [errors, seterrors] = useState({
    errors: false,
    message: "",
  });

  const location = useLocation();
  const jobbID = location.pathname.split("/").pop();
  const allJobs = useSelector((state) => state.allJobs.value);
  const currentJob = allJobs.filter((x) => x._id === jobbID);
  console.log(currentJob.length);

  const NetworkRequest = async (info) => {
    const data = await axios.put(
      `${
        process.env.REACT_APP_SERVER_URL + `/admin/jobs/${currentJob[0]._id}`
      }`,
      info,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      }
    );

    if (data.status === 200) {
      updateJobs({
        payload: { job_id: currentJob[0]._id, jobDetails: data.data.job },
      });
      navigate("/admin/jobs");
    }

    // dispatch(AddJobs(data.allJobs));
  };

  const JobDisable = async () => {
    const data = await axios.put(
      `${
        process.env.REACT_APP_SERVER_URL +
        `/admin/jobs/disable/${currentJob[0]._id}`
      }`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      }
    );

    if (data.status === 200) {
      DisAbleJobs({ payload: currentJob[0]._id });
      navigate("/admin/jobs");
    }
  };

  const formik = useFormik({
    initialValues: {
      IndustryType: currentJob[0].IndustryType,
      JobDescription: currentJob[0].JobDescription,
      Responsibilites: currentJob[0].Responsibilites,
      SkillsRequired: currentJob[0].SkillsRequired,
      companyAddress: currentJob[0].companyAddress,
      companyDescription: currentJob[0].companyDescription,
      companyName: currentJob[0].companyName,
      createdAt: currentJob[0].createdAt,
      departmentType: currentJob[0].departmentType,
      education: currentJob[0].education,
      employmentType: currentJob[0].employmentType,
      experience: currentJob[0].experience,
      isClosed: currentJob[0].isClosed,
      location: currentJob[0].location,
      roleName: currentJob[0].roleName,
      role_Category: currentJob[0].role_Category,
      salary: currentJob[0].salary,
    },
    // validationSchema: { userSchema },

    onSubmit: (values) => {
      // console.log(values);

      if (
        values.IndustryType !== "" &&
        values.JobDescription !== "" &&
        values.Responsibilites !== "" &&
        values.SkillsRequired !== "" &&
        values.companyAddress !== "" &&
        values.companyDescription !== "" &&
        values.companyName !== "" &&
        values.departmentType !== "" &&
        values.education !== "" &&
        values.employmentType !== "" &&
        values.experience !== "" &&
        values.location !== "" &&
        values.roleName !== "" &&
        values.role_Category !== "" &&
        values.salary !== ""
      ) {
        NetworkRequest(values);
        // navigate("/admin/jobs");
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
    },
  });

 if (currentJob.length !==0){
  
  return (
    <Box sx={{ padding: "1rem" }}>
      {currentJob.length !== 0 ? (
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", margin: "1rem" }}
          >
            <Button
              sx={{ marginRight: "0", color: "red", border: "1px solid black" }}
              onClick={() => {
                JobDisable();
                //   console.log(data)
                //   navigate("/admin/jobs")
              }}
            >
              {currentJob[0].isClosed
                ? "Turn On Incomming Application"
                : "Turn Off Incomming Application"}
            </Button>
          </Box>
          <TextField
            fullWidth
            id="companyName"
            name="companyName"
            label="Company Name"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="roleName"
            label="Designation"
            type="text"
            value={formik.values.roleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.roleName && Boolean(formik.errors.roleName)}
            helperText={formik.touched.roleName && formik.errors.roleName}
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="location"
            label="Company Location"
            type="text"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="companyAddress"
            label="Company Address"
            type="text"
            value={formik.values.companyAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.companyAddress &&
              Boolean(formik.errors.companyAddress)
            }
            helperText={
              formik.touched.companyAddress && formik.errors.companyAddress
            }
          />
          <br />
          <br />
          <Typography variant="h5">Job Description</Typography>
          <TextareaAutosize
            name="JobDescription"
            label="Company Description"
            style={{ width: "60vw", height: "40vh" }}
            type="text"
            value={formik.values.JobDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.JobDescription &&
              Boolean(formik.errors.JobDescription)
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
            value={formik.values.companyDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.companyDescription &&
              Boolean(formik.errors.companyDescription)
            }
          />
          <br />
          <br />
          <Typography variant="h5">Responaibilities</Typography>
          <br />
          <br />
          <TextareaAutosize
            rows={100}
            cols={100}
            style={{ width: "60vw", height: "40vh" }}
            name="Responsibilites"
            label="Responibilities"
            type="text"
            value={formik.values.Responsibilites}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.Responsibilites &&
              Boolean(formik.errors.Responsibilites)
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
            value={formik.values.SkillsRequired}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.SkillsRequired &&
              Boolean(formik.errors.SkillsRequired)
            }
            helperText={
              formik.touched.SkillsRequired && formik.errors.SkillsRequired
            }
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="experience"
            label="Experience"
            type="number"
            value={formik.values.experience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.experience && Boolean(formik.errors.experience)
            }
            helperText={formik.touched.experience && formik.errors.experience}
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="employmentType"
            label="Employment Type"
            type="text"
            value={formik.values.employmentType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.employmentType &&
              Boolean(formik.errors.employmentType)
            }
            helperText={
              formik.touched.employmentType && formik.errors.employmentType
            }
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="role_Category"
            label="Category"
            type="text"
            value={formik.values.role_Category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.role_Category &&
              Boolean(formik.errors.role_Category)
            }
            helperText={
              formik.touched.role_Category && formik.errors.role_Category
            }
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="salary"
            label="Salary"
            type="text"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="education"
            label="Education"
            type="text"
            value={formik.values.education}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.education && Boolean(formik.errors.education)}
            helperText={formik.touched.education && formik.errors.education}
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="departmentType"
            label="Department Type"
            type="text"
            value={formik.values.departmentType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.departmentType &&
              Boolean(formik.errors.departmentType)
            }
            helperText={
              formik.touched.departmentType && formik.errors.departmentType
            }
          />
          <br />
          <br />
          <TextField
            fullWidth
            name="IndustryType"
            label="Industrial Type"
            type="text"
            value={formik.values.IndustryType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.IndustryType && Boolean(formik.errors.IndustryType)
            }
            helperText={
              formik.touched.IndustryType && formik.errors.IndustryType
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
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      ) : (
        <></>
      )}
    </Box>
  );
 }else{
  return <></>
 }
};

export default EditJobOppourtunity;
