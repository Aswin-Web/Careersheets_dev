import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./ProfileDetails.module.css";
import ProfileCard from "./UI/ProfileCard"; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';
import Certification from "../Certification/Certification";
import { useSelector, useDispatch } from "react-redux";
import { educationActions } from "../../redux/reducers/education-Data";
import EducationItems from "./EducationItems";
import { skillActions } from "../../redux/reducers/Skill-data";
import SkillItem from "./SkillItem";
import { statusActions } from "../../redux/reducers/status-data";
import ProjectItems from "./ProjectItems";
import { projectActions } from "../../redux/reducers/project-data";
import { roleActions } from "../../redux/reducers/role-data";
import { summaryAction } from "../../redux/reducers/summary-data";
import { personalActions } from "../../redux/reducers/personalInfo";
import { dataAction } from "../../redux/reducers/data";
import { REACT_APP_SERVER_URL } from "../../config";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const summaryState = useSelector((state) => state.summary);
  const personalState = useSelector((state) => state.personalInfo);
  const eduErrState = useSelector((state) => state.edu.error);
  const eduErrMsg = useSelector((state) => state.edu.message);
  const skillErrMsg = useSelector((state) => state.skill.message);
  const skillError = useSelector((state) => state.skill.error);
  const status = useSelector((state) => state.status.status);
  const eduItems = useSelector((state) => state.edu.items);
  const projectItems = useSelector((state) => state.project.items);
  const skillItems = useSelector((state) => state.skill.skills);
  const token = useSelector((state) => state.auth.value);
  const data = useSelector((state) => state.data.value);
  const Languages = personalState.languages.map((item) => item);

   const [certifications, setCertifications] = useState([]);
  
   
   
