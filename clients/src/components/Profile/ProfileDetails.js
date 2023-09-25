import axios from "axios";
import React, { useEffect } from "react";
import classes from "./ProfileDetails.module.css";
import ProfileCard from "./UI/ProfileCard";

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
      .get(`${process.env.REACT_APP_SERVER_URL}/user/profile`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.log(err));
    const data = await response.data;
    // console.log(data);

    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      let status = data.status;
      let details = data.education.reverse();
      let project = data.project.reverse();
      let user = data.personal[0];
      console.log(data);
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
          <h3>Summary</h3>
          <p style={{ fontSize: 14 }}>{summaryState.summary}</p>
        </ProfileCard>
      </div>
      <ProfileCard CardName="education">
        <div>
          <h3>Education :</h3>
          {eduErrState && <p className={classes.skillError}>{eduErrMsg}</p>}
          <ul className={classes.educationList}>
            {eduItems.map((edu, index) => (
              <li key={edu._id}>
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
        <h3>Status : </h3>
        <p> {status}</p>
      </ProfileCard>
      <ProfileCard CardName="skills">
        <h3>Skills : </h3>
        {skillError && <p className={classes.skillError}>{skillErrMsg}</p>}
        <div className={classes.skillItem}>
          {skillItems.map((skill) => (
            <div className={classes.skillCard}>
              <SkillItem
                key={skill._id}
                skillName={skill.skill}
                id={skill._id}
                level={skill.level}
              />
            </div>
          ))}
        </div>
      </ProfileCard>
      <ProfileCard CardName="project">
        <h3>Project</h3>
        <ul className={classes.educationList}>
          {projectItems.map((item) => (
            <li className={classes.cardItems}>
              <ProjectItems
                key={item._id}
                id={item._id}
                title={item.projectTitle}
                domain={item.projectDomain}
                description={item.projectDescription}
              />
            </li>
          ))}
        </ul>
      </ProfileCard>
      <ProfileCard CardName="info">
        <h3>Pesonal Information</h3>
        <div>
          <h4 style={{ marginBottom: "5px" }}>
            <span style={{ color: "#2C3333" }}>Full Name</span> :{" "}
            <span>{personalState.fullName}</span>
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

          <ul style={{ display: "flex", width: "500px" }}>
            {Languages.map((item) => (
              <li
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
    </div>
  );
};

export default ProfileDetails;