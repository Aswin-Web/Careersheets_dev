import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControlLabel,
  TextField,
  TextareaAutosize,
  Typography,
  Switch,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddNewJob } from "../../redux/reducers/AllJobDetails"; // Ensure this path is correct
import { REACT_APP_SERVER_URL } from "../../config"; // Ensure this path is correct
import SkillAdminform from "./SkillAdminForm"; // Ensure this path is correct

const CreateOppourtunity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // This is the single source of truth for the skills string (e.g., "React,Node.js,SQL")
  const [skills, setSkills] = useState("");

  const formik = useFormik({
    initialValues: {
      companyName: "",
      roleName: "",
      location: "",
      companyAddress: "",
      pincode: "",
      JobDescription: "",
      companyDescription: "",
      Responsibilites: "",
      experience: "",
      employmentType: "",
      role_Category: "",
      salary: "",
      education: "",
      departmentType: "",
      IndustryType: "",
      isClosed: false,
      projectSwitch: false,
    },
    onSubmit: async (values) => {
      // Combine formik values with the skills state for submission
      const finalValues = {
        ...values,
        SkillsRequired: skills,
      };

      // Simple validation check for all fields
      for (const key in finalValues) {
        if (typeof finalValues[key] === "string" && finalValues[key].trim() === "") {
          setError(`* The field "${key}" cannot be empty.`);
          return;
        }
      }
      if (skills.trim() === "") {
        setError("* At least one skill is required.");
        return;
      }
      setError("");

      try {
        const { data } = await axios.post(
          `${REACT_APP_SERVER_URL}/admin/jobs`,
          finalValues,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("admin")}`,
            },
          }
        );

        if (data.job) {
          dispatch(AddNewJob(data.job));
          navigate("/admin/jobs");
        }
      } catch (err) {
        console.error("Failed to create job:", err);
        setError(err.response?.data?.message || "Failed to create job. Please try again.");
      }
    },
  });

  // Correctly convert the skills string to an array for the child component
  const skillArray = skills
    ? skills.split(",").filter((skill) => skill.trim() !== "")
    : [];

  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        Create New Opportunity
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          sx={{ mb: 2 }}
          id="companyName"
          name="companyName"
          label="Company Name"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="roleName"
          label="Designation"
          value={formik.values.roleName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="location"
          label="Company Location"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="companyAddress"
          label="Company Address"
          value={formik.values.companyAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="pincode"
          label="Pincode"
          value={formik.values.pincode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Typography variant="h5" sx={{ mt: 2 }}>Job Description</Typography>
        <TextareaAutosize
          name="JobDescription"
          style={{ width: "99%", minHeight: "150px", marginTop: '8px', marginBottom: '16px', padding: '8px' }}
          value={formik.values.JobDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Detailed job description..."
        />

        <Typography variant="h5" sx={{ mt: 2 }}>Company Description</Typography>
        <TextareaAutosize
          name="companyDescription"
          style={{ width: "99%", minHeight: "150px", marginTop: '8px', marginBottom: '16px', padding: '8px' }}
          value={formik.values.companyDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="About the company..."
        />

        <Typography variant="h5" sx={{ mt: 2 }}>Responsibilities</Typography>
        <TextareaAutosize
          name="Responsibilites"
          style={{ width: "99%", minHeight: "150px", marginTop: '8px', marginBottom: '16px', padding: '8px' }}
          value={formik.values.Responsibilites}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Key responsibilities..."
        />

        {/* This is our working skills component */}
        <SkillAdminform SkillValues={skillArray} getSkills={setSkills} />

        <TextField
          fullWidth
          sx={{ my: 2 }}
          name="experience"
          label="Experience (in years)"
          type="number"
          value={formik.values.experience}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText="Enter 0 for freshers"
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="employmentType"
          label="Employment Type"
          value={formik.values.employmentType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText="e.g., Full-Time, Part-Time, Internship"
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="role_Category"
          label="Role Category"
          value={formik.values.role_Category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText="e.g., Software Development, Design"
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="salary"
          label="Salary"
          value={formik.values.salary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText="e.g., 5-8 LPA or Not Disclosed"
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="education"
          label="Education"
          value={formik.values.education}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText="e.g., Any Graduate, B.E/B.Tech in CS"
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="departmentType"
          label="Department"
          value={formik.values.departmentType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText="e.g., Engineering - Software & QA"
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="IndustryType"
          label="Industry Type"
          value={formik.values.IndustryType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText="e.g., IT Services & Consulting"
        />

        <div style={{ display: "flex", alignItems: "center", gap: "35px" }}>
          <p>
            Show jobs on project level is{" "}
            {formik.values.projectSwitch ? (
              <span style={{ fontWeight: "bold" }}>Enabled</span>
            ) : (
              <span style={{ fontWeight: "bold" }}>Disabled</span>
            )}
          </p>
          <FormControlLabel
            sx={{ marginTop: "-12px" }}
            control={
              <Switch
                name="projectSwitch"
                checked={formik.values.projectSwitch}
                onChange={formik.handleChange}
              />
            }
          />
        </div>
        <br />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2, p: 1.5 }}>
          Create Job
        </Button>
      </form>
    </Box>
  );
};

export default CreateOppourtunity;
