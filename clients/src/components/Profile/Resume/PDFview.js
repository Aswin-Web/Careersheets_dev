import React from "react";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { useSelector } from "react-redux";

const PDF = () => {
  const data = useSelector((state) => state.data.value);
  console.log(data, "mydu .........................ssss");

  return (
    <PDFViewer style={{ height: "700px", width: "100%" }}>
      <MyDocument data={data} />
    </PDFViewer>
  );
};

export default PDF;
