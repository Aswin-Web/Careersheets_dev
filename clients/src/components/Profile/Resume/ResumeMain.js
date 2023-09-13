import React, { useEffect, useState } from "react";
import DownloadButton from "./DownloadResume";
import generatePDF from "./GeneratePdf";
import Resume from "./Resume";
import axios from "axios";
import { useSelector } from "react-redux";

const ResumeMain = () => {
  const token = useSelector((state) => state.auth.value);
  const [data, SetData] = useState();
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
    console.log(data);

    return data;
  };
  useEffect(() => {
    sendRequest()
      .then((data) => {
        SetData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app">
      <DownloadButton onClick={generatePDF} />
      <Resume data={data} />
    </div>
  );
};

export default ResumeMain;