const handleAddCertification = (newCertification) => {
  setCertifications([...certifications, newCertification]);
  
};

   const handleDeleteCertification = (id) => {
     setCertifications(certifications.filter((cert) => cert.id !== id));
   };

  const sendRequest = async () => {
    const response = await axios
      .get(`${REACT_APP_SERVER_URL}/user/profile`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.log(err));
    const data = await response.data;
    console.log("Response from whole profile",data);

    let highestEducation = null;
    if (data.education && data.education.length > 0) {
      highestEducation = data.education.reduce((prev, current) =>
        prev.graduationYear > current.graduationYear ? prev : current
      );
    }


    const { displayPicture,name } = data;
    return { ...data, profilePicture: displayPicture,name, highestEducation  };
  };

  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    skills: "",
    tips: "",
    collegeName: personalState.collegeName || ""
  });


  const [formEditData, setFormEditData] = useState({
    skills: "",
    tips: "",
    id: ""
  });

  const [statusData, setStatusData] = useState(null);
  

  const handleData = (e) => {
    const { name, value } = e.target;
    setFormData(previousData => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleEditData = (e) => {
    const { name, value } = e.target;
    setFormEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleStatusSubmit = async (event) => {
    event.preventDefault();

    const { profilePicture, name, highestEducation  } = await sendRequest();
    
    const collegeName = highestEducation ? highestEducation.collegeName : "Unknown College";

    const date = new Date();
    
    const requestData = {
        ...formData,
        collegeName: collegeName || "Unknown College", 
        studentName: name || "Unknown User",
        displayPicture: profilePicture,
        date: date
    };

    
    try {
      const response = await axios.post(`${REACT_APP_SERVER_URL}/user/status/postStatus`, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 200){
        toast("Status Submitted For Review");
        setStatusData({
          skills: response.data.skills,
          tips: response.data.tips,
          approval: response.data.approval,
        });
      }
      console.log("response got in frontend", response);
      

    } catch (error) {
      console.error("Error Editting status:", error);
    }
  };
  
  const handleEditStatusSubmit = async (event) => {
    event.preventDefault();
  
    const id = formEditData.id;
    try {
      const response = await axios.put(`${REACT_APP_SERVER_URL}/user/status/updateWorkingQuestion/${id}`, formEditData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 200){
        toast("Status Editted Successfully");
        setStatusData({
          skills: response.data.skills,
          tips: response.data.tips,
          approval: response.data.approval
        });
        setIsEditFormVisible(false);
      }
      console.log("response got in Editttttttttttttt frontend", response);
 

    } catch (error) {
      console.error("Error Editting status:", error);
    }
  };

const handleSwotClick = () => {
  window.open("https://decisioncoach.onrender.com/profile", "_blank");
};

const handleSoftSkillsClick = () => {
  window.open("https://decisioncoach.onrender.com/skillget", "_blank");
};
 
  const handleGetStatus = async (event) => {
 
    try {
      const response = await axios.get(`${REACT_APP_SERVER_URL}/user/status/getStatus`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 200){
     
        setStatusData({
          skills: response.data[0].skills,
          tips: response.data[0].tips,
          approval: response.data[0].approval,
      });
      setFormEditData({
        skills: response.data[0].skills,
        tips: response.data[0].tips,
        id:response.data[0]._id
      });
      console.log("Form Edit Datavvvvvvvv", formEditData);

      }
      console.log("response got in frontend Status Get function", response.data[0]);
    
    } catch (error) {
      console.error("Error submitting status:", error);
    }
  }
 
  useEffect(()=>{
    handleGetStatus();
  },[]);


  useEffect(() => {
    sendRequest().then((data) => {
      let status = data.status;
      let details = data.education.reverse();
      let project = data.project.reverse();
      let user = data.personal[0];
    
      dispatch(summaryAction.addSummary({ summary: data.summary }));
      dispatch(educationActions.replaceEdu(details));
      dispatch(projectActions.replaceProject(project));
      dispatch(skillActions.replaceSkill(data.skill));
      dispatch(statusActions.changeStatus(status));
      dispatch(roleActions.changeRole(data.profileRole));
      if (user) {
        dispatch(
          personalActions.addInfo({
            dob: user ? user.dateOfBirth : "",
            gender: user ? user.gender : "",
            hometown: user ? user.hometown : "",
            languages: user ? user.languages : "",
            fullName: user ? user.fullName : "",
            phone: user ? user.phone : "",
          })
        );
      }
   
      dispatch(dataAction.AddData(data));
    });
  }, [dispatch]);

 
console.log(certifications,"jjjjjjjjjjjj")
  return (
    <div className={classes.details}>
      <div>
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            textAlign: "left",
            marginBottom: "20px",
            marginLeft: "20px",
            fontSize: "24px",
            color: "black",
          }}
        >
          Enhance Your Personal Development
        </Typography>

        <ProfileCard style={{ margin: "20px", padding: "20px" }}>
          {/* <Typography variant="h6">SWOT Analysis</Typography> */}
          <h3 className="m-3" >SWOT Analysis</h3>
          <p style={{ fontSize: 10 }}></p>

          <p style={{fontSize:14}}>
            Understand your strengths, weaknesses, opportunities, and threats.
          </p>
          <Button
            onClick={handleSwotClick}
            variant="contained"
            color="primary"
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              backgroundColor: "#11144C",
              color: "white",
              width: "24%",
            }}
          >
            Go to SWOT Analysis
          </Button>
        </ProfileCard>

        <ProfileCard style={{ margin: "20px", padding: "20px" }}>
          {/* <Typography variant="h6">Soft Skills</Typography> */}
          <h3 className="m-3">Soft Skills</h3>
          <p style={{ fontSize: 10 }}></p>
          <p style={{fontSize:14}}>
            Improve and showcase your interpersonal and communication skills.
          </p>
          <Button
            onClick={handleSoftSkillsClick}
            variant="contained"
            color="primary"
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              backgroundColor: "#11144C",
              color: "white",
              width: "20%",
            }}
          >
            Go to Soft Skills
          </Button>
        </ProfileCard>
      </div>

      <div>
        <ProfileCard CardName="Summary">
          <h3 className="m-3">Summary</h3>
          <p style={{ fontSize: 14 }}>{summaryState.summary}</p>
        </ProfileCard>
      </div>
      <ProfileCard CardName="education">
        <div>
          <h3 className="m-3">Education :</h3>
          {eduErrState && <p className={classes.skillError}>{eduErrMsg}</p>}
          <ul className={classes.educationList}>
            {eduItems.map((edu, index) => (
              <li key={index}>
                <EducationItems
                  key={edu._id}
                  id={edu._id}
                  collegeName={edu.collegeName}
                  degree={edu.degree}
                  stream={edu.stream}
                  graduated={edu.graduated}
                  graduationYear={edu.graduationYear}
                  registerNumber={edu.registerNumber}
                />
              </li>
            ))}
          </ul>
        </div>
      </ProfileCard>
      <ProfileCard CardName="status">
        <h3 className="m-3">Status:</h3>
        {status === "Working" && !statusData ? (
          <div style={{ marginLeft: "3rem" }}>
            <>
              <br />
              <h4>{status}</h4>
              <div style={{ backgroundColor: "#f2f2f2", maxWidth: "80rem" }}>
                <Form style={{ margin: "2rem" }} onSubmit={handleStatusSubmit}>
                  <br />
                  <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
                    Help Your Friends Just By Answering The Below Questions
                  </h2>
                  <Form.Group className="mb-3" controlId="formBasicSkills">
                    <Form.Label style={{ color: "black" }}>
                      <b>What Helped You Secure A Job?</b>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleData}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicTips">
                    <Form.Label style={{ color: "black" }}>
                      <b>
                        What Tips Do You Have For Students From Your College To
                        Prepare For Job Interview?
                      </b>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Tips"
                      name="tips"
                      value={formData.tips}
                      onChange={handleData}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "1rem", marginBottom: "2rem" }}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </>
          </div>
        ) : status === "Working" && statusData ? (
          <div style={{ marginLeft: "3rem" }}>
            <br />
            <h4>{status}</h4>
            <br />
            <Card style={{ maxWidth: "80rem" }}>
              <Card.Header>
                <b>Approval Status:</b>{" "}
                <span style={{ color: "#ff9142" }}>
                  <b>{statusData.approval}</b>
                </span>
                <br />
                <span style={{ fontSize: "0.6rem" }}>
                  You Can Only Edit Your Answers Until It Is Approved by Admin
                </span>
              </Card.Header>
              <Card.Body style={{ lineHeight: "2rem" }}>
                <Card.Text>
                  <b>1. What Helped You Secure A Job?</b>
                </Card.Text>
                <Card.Text style={{ marginLeft: "2rem" }}>
                  {statusData.skills}
                </Card.Text>
                <Card.Text>
                  <b>
                    2. What Tips Do You Have For Students From Your College To
                    Prepare For Job Interview?
                  </b>
                </Card.Text>
                <Card.Text style={{ marginLeft: "2rem" }}>
                  {statusData.tips}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => setIsEditFormVisible(true)}
                  disabled={statusData.approval === "Approved"}
                >
                  Update
                </Button>
                {isEditFormVisible && (
                  <div style={{ backgroundColor: "#f2f2f2" }}>
                    <Form
                      style={{ margin: "2rem" }}
                      onSubmit={handleEditStatusSubmit}
                    >
                      <br />
                      <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
                        Update Your Answers Here
                      </h2>
                      <Form.Group
                        className="mb-3"
                        controlId="formEditBasicSkills"
                      >
                        <Form.Label style={{ color: "black" }}>
                          <b>What Helped You Secure A Job?</b>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Skills"
                          name="skills"
                          value={formEditData.skills}
                          onChange={handleEditData}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formEditBasicTips"
                      >
                        <Form.Label style={{ color: "black" }}>
                          <b>
                            What Tips Do You Have For Students From Your College
                            To Prepare For Job Interview?
                          </b>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Tips"
                          name="tips"
                          value={formEditData.tips}
                          onChange={handleEditData}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ marginTop: "2rem", marginBottom: "2rem" }}
                      >
                        Update
                      </Button>
                    </Form>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div style={{ marginLeft: "1rem" }}>
            <p>{status}</p>
          </div>
        )}
      </ProfileCard>
      <ProfileCard CardName="skills">
        <h3 className="m-3">Skills : </h3>
        {skillError && <p className={classes.skillError}>{skillErrMsg}</p>}
        <div className={classes.skillItem}>
          {skillItems.map((skill, index) => (
            <div className={classes.skillCard} key={index}>
              <SkillItem
                key={index}
                skillName={skill.skill}
                id={skill._id}
                level={skill.level}
              />
            </div>
          ))}
        </div>
      </ProfileCard>
      <ProfileCard CardName="project">
        <h3 className="m-3">Project</h3>
        <ul className={classes.educationList}>
          {projectItems.map((item) => (
            <li className={classes.cardItems}>
              <ProjectItems
                key={item._id}
                id={item._id}
                title={item.projectTitle}
                domain={item.projectDomain}
                description={item.projectDescription}
                skills={item.projectSkills}
              />
            </li>
          ))}
        </ul>
      </ProfileCard>
      <ProfileCard CardName="certification">
        <h3 className="m-3"> Certification</h3>

        {certifications.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Added Certifications
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Certificate Name</TableCell>
                  <TableCell>Issued By</TableCell>
                  <TableCell>Issued On</TableCell>
                  <TableCell>Start Date</TableCell>
                  {certifications.some((cert) => cert.endDate) && (
                    <TableCell>Expiry Date</TableCell>
                  )}
                  <TableCell>Certificate ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certifications.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell>{cert.certificateName}</TableCell>
                    <TableCell>{cert.providedBy}</TableCell>
                    <TableCell>{cert.issuedOn}</TableCell>
                    <TableCell>{cert.startDate || "N/A"}</TableCell>
                    {cert.endDate && <TableCell>{cert.endDate}</TableCell>}
                    <TableCell>{cert.certificateId}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteCertification(cert.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </ProfileCard>

      <ProfileCard CardName="info">
        <h3 className="m-3">Personal Information</h3>
        <div className="m-5">
          <h4 style={{ marginBottom: "5px" }}>
            <span style={{ color: "#2C3333" }}>Full Name</span> :{" "}
            <span>{personalState.fullName}</span>
          </h4>
          <h4 style={{ marginBottom: "5px" }}>
            <span style={{ color: "#2C3333" }}>Phone</span> :{" "}
            <span>{personalState.phone}</span>
          </h4>
          <h4 style={{ marginBottom: "5px" }}>
            <span style={{ color: "#2C3333" }}>Gender</span> :{" "}
            <span>{personalState.gender}</span>
          </h4>
          <h4 style={{ marginBottom: "5px" }}>
            <span style={{ color: "#2C3333" }}>Date of Birth</span> :{" "}
            <span>{personalState.dob}</span>
          </h4>
          <h4 style={{ marginBottom: "5px" }}>
            <span style={{ color: "#2C3333" }}>Hometown</span> :{" "}
            <span>{personalState.hometown}</span>
          </h4>
          <h4 style={{ color: "#2C3333", marginBottom: "10px" }}>
            Languages known
          </h4>

          <ul style={{ display: "flex", flexWrap: "wrap" }}>
            {Languages.map((item, index) => (
              <li
                key={index}
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  margin: "8px",
                  backgroundColor: "#accbee",
                  borderRadius: "10px",
                  padding: "7px",
                  fontSize: "12px",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </ProfileCard>
      <ToastContainer />
    </div>
  );
};

export default ProfileDetails;


