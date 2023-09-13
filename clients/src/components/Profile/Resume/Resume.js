import React, { useState } from "react";
import classes from "./Resume.module.css";
import { RxDotFilled } from "react-icons/rx";
import { ImLocation2 } from "react-icons/im";
import { HiMail } from "react-icons/hi";

function Resume({ data }) {
  console.log(data);
  //   const userInfo = personal[0]
  return (
    <div>
      {data && (
        <div className="resume" style={{ padding: "20px" }}>
          <div className={classes.name}>
            <h2>{data.personal[0].fullName}</h2>
          </div>
          {/* PHONE LOCATION SECTION */}
          <div className={classes.phone}>
            <div className={classes.phoneItems}>
              <p style={{ marginRight: "5px" }}>
                <ImLocation2 size={16} />
              </p>
              <p>{data.personal[0].hometown}</p>
            </div>

            <RxDotFilled size={24} />

            <div className={classes.phoneItems}>
              <p style={{ marginRight: "5px" }}>
                <HiMail size={20} />
              </p>
              <p>{data.email}</p>
            </div>

            <RxDotFilled size={24} />
          </div>
          <div className={classes.lineBig}></div>
          {/* SUMMARY SECTION */}
          <div className={classes.line}>
            <div className={classes.splitLineSummary}></div>
            <p>PROFILE SUMMARY</p>
            <div className={classes.splitLineSummary}></div>
          </div>
          <div className={classes.summaryDiv}>
            <p className={classes.summary}>{data.summary}</p>
          </div>
          {/* SKILLS SECTION */}
          <div className={classes.line}>
            <div className={classes.splitLineSkills}></div>
            <p>SKILLS</p>
            <div className={classes.splitLineSkills}></div>
          </div>
          {/* SKILL DATA */}
          <div className={classes.skill}>
            <ul>
              {data.skill.map((item) => (
                <li>{item.skill}</li>
              ))}
            </ul>
          </div>
          {/* EDUCATION SECTION */}
          <div className={classes.line}>
            <div className={classes.splitLineEducation}></div>
            <p>EDUCATION</p>
            <div className={classes.splitLineEducation}></div>
          </div>
          <div className={classes.education}>
            <ul>
              {data.education.map((edu) => (
                <li>
                  <div className={classes.eduData}>
                    <h3>{edu.collegeName}</h3>
                    <p>
                      <span>Degree</span>
                      {" : "}
                      <span style={{ fontWeight: "bold" }}>{edu.degree}</span>
                    </p>
                    <p>
                      <span>Stream</span>
                      {" : "}
                      <span style={{ fontWeight: "bold" }}>{edu.stream}</span>
                    </p>
                    <p>
                      <span>Graduation year</span>
                      {" : "}
                      <span style={{ fontWeight: "bold" }}>
                        {edu.graduationYear}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* PROJECT SECTION */}

          <div className={classes.line}>
            <div className={classes.splitLineProject}></div>
            <p>PROJECTS</p>
            <div className={classes.splitLineProject}></div>
          </div>
          <div className={classes.project}>
            <ul>
              {data.project.map((item) => (
                <div className={classes.eduData}>
                  <h3>{item.projectTitle}</h3>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Domain</span>
                    {" : "}
                    <span>{item.projectDomain}</span>
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>
                      Project Description
                    </span>
                    {" :- "}
                  </p>
                  <p>{item.projectDescription}</p>
                </div>
              ))}
            </ul>
          </div>
          <div className={classes.empty}></div>
          {/* PERSONAL INFORMATION SECTION */}
          <div className={classes.line}>
            <div className={classes.splitLinePersonal}></div>
            <p>PERSONAL INFORMATION</p>
            <div className={classes.splitLinePersonal}></div>
          </div>
          <div className={classes.personal}>
            <p>
              <span>Gender</span>
              {" : "}
              <span style={{ fontWeight: "bold" }}>
                {data.personal[0].gender}
              </span>
            </p>
            <p>
              <span>Date of Birth</span>
              {" : "}
              <span style={{ fontWeight: "bold" }}>
                {data.personal[0].dateOfBirth}
              </span>
            </p>
            <p>
              <span>Languages</span>
              {" : "}
            </p>
            <div className={classes.languages}>
              <ul>
                {data.personal[0].languages.map((lan) => (
                  <li className={classes.lan} style={{ fontWeight: "bold" }}>
                    {lan}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resume;
