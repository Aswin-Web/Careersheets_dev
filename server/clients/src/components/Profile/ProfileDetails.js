import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./ProfileDetails.module.css";
import ProfileCard from "./UI/ProfileCard"; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';


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
    return data;
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
    
    const collegeName = data.education[0]?.collegeName; 
    const studentName = personalState.fullName;
    
    const requestData = {
        ...formData,
        collegeName: collegeName || "Unknown College", 
        studentName: studentName || "Unknown User"
    };

    //console.log("request data  from status submit", requestData)
    
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
      //console.log("response status", response.status);

    } catch (error) {
      console.error("Error Editting status:", error);
    }
  };
  
  const handleEditStatusSubmit = async (event) => {
    event.preventDefault();
    //console.log("formdata from Edittttttttttttttt status submit", formEditData.id)
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
      //console.log("response status", response.status);

    } catch (error) {
      console.error("Error Editting status:", error);
    }
  };

  const handleGetStatus = async (event) => {
    //event.preventDefault();
    try {
      const response = await axios.get(`${REACT_APP_SERVER_URL}/user/status/getStatus`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 200){
        //toast("Status Data Retrived Successfully");
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
      //console.log("response status", response.status);
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
      // console.log(data);
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
      // full data to the state
      dispatch(dataAction.AddData(data));
    });
  }, [dispatch]);

  // console.log(data,"data from the redux state")

  return (
    <div className={classes.details}>
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
          <div style={{ marginLeft: "1rem" }}>
            <>
              <p>{status}</p>
              <Form style={{ margin: "2rem" }} onSubmit={handleStatusSubmit}>
                <h2 style={{ fontSize: "1rem", marginBottom: "2rem" }}>Help Your Friends Just By Answering The Below Questions</h2>
                <Form.Group className="mb-3" controlId="formBasicSkills">
                  <Form.Label>What Helped You Secure A Job?</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="Skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleData}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTips">
                  <Form.Label>What Tips Do You Have For Students From Your College To Prepare For Job Interview?</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="Tips"
                    name="tips"
                    value={formData.tips}
                    onChange={handleData}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </>
          </div>
        ) : status === "Working" && statusData ? (
          <div style={{ marginLeft: "1rem" }}>
            <p>{status}</p>
            <Card style={{ maxWidth: "60rem" }}>
              <Card.Header>
                Approval Status: {statusData.approval}
                <br />
                <span style={{ fontSize: "0.6rem" }}>
                  You Can Only Edit Your Answers Until It Is Approved by Admin
                </span>
              </Card.Header>
              <Card.Body style={{ lineHeight: "2rem" }}>
                <Card.Text>1. What Helped You Secure A Job?</Card.Text>
                <Card.Text style={{ marginLeft: "2rem" }}>
                  {statusData.skills}
                </Card.Text>
                <Card.Text>2. What Tips Do You Have For Students From Your College To Prepare For Job Interview?</Card.Text>
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
                  <Form
                    style={{ margin: "2rem" }}
                    onSubmit={handleEditStatusSubmit}
                  >
                    <h2 style={{ fontSize: "1rem", marginBottom: "2rem" }}>
                      Help Your Friends Just By Answering The Below Questions
                    </h2>
                    <Form.Group className="mb-3" controlId="formEditBasicSkills">
                      <Form.Label>What Helped You Secure A Job?</Form.Label>
                      <Form.Control
                        type="textarea"
                        placeholder="Skills"
                        name="skills"
                        value={formEditData.skills}
                        onChange={handleEditData}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEditBasicTips">
                      <Form.Label>What Tips Do You Have For Students From Your College To Prepare For Job Interview?</Form.Label>
                      <Form.Control
                        type="textarea"
                        placeholder="Tips"
                        name="tips"
                        value={formEditData.tips}
                        onChange={handleEditData}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Update
                    </Button>
                  </Form>
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
          {skillItems.map((skill,index) => (
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
            {Languages.map((item,index) => (
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