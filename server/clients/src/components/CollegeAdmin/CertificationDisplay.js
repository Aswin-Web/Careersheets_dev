import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import Certificate from "../../images/Certificate.png";
import I_Bacus_Logo from "../../images/I_Bacus_Logo.jpg";
import GreeneStep_Logo from "../../images/Greenestep_Logo.jpg";

const CertificationDisplay = () => {
  const location = useLocation();
  const data = location.state?.data;

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
    <div style={{margin:"2rem"}}>
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

      <div
        style={{ position: "relative", height: "700px", width: "1200px" }}
        ref={certificateRef}
      >
        <img
          src={Certificate}
          alt="Certificate"
          style={{ width: "100%", height: "100%" }}
        />

        <div
          style={{
            position: "absolute",
            top: "37%",
            left: "77%",
          }}
        >
          {data.issuedBy === "I-Bacus Tech" ? (
            <img
              src={I_Bacus_Logo}
              alt="Certificate"
              style={{
                width: "10rem",
                height: "4rem",
                marginTop: "1rem",
                marginLeft: "1rem",
              }}
            />
          ) : (
            <img
              src={GreeneStep_Logo}
              alt="Certificate"
              style={{ width: "12rem", height: "5rem" }}
            />
          )}
        </div>

        <p
          style={{
            position: "absolute",
            top: "10%",
            left: "8%",
            color: "#003E57",
            fontWeight: "bold",
          }}
        >
          {data.certificateId}
        </p>

        <p
          style={{
            position: "absolute",
            top: "90%",
            left: "7%",
            color: "#003E57",
            fontSize:"0.5rem",
            width:"40rem",
            textAlign:"center"
          }}
        >
          This certificate is digitally issued and generated through 
          <a
            href="https://www.app.careersheets.in/"
            target="_blank"
            style={{
              color: "#003E57",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
             {" "} Careersheets
          </a>
          .
        </p>

        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "19%",
            width: "30rem",
          }}
        >
          <p
            style={{
              color: "#003E57",
              fontWeight: "bold",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            {data.name}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            top: "53%",
            left: "8%",
            width: "40rem",
          }}
        >
          <p
            style={{
              color: "#003E57",
              fontSize: "1.2rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            has successfully completed the course on {data.certificationName}.
            We commend the dedication to learning and growth. Congratulations on
            this achievement.
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            top: "79.5%",
            left: "8.5%",
            width: "13rem",
          }}
        >
          <p
            style={{
              color: "#003E57",
              fontWeight: "bold",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {new Date(data.startDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            top: "79%",
            left: "46%",
            width: "10rem",
          }}
        >
          <p
            style={{
              color: "#003E57",
              fontWeight: "bold",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {data.issuedBy === "I-Bacus Tech"
              ? "Dr P K Dhanesh"
              : "Mr Sunil Kumar"}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            top: "85%",
            left: "8.5%",
            width: "13rem",
          }}
        >
          <p
            style={{
              color: "#003E57",
              fontWeight: "bold",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            Date
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            top: "84.5%",
            left: "46%",
            width: "10rem",
          }}
        >
          <p
            style={{
              color: "#003E57",
              fontWeight: "bold",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            Issued By
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificationDisplay;
