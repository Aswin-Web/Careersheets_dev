import React, { useEffect, useState } from "react";
import DownloadButton from "./DownloadResume";
import generatePDF from "./GeneratePdf";
import Resume from "./Resume";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import PDFGenerator from "./GeneratePdf";
import { useDispatch } from "react-redux";
import { dataAction } from "../../../redux/reducers/data";
import { REACT_APP_SERVER_URL } from "../../../config";

const ResumeMain = () => {
  const dispatch=useDispatch()
  const token = useSelector((state) => state.auth.value);
  const [data, SetData] = useState();
  const navigate = useNavigate();
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
    // console.log(data);

    return data;
  };
  useEffect(() => {
    sendRequest()
      .then((data) => {
        SetData(data);
        dispatch(dataAction.AddData(data))
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <a className="app" href="pdf" target="_blank" style={{color:'black',textDecoration:'none'}}>
      <DownloadButton
        onClick={() => {
          // navigate("pdf");
        }}
      />
      {/* <PDFGenerator /> */}
      <Resume data={data} />
    </a>
  );
};

export default ResumeMain;

