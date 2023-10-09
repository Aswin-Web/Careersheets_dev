import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import axios from "axios";
import { AddJobs, AddNewJob } from "../../redux/reducers/AllJobDetails";
import { useDispatch } from "react-redux";

// Schema
// let userSchema = object().shape({
//   IndustryType: string("It Should be string").min(
//     5,
//     "It Should Contain more than 5 Characters"
//   ),
//   JobDescription: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   Responsibilites: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   SkillsRequired: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   companyAddress: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   companyDescription: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   companyName: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   departmentType: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   education: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   experience: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   location: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   roleName: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   role_Category: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
//   salary: string("It Should be a Valid String").min(
//     5,
//     "It Should contain more than 5 Characters"
//   ),
// });

const CreateOppourtunity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, seterrors] = useState({
    errors: false,
    message: "",
  });
  const NetworkRequest = async (info) => {
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER_URL + "/admin/jobs"}`,
      info,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin")}`,
        },
      }
    );

    if (data.status === 200) {
      dispatch(AddNewJob(data.data.job));
      navigate("/admin/jobs");
    }
  };

  const formik = useFormik({
    initialValues: {
      IndustryType: "",
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
      isClosed: false,
      location: "",
      roleName: "",
      role_Category: "",
      salary: "",
      pincode:""
    },
    // validationSchema: { userSchema },

    onSubmit: (values) => {
      // console.log(values);

      console.log(errors);

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
        values.salary !== ""&&
        values.pincode !==""
      ) {
        NetworkRequest(values);
        
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

  return (
    <Box sx={{ padding: "1rem" }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="companyName"
          name="companyName"
          label="Company Name"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="I-BACUS-TECH"
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
          placeholder="Software Developer"
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
          placeholder="Coimbatore"
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
          placeholder="No.36/1, Raghav Towers, Amman Nagar, Sathy Rd, near Amman Kovil Bus Stop, Saravanampatti, Coimbatore, "
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
        <TextField
          fullWidth
          name="pincode"
          label="Pincode"
          type="text"
          value={formik.values.pincode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="641110"
          error={
            formik.touched.pincode &&
            Boolean(formik.errors.pincode)
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
          placeholder="*Healthcare integration experiencedeveloping interfaces using Orion Health Rhapsody (5.X/6.X)
          *Rhapsody Associate Certification Required
          *Rhapsody Professional Certification Preferred
          *CorePoint
          *Experience developing with HL7 2.X interfaces (ADT, SIU, ORM, ORU, MDM, DFT) , certification preferred
          *Developing JDBC interfaces
          *Experience with XDR Provide-and-Register
          *Experience with XDS.b interfaces / HIE interfacing
          *Knowledge of DIRECT secure messaging preferred
          HL7 messaging standards
          *CCD/C-CDA/IHE profiles
          *PIX/PDQ
          *Building integrationsusing SOAP and RESTful Web Services, JDBC database connections using SQL and stored procedures, and vendor specified APIs
          *Working knowledge of building interfaces to and from AllScripts TouchWorks EMR platform
          *SDLC process, the Interface Developer works closely with teammates to understand and provide feedback
          *Coding, unit and integration Testing
          *Understanding of a scripting language (SQL, Perl, PHP, TCL, etc.) and/or other software development languages like Python, JavaScript, Java, C#, etc.
          *Epic Bridges Certified a plus
          *Proficient in HL7, x12, XML, and other EDI standards
          *Proficient in FTP, File listening, MLLP, and Webservices communication protocols"
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
          placeholder="I- Bacus-Tech, a Coimbatore-based Technology company launches its first Labs Product. I- Bacus-Tech runs a Labs Program where college students can hone their technical skills to develop experimental products. College students are given a project challenge to work on which is a problem to solve.
          As part of this program, I- Bacus-Tech hired two college students Amal and Aswin from Sri Ranganathar Institute of Engineering and Technology (SRIET). Students received a problem to solve from a US-based Tech Professional/entrepreneur. Amal and Aswin came up with a product concept design and got approval to proceed with the project. This kicked off the project and within weeks evolved into a working product. During this process, a weekly review of progress was conducted to ensure the experiment is going as planned, launching CareerSheets Beta Version."
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
          value={formik.values.Responsibilites}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.Responsibilites &&
            Boolean(formik.errors.Responsibilites)
          }
          placeholder="*Healthcare integration experiencedeveloping interfaces using Orion Health Rhapsody (5.X/6.X)
          *Rhapsody Associate Certification Required
          *Rhapsody Professional Certification Preferred
          *CorePoint
          *Experience developing with HL7 2.X interfaces (ADT, SIU, ORM, ORU, MDM, DFT) , certification preferred
          *Developing JDBC interfaces
          *Experience with XDR Provide-and-Register
          *Experience with XDS.b interfaces / HIE interfacing
          *Knowledge of DIRECT secure messaging preferred
          HL7 messaging standards
          *CCD/C-CDA/IHE profiles
          *PIX/PDQ
          *Building integrationsusing SOAP and RESTful Web Services, JDBC database connections using SQL and stored procedures, and vendor specified APIs
          *Working knowledge of building interfaces to and from AllScripts TouchWorks EMR platform
          *SDLC process, the Interface Developer works closely with teammates to understand and provide feedback
          *Coding, unit and integration Testing
          *Understanding of a scripting language (SQL, Perl, PHP, TCL, etc.) and/or other software development languages like Python, JavaScript, Java, C#, etc.
          *Epic Bridges Certified a plus
          *Proficient in HL7, x12, XML, and other EDI standards
          *Proficient in FTP, File listening, MLLP, and Webservices communication protocols"
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
          placeholder="C++,Java,Python"
        />
        <Typography variant="p" sx={{color:"grey"}}>*Keep your skills with a "comma", separated </Typography>
        <Typography variant="p" sx={{color:"grey"}}>(i.e) C++,Java,Python </Typography>
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
          error={formik.touched.experience && Boolean(formik.errors.experience)}
          helperText={formik.touched.experience && formik.errors.experience}
          placeholder="5"
        />
        <Typography variant="p" sx={{color:"grey"}}>Enter a Number. (i.e)"5" which will show as 5 years </Typography>
        <Typography variant="p" sx={{color:"grey"}}>*If fresher please enter 0 </Typography>
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
          placeholder="Fulltime"
          error={
            formik.touched.employmentType &&
            Boolean(formik.errors.employmentType)
          }
          helperText={
            formik.touched.employmentType && formik.errors.employmentType
          }
        />
        <Typography variant="p" sx={{color:"grey"}}>*Enter whether its FullTime, Parttime, Contract, Internship </Typography>
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
            formik.touched.role_Category && Boolean(formik.errors.role_Category)
          }
          helperText={
            formik.touched.role_Category && formik.errors.role_Category
          }
          placeholder="Software Developenment"
        />
        <Typography variant="p" sx={{color:"grey"}}>Enter the Category wheather its an (i.e) Developenment, Designing</Typography>
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
          placeholder="5 - 8 lpa"
        />
        <Typography variant="p" sx={{color:"grey"}}>*If it is varying then insert in the range (i.e) 5-6 lpa Or give it as a fixed value (i.e) 2 lpa </Typography>
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
          placeholder="Any Graduate"
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
          placeholder="Engineering Software & QA"
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
          placeholder="IT Servicing and Consulting"
          error={
            formik.touched.IndustryType && Boolean(formik.errors.IndustryType)
          }
          helperText={formik.touched.IndustryType && formik.errors.IndustryType}
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
    </Box>
  );
};

export default CreateOppourtunity;
