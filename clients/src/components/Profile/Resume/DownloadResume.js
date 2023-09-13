// DownloadButton.js
import React from 'react';

function DownloadButton({ onClick }) {
  return (
    <button onClick={onClick} className="download-button">
      Download as PDF
    </button>
  );
}

export default DownloadButton;
