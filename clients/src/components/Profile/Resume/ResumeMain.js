// import React, { useEffect, useState } from "react";
// import DownloadButton from "./DownloadResume";
// import generatePDF from "./GeneratePdf";
// import Resume from "./Resume";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate, useNavigation } from "react-router-dom";
// import PDFGenerator from "./GeneratePdf";
// import { useDispatch } from "react-redux";
// import { dataAction } from "../../../redux/reducers/data";

// const ResumeMain = () => {
//   const dispatch=useDispatch()
//   const token = useSelector((state) => state.auth.value);
//   const [data, SetData] = useState();
//   const navigate = useNavigate();
//   const sendRequest = async () => {
//     const response = await axios
//       .get(`${process.env.REACT_APP_SERVER_URL}/user/profile`, {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .catch((err) => console.log(err));
//     const data = await response.data;
//     // console.log(data);

//     return data;
//   };
//   useEffect(() => {
//     sendRequest()
//       .then((data) => {
//         SetData(data);
//         dispatch(dataAction.AddData(data))
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="app">
//       <DownloadButton
//         onClick={() => {
//           navigate("pdf");
//         }}
//       />
//       {/* <PDFGenerator /> */}
//       <Resume data={data} />
//     </div>
//   );
// };

// export default ResumeMain;

import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const ResumeMain = () => {
  const userData = useSelector((state) => state.data.value);
  // RESUME GENERATION API MODEL

  const apiKey = "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";
  //   const prompt = `
  //  Generate a professional resume with the following details:
  //  write a summary with provided skills and education
  //  Name: ${userData.personal[0].fullName}
  //  Contact: ${userData.email}
  //  Education: ${userData.education}
  //  Skills: ${userData.skill}
  //  `;
  const prompt = `generate some qoute`;
  async function generateResume() {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt,
          max_tokens: 150, // Adjust the token limit as needed
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedResume = response.data.choices[0].text;
      console.log(generatedResume);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  }
  console.log(userData, "cllllll");

  //   generateResume();
  useEffect(() => {
    generateResume();
  }, []);
  return <div>ResumeMain</div>;
};

export default ResumeMain;
