import React, { useCallback, useEffect, useState } from "react";

import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import axios from "axios";
// import { dataAction } from "../../../redux/reducers/data";
import { useLocation } from "react-router-dom";
import { REACT_APP_SERVER_URL } from "../../config";

const PDFViewRecruiter = () => {
  const [data, SetData] = useState();
  const location = useLocation();

  const sendRequest = useCallback(async () => {
    const response = await axios
      .get(
        `${REACT_APP_SERVER_URL}/recruiter/user/${location.pathname
          .split("/")
          .pop()}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("recruiter")}`,
          },
        }
      )
      .catch((err) => console.log(err));
    const data = await response.data;
    // console.log(data);

    return data;
  }, [location.pathname]);
  useEffect(() => {
    sendRequest()
      .then((data) => {
        SetData(data);
        // dispatch(dataAction.AddData(data));
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <MyDocument data={data} />
      {/* <Resume data={data} /> */}
    </PDFViewer>
  );
};

export default PDFViewRecruiter;
