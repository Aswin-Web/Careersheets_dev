import React, { useEffect, useState } from "react";

import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { dataAction } from "../../../redux/reducers/data";
import Resume from "./Resume";

const PDF = () => {
  const dispatch = useDispatch();
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
    // console.log(data);

    return data;
  };
  useEffect(() => {
    sendRequest()
      .then((data) => {
        SetData(data);
        dispatch(dataAction.AddData(data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <MyDocument data={data} />
      {/* <Resume data={data} /> */}
    </PDFViewer>
  );
};

export default PDF;
