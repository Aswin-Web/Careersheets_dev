// DownloadButton.js
import React from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";


function DownloadButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="download-button"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px",
        borderRadius: "8px",
        backgroundColor: "#007BFF",
        borderColor: "#007BFF",
        color: "white",
      }}
    >
      <AiOutlineCloudDownload size={24} style={{ marginRight: "10px" }} />
      Download as PDF
    </button>
  );
}

export default DownloadButton;
