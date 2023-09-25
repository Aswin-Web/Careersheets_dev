// import html2pdf from "html2pdf.js";
// import jsPDF from "jspdf";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// function generatePDF() {
//   const resume = document.querySelector(".resume");

//   html2canvas(resume).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF();
//     const imgWidth = 210; // A4 width in mm
//     const pageHeight = 297; // A4 height in mm
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     const padding = 10; // Adjust this value to set the desired padding at the bottom of each page (in mm)

//     let heightLeft = imgHeight;
//     let position = 0;

//     while (heightLeft >= 0) {
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight - padding);
//       position -= pageHeight;
//       heightLeft -= pageHeight;

//       if (heightLeft >= 0) {
//         pdf.addPage();
//       }
//     }

//     pdf.save("resume.pdf");
//   });

// const elementToConvert = document.getElementById('element-to-convert');
//   const elementToConvert = document.querySelector(".resume");

//   const pdfOptions = {
//     margin: 10,
//     filename: "converted.pdf",
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//   };

//   html2pdf()
//   .from(elementToConvert)
//   .set(pdfOptions)
//   .outputPdf()
//   .then((pdf) => {
//     // Trigger download by creating a data URL and link
//     const dataUri = pdf.output('datauristring');
//     const link = document.createElement('a');
//     link.href = dataUri;
//     link.download = pdfOptions.filename;
//     link.click();
//   });
// }

// export default generatePDF;

// import html2pdf from 'html2pdf.js';
// import jsPDF from 'jspdf';

// const elementToConvert = document.getElementById('element-to-convert');

// const pdfOptions = {
//   margin: 10,
//   filename: 'converted.pdf',
//   image: { type: 'jpeg', quality: 0.98 },
//   html2canvas: { scale: 2 },
//   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
// };

// // Function to convert and download the PDF
// function convertAndDownloadPDF() {
//   html2pdf()
//     .from(elementToConvert)
//     .set(pdfOptions)
//     .outputPdf()
//     .then((pdf) => {
//       // Trigger download by creating a data URL and link
//       const dataUri = pdf.output('datauristring');
//       const link = document.createElement('a');
//       link.href = dataUri;
//       link.download = pdfOptions.filename;
//       link.click();
//     });
// }

// // Add an event listener to trigger conversion and download
// const convertButton = document.getElementById('convert-button');
// convertButton.addEventListener('click', convertAndDownloadPDF);

// import React from "react";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );

// import { PDFViewer } from '@react-pdf/renderer'
// import React from 'react'
// import Resume from './Resume'

// const GeneratePdf = () => {
//   return (
//     <PDFViewer>
//       <Resume/>
//     </PDFViewer>
//   )
// }

// export default GeneratePdf



import React from 'react';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import Resume from './Resume';

class PDFGenerator extends React.Component {
  convertAndDownloadPDF = () => {
    const element = document.getElementById('html-element'); // Replace with your HTML element's ID

    const pdfOptions = {
      margin: 10,
      filename: 'downloaded.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .from(element)
      .set(pdfOptions)
      .outputPdf()
      .then((pdf) => {
        // Trigger download by creating a data URL and link
        const dataUri = pdf.output('datauristring');
        const link = document.createElement('a');
        link.href = dataUri;
        link.download = pdfOptions.filename;
        link.click();
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.convertAndDownloadPDF}>Convert to PDF and Download</button>
        <div id="html-element">
          {/* Your HTML content to be converted goes here */}
          <h1>Hello, World!</h1>
          <Resume/>
        </div>
      </div>
    );
  }
}

export default PDFGenerator;

