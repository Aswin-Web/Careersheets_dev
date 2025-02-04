import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import classes from "./CertificateTemplate.module.css";
import BG from "./../../../images/BG.png";

const GenerateCertificateMain = () => {
  const location = useLocation();
  const data = location.state?.data;

  //console.log("daaaaaaaaaaaaa", data);
  const certificateRef = useRef(null);

  const downloadPDF = () => {
    if (!certificateRef.current) return;

    html2canvas(certificateRef.current, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imgData;
      link.download = "certificate.png";
      link.click();
    });
  };

  return (
    <div>
      <button
        onClick={downloadPDF}
        style={{
          textTransform: "uppercase",
          marginTop: "20px",
          marginBottom: "20px",
          padding: "10px",
          background: "#11144C",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>

      <div className={classes.whole_container} ref={certificateRef}>
        <div className={classes.certificate_container}>
          <div className={classes.stars}>
            <span className={`${classes.star} ${classes.yellow}`}>★</span>
            <span className={`${classes.star} ${classes.blue}`}>★</span>
          </div>
          <h1 className={classes.certificate_title}>Certificate</h1>
          <p className={classes.certificate_subtitle}>OF ACHIEVEMENT</p>
          <div className={classes.line}></div>
          <p className={classes.certificate_text}>This is to certify that</p>
          <h2 className={classes.name}>{data.name}</h2>
          <div className={classes.handwritten_line}></div>
          <p className={classes.certificate_detail}>
            has successfully completed course of
            <span className={classes.course_title}>
              {" "}
              {data.certificationName}
            </span>
          </p>
          <p className={classes.date}>
            on{" "}
            {new Date(data.startDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div
          className={classes.abstract_container}
          style={{
            backgroundImage: `url(${BG})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className={classes.valid}>Certificate ID: {data.certificateId}</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificateMain;
